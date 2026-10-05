# Carolina CNA Ready 🩺

> **From CNA Student to South Carolina Registry — One Confident Step at a Time.**
> Built for Hacktoberfest Weekend Challenge: *Build for a Friend* (DEV.to, October 2026).

---

## 🏆 The "Build for a Friend" Story
My best friend just conquered the demanding process of earning her Certified Nursing Assistant (CNA) certification in South Carolina. She finished her state-approved 100-hour training and 40 clinical hours, passed both the Written Exam and the 5-station Skills Evaluation, and was officially listed on the South Carolina Nurse Aide Registry.

During her journey, I saw firsthand that **the information candidates need exists, but it is deeply fragmented across:**
- The South Carolina Credentia Candidate Handbook
- Credentia CNA365 registration, application approval, and scheduling portals
- In-person test center versus online proctoring security rules
- 23 official clinical skills with bolded mandatory critical steps
- SCDHHS regulations and 10-business-day Registry verification timelines

Instead of building another generic 10-question quiz website, I built **Carolina CNA Ready**: an AI-powered South Carolina certification navigator and confidence coach that answers:
> *"What do I need to do right now, and why?"*

---

## 🤖 Why Open Innovation & Open-Weight AI Matter
This project places **open-source AI at its core**:

1. **Student Privacy & Sensitive Data Isolation:**
   Candidates often ask questions concerning personal accommodations, background history, retake anxieties, or financial vouchers. With local open-weight models (**Google Gemma 3** and **Gemma 4 31B IT**) running locally via **Ollama**, candidate queries never leave their personal device or get monetized by closed proprietary AI APIs.
2. **Zero SSN or Password Collection:**
   The application intentionally avoids storing candidate Social Security Numbers or Credentia credentials. All progress and checklists persist strictly in local browser storage (`localStorage`).
3. **Model Swapping Architecture:**
   The AI Coach is built with an open provider interface. Candidates or developers running locally can connect directly to Ollama at `http://localhost:11434` with model tags like `gemma3`, `gemma4:31b-it`, or `gemma:7b`. The app also includes server-side fallback so web visitors can explore immediately without setup.
4. **Strict RAG Grounding:**
   The AI Coach does not hallucinate arbitrary rules. Every response is grounded in our structured knowledge base curated directly from the official **Credentia South Carolina Candidate Handbook** (`kb-sc.credentia.com/en`), citing the official source, URL, and verification date.

---

## ✨ Features

- **"Find My Starting Point" 6-Question Assessment:** Pinpoints exactly where the candidate is (Training, Application, Scheduling, Skills Retest, or Registry) and automatically configures their personalized 8-step roadmap.
- **Interactive 8-Stage Certification Roadmap:** Step-by-step guidance from 100-hour SC NATCEP training to CNA365 approval, testing center scheduling, written exam, skills evaluation, and SCDHHS registry placement.
- **South Carolina CNA AI Coach:** Grounded Q&A with suggested prompts, official handbook citations, and actionable "Next Step" directives.
- **Skills Rehearsal Lab (All 23 Official Credentia Skills):**
  - Details the mandatory Hand Hygiene first-skill requirement and randomized Measurement skills.
  - Highlights bolded critical failure checkpoints.
  - Interactive AI Skill Rehearsal: Candidates type how they would perform a procedure, and the AI Evaluator scores it against the official Credentia rubric.
- **10 Original Practice Scenarios (Anti-Copyright Compliant):** High-yield clinical judgment scenarios covering Role of the Nurse Aide, Physical Care, Psychosocial Care, and Infection Control with full rationale.
- **Test-Day Readiness Checklist:** Dual checklist for **In-Person Test Center** (IDs, analog watch, No. 2 pencils, non-skid footwear) versus **Online At-Home Proctoring** (single monitor, 360° mobile room scan, webcam).
- **CNA Confidence Center:** Multi-pillar readiness score (Process, Knowledge, Skills, Test-Day) with top priority recommendations and direct link to the South Carolina Nurse Aide Registry verification portal.

---

## 🚀 Running Locally with Ollama

### 1. Install & Run Ollama with Gemma
```bash
# Pull and run Gemma
ollama run gemma3
```

### 2. Run Carolina CNA Ready
```bash
git clone https://github.com/your-username/carolina-cna-ready.git
cd carolina-cna-ready
npm install
npm run dev
```

Open `http://localhost:3000` in your browser. Click **"Model: Gemma AI"** in the top navigation bar to confirm your local Ollama connection!
