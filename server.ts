import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { SC_KNOWLEDGE_ARTICLES, SC_OFFICIAL_SKILLS } from './src/data/scCredentiaKnowledge';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI SDK server-side per guidelines
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

/**
 * Retrieve relevant SC knowledge chunks based on user query
 */
function retrieveRelevantKnowledge(query: string): { contextText: string; primarySource: typeof SC_KNOWLEDGE_ARTICLES[0] } {
  const qLower = query.toLowerCase();
  
  let bestArticle = SC_KNOWLEDGE_ARTICLES[0];
  let highestScore = 0;

  for (const article of SC_KNOWLEDGE_ARTICLES) {
    let score = 0;
    const combined = `${article.title} ${article.summary} ${article.keyPoints.join(' ')} ${article.fullText}`.toLowerCase();
    
    if (qLower.includes('skill') || qLower.includes('hand hygiene') || qLower.includes('pulse') || qLower.includes('bp') || qLower.includes('evaluator')) {
      if (article.category === 'skills_exam') score += 5;
    }
    if (qLower.includes('online') || qLower.includes('home') || qLower.includes('computer') || qLower.includes('webcam')) {
      if (article.id === 'sc-test-day-online') score += 5;
    }
    if (qLower.includes('center') || qLower.includes('bring') || qLower.includes('id') || qLower.includes('pencil') || qLower.includes('arrive')) {
      if (article.id === 'sc-test-day-center') score += 5;
    }
    if (qLower.includes('registry') || qLower.includes('results') || qLower.includes('pass') || qLower.includes('score') || qLower.includes('renew')) {
      if (article.category === 'results_registry') score += 5;
    }
    if (qLower.includes('eligib') || qLower.includes('100 hour') || qLower.includes('clinical') || qLower.includes('school') || qLower.includes('nurse student')) {
      if (article.category === 'eligibility') score += 5;
    }
    if (qLower.includes('apply') || qLower.includes('cna365') || qLower.includes('fee') || qLower.includes('cost') || qLower.includes('schedule')) {
      if (article.category === 'application') score += 5;
    }

    // Keyword hits
    const words = qLower.split(/\W+/).filter(w => w.length > 3);
    for (const word of words) {
      if (combined.includes(word)) score += 1;
    }

    if (score > highestScore) {
      highestScore = score;
      bestArticle = article;
    }
  }

  const contextText = `
OFFICIAL SOUTH CAROLINA CREDENTIA SOURCE:
Title: ${bestArticle.title}
Source URL: ${bestArticle.sourceUrl}
Last Verified: ${bestArticle.lastVerified}
Summary: ${bestArticle.summary}
Key Points:
- ${bestArticle.keyPoints.join('\n- ')}

Full Context:
${bestArticle.fullText}
`;

  return { contextText, primarySource: bestArticle };
}

/**
 * Check if local Ollama server is accessible
 */
app.post('/api/check-ollama', async (req, res) => {
  const ollamaUrl = req.body?.ollamaUrl || 'http://localhost:11434';
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(`${ollamaUrl}/api/tags`, { signal: controller.signal });
    clearTimeout(timeout);
    
    if (response.ok) {
      const data = await response.json();
      return res.json({
        available: true,
        models: (data.models || []).map((m: { name: string }) => m.name),
        message: 'Ollama is running locally and connected.'
      });
    }
    return res.json({ available: false, models: [], message: 'Ollama endpoint replied with non-200 status' });
  } catch (err: unknown) {
    return res.json({
      available: false,
      models: [],
      message: 'Ollama not detected locally. App will automatically use high-performance server-side AI fallback.'
    });
  }
});

/**
 * CNA AI Coach Endpoint
 */
app.post('/api/coach', async (req, res) => {
  const { question, candidateStage, preferOllama = false, ollamaUrl = 'http://localhost:11434', modelName = 'gemma3' } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question string is required' });
  }

  const { contextText, primarySource } = retrieveRelevantKnowledge(question);

  const systemPrompt = `You are the South Carolina CNA Certification Coach for Carolina CNA Ready.
You guide nurse aide candidates through the official South Carolina NNAAP certification and Credentia registration process to get listed on the South Carolina Nurse Aide Registry.
All your answers MUST be grounded in the official South Carolina Credentia Candidate Handbook and South Carolina Department of Health and Human Services (SCDHHS) rules.

Candidate's current stage: ${candidateStage || 'Initial Research / Candidate'}

Knowledge Base:
${contextText}

Guidelines:
1. Provide a warm, encouraging, authoritative, and direct answer tailored to South Carolina.
2. Outline the exact NEXT STEP the candidate should take right now.
3. Be clear on key SC requirements (100 hours training with 40 clinical hours, 2-year testing window, Credentia CNA365 portal, 5 skills in 30 mins with Hand Hygiene always first, 10 business days for Registry listing).
4. If asked about taking the exam online vs test center, explain the exact requirements.
5. End with the official next action.`;

  // Attempt 1: If user requested Ollama local inference
  if (preferOllama) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      const ollamaRes = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: modelName,
          prompt: `${systemPrompt}\n\nCandidate Question: ${question}\n\nCoach Answer:`,
          stream: false,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (ollamaRes.ok) {
        const ollamaData = await ollamaRes.json();
        return res.json({
          text: ollamaData.response,
          sourceTitle: primarySource.sourceTitle,
          sourceUrl: primarySource.sourceUrl,
          lastVerified: primarySource.lastVerified,
          nextStepRecommendation: primarySource.keyPoints[0] || 'Check Credentia CNA365 portal for application status.',
          modelUsed: `Local Gemma (${modelName} via Ollama)`,
          isOllama: true,
        });
      }
    } catch (ollamaErr) {
      console.warn('Ollama local inference failed, falling back to server-side GenAI:', (ollamaErr as Error).message);
    }
  }

  // Attempt 2: Server-side Gemini API (gemini-3.8-flash per gemini-api skill)
  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${systemPrompt}\n\nCandidate Question: ${question}`,
      });

      const responseText = response.text || '';
      return res.json({
        text: responseText,
        sourceTitle: primarySource.sourceTitle,
        sourceUrl: primarySource.sourceUrl,
        lastVerified: primarySource.lastVerified,
        nextStepRecommendation: primarySource.keyPoints[0] || 'Verify your CNA365 application status.',
        modelUsed: 'Gemma-Grounded Engine (Server-Side)',
        isOllama: false,
      });
    } catch (geminiErr) {
      console.error('Gemini API call failed:', (geminiErr as Error).message);
    }
  }

  // Fallback 3: Grounded heuristic synthesis from SC Credentia Knowledge Base
  return res.json({
    text: `Based on official South Carolina Credentia guidelines: ${primarySource.summary}\n\nKey Requirements to remember:\n${primarySource.keyPoints.map(kp => `• ${kp}`).join('\n')}\n\nFor complete details, refer directly to ${primarySource.sourceTitle}.`,
    sourceTitle: primarySource.sourceTitle,
    sourceUrl: primarySource.sourceUrl,
    lastVerified: primarySource.lastVerified,
    nextStepRecommendation: primarySource.keyPoints[0] || 'Log into Credentia CNA365 to verify candidate profile.',
    modelUsed: 'Official SC Knowledge Base Engine',
    isOllama: false,
  });
});

/**
 * Skills Practice Review Endpoint
 */
app.post('/api/skill-review', async (req, res) => {
  const { skillId, candidateResponse } = req.body;

  const targetSkill = SC_OFFICIAL_SKILLS.find(s => s.id === skillId) || SC_OFFICIAL_SKILLS[0];

  if (!candidateResponse || candidateResponse.trim().length < 5) {
    return res.status(400).json({ error: 'Please describe the steps you would perform.' });
  }

  const prompt = `You are the South Carolina RN Skills Evaluator for Credentia NNAAP.
Evaluate the candidate's rehearsal for the skill: "${targetSkill.name}".

Official Required Critical Steps:
${targetSkill.criticalSteps.map(cs => `- [CRITICAL] ${cs}`).join('\n')}

Standard Procedure Steps:
${targetSkill.procedureSteps.map(ps => `- ${ps}`).join('\n')}

Common Mistakes:
${targetSkill.commonMistakes.map(cm => `- ${cm}`).join('\n')}

Candidate's Description of How They Perform This Skill:
"""${candidateResponse}"""

Provide constructive, supportive, educational evaluation.
Analyze:
1. Did they include the critical safety steps?
2. Did they remember infection control and resident dignity?
3. What did they execute well?
4. What critical points or common mistakes must they watch out for?`;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });
      return res.json({
        skillName: targetSkill.name,
        evaluationText: response.text,
        criticalSteps: targetSkill.criticalSteps,
        sourceUrl: targetSkill.officialSourceUrl,
      });
    } catch (err) {
      console.error('Skill review AI error:', err);
    }
  }

  // Fallback analysis
  return res.json({
    skillName: targetSkill.name,
    evaluationText: `Great effort practicing "${targetSkill.name}"! Remember that in South Carolina, Credentia requires passing all critical steps.\n\nReview these essential checkpoints:\n${targetSkill.criticalSteps.map(cs => `✓ ${cs}`).join('\n')}\n\nCommon pitfalls to avoid:\n${targetSkill.commonMistakes.map(cm => `⚠️ ${cm}`).join('\n')}`,
    criticalSteps: targetSkill.criticalSteps,
    sourceUrl: targetSkill.officialSourceUrl,
  });
});

// Serve frontend in production or through Vite in development
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Carolina CNA Ready server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
