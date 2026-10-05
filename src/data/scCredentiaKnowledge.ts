/**
 * South Carolina Credentia CNA Knowledge Base
 * Sourced and verified from official Credentia South Carolina candidate handbook & KB:
 * https://kb-sc.credentia.com/en
 * Last Verified: October 4, 2026
 */

export interface KnowledgeArticle {
  id: string;
  category: 'eligibility' | 'application' | 'written_exam' | 'skills_exam' | 'test_day' | 'results_registry';
  title: string;
  summary: string;
  sourceUrl: string;
  sourceTitle: string;
  lastVerified: string;
  keyPoints: string[];
  fullText: string;
}

export interface CNASkill {
  id: string;
  name: string;
  category: 'Infection Control' | 'Measurement' | 'Personal Care' | 'Basic Restorative & Mobility' | 'Safety & Positioning';
  isMandatoryFirst?: boolean; // Hand Hygiene is always 1st
  isMeasurement?: boolean;    // One skill is randomly selected from measurement
  durationEstimateMinutes: number;
  equipmentNeeded: string[];
  criticalSteps: string[];
  procedureSteps: string[];
  commonMistakes: string[];
  officialSourceUrl: string;
}

export interface PracticeQuestion {
  id: string;
  scenario: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  rationale: string;
  domain: 'Role of the Nurse Aide' | 'Physical Care Skills' | 'Psychosocial Care Skills' | 'Infection Control & Safety';
  officialSourceCitation: string;
}

export const SC_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'sc-eligibility',
    category: 'eligibility',
    title: 'South Carolina Nurse Aide Eligibility & Training Requirements',
    summary: 'Candidates must complete an approved 100-hour SC nurse aide training program with at least 40 clinical hours or qualify under alternative routes.',
    sourceUrl: 'https://kb-sc.credentia.com/en/article/eligibility-criteria',
    sourceTitle: 'Credentia SC — Eligibility Criteria',
    lastVerified: 'October 4, 2026',
    keyPoints: [
      'Standard Route: Completion of a South Carolina state-approved nurse aide training program within the past 24 months.',
      'Training hours minimum: At least 100 total hours, including a minimum of 40 hours of supervised clinical training in a licensed nursing facility.',
      'Nursing student route: Enrolled nursing students (RN/LPN) with verified 100+ training/clinical hours may test upon state DHHS approval.',
      'Military medical training: Eligible military healthcare specialists may qualify with DD-214 and training documentation.',
      '2-Year Window: Candidates have 2 years from their training completion date to pass both the Written/Oral Exam and Skills Evaluation.',
      'Maximum 3 attempts: Candidates have 3 attempts per examination component before state retraining is required.'
    ],
    fullText: `Under South Carolina Department of Health and Human Services (SCDHHS) regulations, candidates seeking initial certification as a Certified Nursing Assistant (CNA) must graduate from an approved nurse aide training and competency evaluation program (NATCEP). The standard curriculum requires at least 100 clock hours total, comprising classroom instruction and a mandatory minimum of 40 hours of direct, hands-on clinical experience under RN supervision. Upon graduation, candidates have a 24-month eligibility window to pass both the NNAAP Written/Oral Examination and the NNAAP Skills Evaluation. If a candidate does not pass both within three attempts or within two years of graduation, they must complete another approved 100-hour program.`
  },
  {
    id: 'sc-application-cna365',
    category: 'application',
    title: 'Credentia CNA365 Registration & Application Process',
    summary: 'All South Carolina registration, scheduling, fee payment, and score access occurs through the Credentia CNA365 online system.',
    sourceUrl: 'https://kb-sc.credentia.com/en/article/application-and-scheduling',
    sourceTitle: 'Credentia SC — Application and Scheduling',
    lastVerified: 'October 4, 2026',
    keyPoints: [
      'Account Setup: Candidates must create an account on Credentia CNA365 (credentia.com/test-takers/sc).',
      'Name Exact Match: The legal first and last name in CNA365 must EXACTLY match government-issued IDs brought to testing.',
      'Training Verification: Upload training completion certificate or have the approved school director confirm completion.',
      'Examination Fees: Written & Skills combined is $140.00; Oral & Skills combined is $150.00. Retest fees: Written $45.00, Oral $55.00, Skills $95.00.',
      'Accommodations (ADA): Must be requested and approved in CNA365 prior to scheduling an exam date.',
      'Approval Time: Once submitted, state/Credentia approval typically takes 2 to 5 business days before the calendar unlocks for scheduling.'
    ],
    fullText: `Credentia administers the South Carolina examination program entirely through its CNA365 cloud platform. Candidates create an individual profile using their permanent personal email and legal name matching their government photo ID. After uploading training credentials, the application is reviewed for eligibility. Once approved, the candidate receives an email notification allowing them to select either an in-person test center or an online proctored written exam, followed by scheduling the in-person skills component.`
  },
  {
    id: 'sc-written-exam',
    category: 'written_exam',
    title: 'NNAAP Written & Oral Examination Structure',
    summary: '70 multiple-choice questions administered over 2 hours covering Physical Care, Psychosocial Care, and the Role of the Nurse Aide.',
    sourceUrl: 'https://kb-sc.credentia.com/en/article/exam-overview',
    sourceTitle: 'Credentia SC — Examination Overview & Content Outline',
    lastVerified: 'October 4, 2026',
    keyPoints: [
      'Total Questions: 70 multiple-choice questions (60 scored items and 10 statistical non-scored pre-test items).',
      'Time Allowed: Exactly 2 hours (120 minutes).',
      'Content Domains: Physical Care Skills (~60%), Psychosocial Care Skills (~15%), and Role of the Nurse Aide (~25%).',
      'Oral Exam Option: Features audio questions read aloud plus 10 reading comprehension word-recognition questions.',
      'Testing Modalities: Available at approved in-person test sites or online via Credentia secure proctoring.'
    ],
    fullText: `The National Nurse Aide Assessment Program (NNAAP) written test evaluates comprehensive foundational nursing assistant knowledge. The exam content adheres strictly to federal OBRA standards and South Carolina state guidelines. Major content includes activities of daily living (ADLs), basic nursing skills, infection control, restorative care, resident rights, legal/ethical boundaries, emotional and mental health needs, and communication within the interdisciplinary healthcare team.`
  },
  {
    id: 'sc-skills-exam',
    category: 'skills_exam',
    title: 'NNAAP Skills Evaluation (23 Skills, 5 Demonstrated)',
    summary: 'Candidates perform 5 assigned skills in 30 minutes in front of an RN Evaluator. Hand Hygiene is always tested first.',
    sourceUrl: 'https://kb-sc.credentia.com/en/article/skills',
    sourceTitle: 'Credentia SC — Skills Evaluation Overview',
    lastVerified: 'October 4, 2026',
    keyPoints: [
      '5 Skills Total: Hand Hygiene is ALWAYS tested first. One skill is randomly selected from Measurement. Three skills are randomly selected from the remaining 21 skills.',
      'Time Limit: Exactly 30 minutes to complete all 5 skills.',
      'Critical Steps (Bolded): Every skill contains critical safety steps (e.g., washing hands without touching sink, locking wheelchair brakes) that MUST be executed correctly.',
      'Self-Correction Rule: If you realize you made an error or missed a step, you can verbally tell the Nurse Evaluator and correct the step before moving to the next skill.',
      'Acting as a Resident: You will be paired with another candidate to serve as the client/resident during their evaluation, wearing a hospital gown over clothes.'
    ],
    fullText: `During the NNAAP Skills Evaluation in South Carolina, a Credentia-approved Registered Nurse Evaluator will observe each candidate perform 5 clinical skills in a simulated healthcare setting. The evaluation always begins with Hand Hygiene. Candidates must achieve a passing evaluation on all 5 assigned skills. A candidate who fails even one critical step or fails to demonstrate overall competency on any skill will need to retest the skills component.`
  },
  {
    id: 'sc-test-day-center',
    category: 'test_day',
    title: 'In-Person Test Center Requirements & Protocol',
    summary: 'Arrive 30 minutes early with 2 valid forms of matching ID, watch with sweep second hand, pencils, and non-skid footwear.',
    sourceUrl: 'https://kb-sc.credentia.com/en/article/exam-day-test-center',
    sourceTitle: 'Credentia SC — Exam Day at Test Center',
    lastVerified: 'October 4, 2026',
    keyPoints: [
      'Two Forms of ID: Must bring 2 matching valid identification cards. One MUST be a government-issued photo ID (Driver License, State ID, Passport, Military ID) with legal signature. The second must have matching legal name (Social Security card, signed credit/debit card, school ID).',
      'Arrival Time: Arrive at least 30 minutes before your scheduled start time. Late arrivals are marked as No-Show and forfeit all fees.',
      'Supplies Needed: Three sharpened No. 2 pencils with clean erasers, a watch with a second hand (analog preferred; smartwatches strictly prohibited).',
      'Attire: Clinical attire or scrubs recommended, non-skid flat closed-toe shoes (mandatory for skills demonstration).',
      'Electronic Device Policy: Cell phones, tablets, smart watches, and electronic devices must be powered OFF and stored away during testing.'
    ],
    fullText: `South Carolina test center security is strict. The Evaluator will inspect identification against the official roster. Names on IDs must match the CNA365 profile letter-for-letter. Candidates must be dressed in appropriate clinical apparel suitable for active physical care tasks, including bending, lifting, and transferring safely.`
  },
  {
    id: 'sc-test-day-online',
    category: 'test_day',
    title: 'Online Proctored Written Exam Protocol',
    summary: 'Take the written test at home with single monitor, working webcam/mic, private room, and secondary phone for 360 room scan.',
    sourceUrl: 'https://kb-sc.credentia.com/en/article/exam-day-online',
    sourceTitle: 'Credentia SC — Exam Day Online Proctoring',
    lastVerified: 'October 4, 2026',
    keyPoints: [
      'Hardware: Desktop, laptop, or Chromebook with a single monitor. Dual monitors are forbidden.',
      'Room Environment: Completely private, quiet room with closed doors. No other persons or pets permitted in the room.',
      'Secondary Mobile Device: Required to join a secure video room scan showing your desk, room perimeter, and underneath work surface.',
      'System Compatibility Test: Must be downloaded and completed 24-48 hours before testing day.',
      'Prohibited items: No headphones, no notes, no papers, no open tabs, no food, and no speaking aloud unless taking the oral exam.'
    ],
    fullText: `Credentia offers South Carolina candidates the flexibility of taking the cognitive Written/Oral exam online from home. Live remote proctors monitor audio and webcam streams throughout the 2 hours. If any unauthorized person enters the room or if the candidate looks off-screen repeatedly, the proctor may terminate the test session immediately.`
  },
  {
    id: 'sc-results-and-registry',
    category: 'results_registry',
    title: 'Exam Results & South Carolina Nurse Aide Registry Placement',
    summary: 'Score reports publish in CNA365 within hours to 24 hours. Passing both components leads to SC Registry listing in ~10 business days.',
    sourceUrl: 'https://kb-sc.credentia.com/en/article/exam-results',
    sourceTitle: 'Credentia SC — Exam Results and Registry Placement',
    lastVerified: 'October 4, 2026',
    keyPoints: [
      'Official Score Notification: Score reports are posted in your Credentia CNA365 account typically within hours of completing testing (max 24-48 hours).',
      'Passing Standard: Candidates must pass BOTH the Written/Oral Exam AND the Skills Evaluation within their 2-year window.',
      'Registry Submission: Credentia automatically transmits passing results to the South Carolina Department of Health and Human Services (SCDHHS).',
      'Listing Timeline: Candidates can expect their name to be officially placed on the South Carolina Nurse Aide Registry approximately 10 business days after passing both parts.',
      'Registry Verification: Employers can verify credentials instantly online via the official SC Nurse Aide Registry public portal.',
      'Renewal / Maintenance: SC CNA certification remains active for 24 months. To renew, the aide must have worked at least 8 consecutive hours for pay performing nurse aide duties under RN/LPN supervision during the 24 months.'
    ],
    fullText: `Upon successfully completing both the written and skills portions of the NNAAP examination in South Carolina, the candidate reaches the finish line of their certification journey. Credentia reports passing records to SCDHHS, which enters the candidate onto the official South Carolina Nurse Aide Registry within approximately 10 business days. Once listed, the individual can work as a Certified Nursing Assistant in hospitals, skilled nursing facilities, hospice, assisted living, and home health care agencies throughout South Carolina.`
  }
];

export const SC_OFFICIAL_SKILLS: CNASkill[] = [
  {
    id: 'hand-hygiene',
    name: 'Hand Hygiene (Handwashing)',
    category: 'Infection Control',
    isMandatoryFirst: true,
    durationEstimateMinutes: 4,
    equipmentNeeded: ['Sink with running water', 'Soap dispenser', 'Paper towels', 'Waste receptacle'],
    criticalSteps: [
      'Wet hands and wrists thoroughly under running water with fingertips pointed downward throughout.',
      'Apply soap to hands and lather all surfaces of hands, wrists, fingers, and nail beds with friction for at least 20 seconds.',
      'Rinse hands and wrists thoroughly under running water with fingertips pointed downward.',
      'Dry hands with clean paper towel and discard without touching dispenser or clean hands to waste basket.',
      'Turn off water faucet using a clean, dry paper towel without contaminating clean hands.'
    ],
    procedureSteps: [
      'Stand back from sink so uniform/scrubs do not touch sink surface.',
      'Turn on warm water and adjust flow to prevent splashing.',
      'Wet hands and wrists thoroughly with fingertips pointed down.',
      'Apply soap to produce adequate lather.',
      'Rub hands together vigorously for at least 20 seconds (palm to palm, back of hands, interlaced fingers, thumbs, knuckles, fingernails against palms).',
      'Rinse hands and wrists keeping fingertips pointed downward so contaminated water flows down into sink.',
      'Use clean dry paper towel to dry from fingertips upward toward wrists; discard immediately.',
      'Use new dry paper towel to turn off faucet handles and open door if exiting.'
    ],
    commonMistakes: [
      'Touching uniform or hands to inside of sink bowl (immediate failure).',
      'Pointing fingertips upward while rinsing (causes water to run back onto arms and down dirty onto hands).',
      'Turning off faucet with bare clean hands instead of dry paper towel.',
      'Lathering for under 20 seconds.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'measuring-radial-pulse',
    name: 'Measures and Records Radial Pulse',
    category: 'Measurement',
    isMeasurement: true,
    durationEstimateMinutes: 5,
    equipmentNeeded: ['Watch with second hand', 'Alcohol wipe', 'Recording sheet / pad', 'Pen'],
    criticalSteps: [
      'Locate radial pulse on thumb side of resident wrist with pads of 2 or 3 middle fingers (never use thumb).',
      'Count pulse for a full 60 seconds (or 30 seconds multiplied by 2 according to evaluator instruction).',
      'Record pulse rate accurately on candidate recording sheet within +/- 4 beats per minute of RN Evaluator measurement.'
    ],
    procedureSteps: [
      'Perform hand hygiene before touching resident.',
      'Introduce yourself, identify resident by name, explain procedure.',
      'Position resident comfortably with arm supported.',
      'Place pads of first three fingers along radial artery on thumb side of wrist.',
      'Count pulse beats using second hand of watch.',
      'Ensure resident is safe and comfortable, leave call light within reach.',
      'Record measurement immediately on Credentia recording sheet.'
    ],
    commonMistakes: [
      'Using thumb to feel pulse (thumb has its own arterial pulse).',
      'Pressing too hard and obliterating artery pulse.',
      'Miscounting outside the allowed +/- 4 bpm variance.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'measuring-blood-pressure',
    name: 'Measures and Records Blood Pressure',
    category: 'Measurement',
    isMeasurement: true,
    durationEstimateMinutes: 7,
    equipmentNeeded: ['Sphygmomanometer (BP cuff)', 'Stethoscope', 'Alcohol wipes', 'Recording sheet'],
    criticalSteps: [
      'Clean earpieces and diaphragm of stethoscope with alcohol prep pads before use.',
      'Apply cuff snugly around bare upper arm with artery arrow aligned 1 inch above antecubital space.',
      'Inflate cuff smoothly and slowly release pressure at 2-3 mmHg per second while listening for systolic and diastolic sounds.',
      'Record systolic and diastolic reading within +/- 4 mmHg of RN Evaluator reading.'
    ],
    procedureSteps: [
      'Greet resident, verify identity, explain procedure, wash hands.',
      'Clean stethoscope earpieces and bell/diaphragm with alcohol pads.',
      'Position resident with forearm rested at heart level, palm facing up.',
      'Wrap deflated cuff smoothly around upper arm.',
      'Palpate brachial artery, place stethoscope diaphragm gently over artery.',
      'Close valve, pump bulb to 160-180 mmHg (or 30 mmHg above obliterated radial pulse).',
      'Release valve slowly (2-3 mmHg/sec), note first sound (systolic) and disappearance (diastolic).',
      'Deflate completely, remove cuff, wash hands, record values.'
    ],
    commonMistakes: [
      'Failing to clean stethoscope before and after contact.',
      'Placing cuff over bulky clothing instead of bare arm.',
      'Dropping mercury/needle too rapidly to read accurate values.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'measuring-respirations',
    name: 'Measures and Records Respirations',
    category: 'Measurement',
    isMeasurement: true,
    durationEstimateMinutes: 5,
    equipmentNeeded: ['Watch with second hand', 'Recording sheet', 'Pen'],
    criticalSteps: [
      'Count respiratory cycles (one inspiration + one expiration = 1 count) for full 60 seconds without resident being aware.',
      'Record respiration count within +/- 2 breaths per minute of RN Evaluator measurement.'
    ],
    procedureSteps: [
      'Wash hands, approach resident calmly.',
      'Do not announce you are counting breathing (keep fingers on radial pulse or wrist so resident does not alter rate).',
      'Observe chest rise and fall for 60 seconds.',
      'Record measurement immediately on candidate recording sheet.',
      'Place call light within reach, perform hand hygiene.'
    ],
    commonMistakes: [
      'Telling resident "I am going to count your breathing now", which alters breathing rate.',
      'Counting inhale and exhale as two separate breaths instead of one cycle.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'measuring-urinary-output',
    name: 'Measures and Records Urinary Output',
    category: 'Measurement',
    isMeasurement: true,
    durationEstimateMinutes: 6,
    equipmentNeeded: ['Bedpan with simulated urine', 'Graduated cylinder (calibrated in mL/cc)', 'Gloves', 'Barrier pad', 'Recording sheet'],
    criticalSteps: [
      'Pour contents of bedpan into graduated measuring container on flat surface protected by paper barrier.',
      'Read volume at eye level on flat surface.',
      'Record measurement in mL (or cc) within +/- 25 mL of Evaluator reading.'
    ],
    procedureSteps: [
      'Put on clean gloves and place barrier paper on flat surface.',
      'Carefully pour bedpan liquid into graduated cylinder without splashing.',
      'Crouch to place eyes level with liquid meniscus on flat surface.',
      'Note number in mL.',
      'Empty graduate into toilet/hopper, rinse graduate and bedpan, dry, store.',
      'Remove gloves turning inside-out, wash hands, record volume.'
    ],
    commonMistakes: [
      'Holding graduate up in air while reading instead of on flat surface at eye level.',
      'Failing to place barrier beneath container on countertop.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'ambulation-gait-belt',
    name: 'Ambulation with a Gait (Transfer) Belt',
    category: 'Basic Restorative & Mobility',
    durationEstimateMinutes: 7,
    equipmentNeeded: ['Gait belt', 'Non-skid shoes/footwear for resident'],
    criticalSteps: [
      'Ensure resident is wearing non-skid footwear before standing.',
      'Lock bed brakes and wheelchair brakes if applicable, and ensure bed is at safe low position with resident feet flat on floor.',
      'Apply gait belt securely over clothing around resident waist with buckle centered or slightly off-center (fits flat 2 fingers).',
      'Grasp belt with underhand (upward) grip on both sides or back while assisting resident to stand.',
      'Walk slightly behind and to the side of resident on their weaker side while maintaining secure underhand hold.'
    ],
    procedureSteps: [
      'Knock, introduce self, explain procedure, wash hands, provide privacy.',
      'Assist resident to sitting position on edge of bed (dangle feet, check for dizziness).',
      'Apply non-skid shoes securely.',
      'Fasten gait belt snugly over clothing around waist.',
      'Count "1, 2, 3" on pre-arranged signal and assist to stand keeping back straight and knees bent.',
      'Ambulate 10-15 paces holding belt with underhand grip.',
      'Return resident safely to chair or bed, remove belt, leave call light, wash hands.'
    ],
    commonMistakes: [
      'Placing gait belt directly against bare skin (must be over clothing).',
      'Using an overhand grip instead of underhand grip.',
      'Allowing resident to walk barefoot or in slick socks.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'transfer-bed-to-wheelchair',
    name: 'Transfers Resident from Bed to Wheelchair Using Gait Belt',
    category: 'Basic Restorative & Mobility',
    durationEstimateMinutes: 8,
    equipmentNeeded: ['Wheelchair', 'Gait belt', 'Non-skid shoes'],
    criticalSteps: [
      'Lock both wheelchair wheels securely before beginning transfer.',
      'Position wheelchair at slight angle (30-45 degrees) near bed facing foot or head on resident stronger side.',
      'Fold footrests up and out of the way before standing resident.',
      'Lock bed brakes and lower bed so resident feet touch floor flat.',
      'Apply gait belt snugly over clothing and use underhand grip to assist resident safely into chair.'
    ],
    procedureSteps: [
      'Introduce self, verify identity, explain procedure, provide privacy, wash hands.',
      'Position wheelchair alongside bed touching bed on stronger side, lock chair brakes, swing footrests back.',
      'Lower bed, raise head of bed, assist resident to sitting position on edge.',
      'Ensure resident feels stable and alert, put on non-skid footwear.',
      'Apply gait belt around waist, test fit with two flat fingers.',
      'Brace knees/feet against resident feet, grasp belt with underhand grip.',
      'Signal stand on 3, pivot toward wheelchair until back of resident legs touch chair seat.',
      'Lower resident gently into seat, remove belt, position footrests, place call light in hand.'
    ],
    commonMistakes: [
      'Leaving wheelchair unlocked (dangerous fall hazard).',
      'Forgetting to move footplates away before standing resident.',
      'Twisting resident torso instead of pivoting with your feet.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'positioning-on-side',
    name: 'Positions Resident on Side (Lateral Position)',
    category: 'Safety & Positioning',
    durationEstimateMinutes: 7,
    equipmentNeeded: ['3 to 4 pillows', 'Bed linen'],
    criticalSteps: [
      'Raise side rail on side resident will turn toward (if permitted) or stand on opposite side to ensure resident cannot roll off.',
      'Ensure resident is aligned comfortably and not lying on their dependent shoulder or arm.',
      'Place supporting pillows: one under head/neck, one folded lengthwise behind back to maintain position, one between knees and ankles to prevent bony contact, and one supporting upper arm.'
    ],
    procedureSteps: [
      'Knock, greet resident, explain positioning, wash hands, ensure privacy.',
      'Raise bed to comfortable working height, flatten bed.',
      'Move resident closer to side of bed opposite the direction they will turn (in 3 segments: upper body, hips, legs).',
      'Cross upper leg over lower leg, cross arm over chest.',
      'Gently roll resident onto side toward center of bed.',
      'Position back pillow securely under spine for tilt support.',
      'Flex upper knee and place pillow between knees and ankles to protect pressure points.',
      'Position pillow under top arm so chest is open.',
      'Lower bed to lowest position, place call bell, wash hands.'
    ],
    commonMistakes: [
      'Leaving resident pinned directly on top of shoulder/arm.',
      'Failing to cushion knees and ankles together (causes friction/pressure sores).',
      'Leaving bed in elevated high position when leaving room.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'donning-doffing-ppe',
    name: 'Donning and Doffing PPE (Gown and Gloves)',
    category: 'Infection Control',
    durationEstimateMinutes: 5,
    equipmentNeeded: ['Isolation gown', 'Disposable examination gloves', 'Biohazard/waste container'],
    criticalSteps: [
      'Don gown first, securing at neck and waist completely covering torso and uniform.',
      'Put on gloves, pulling cuffs of gloves OVER the sleeves/cuffs of the gown.',
      'Doff gloves FIRST (or gown and gloves together) by peeling inside out without touching dirty exterior to bare skin.',
      'Doff gown by untying neck/waist, pulling away from shoulders without touching front exterior, rolling dirty side inward.',
      'Perform hand hygiene immediately after removing PPE.'
    ],
    procedureSteps: [
      'Select properly sized isolation gown.',
      'Slip arms into sleeves, tie strings snugly around neck and waist.',
      'Put on gloves, ensuring gloves extend over wrists and gown cuffs.',
      'To remove: grasp outside edge of one glove near wrist, peel off turning inside-out into palm.',
      'Slide bare finger under cuff of remaining glove, peel off inside-out over first glove; discard.',
      'Untie gown neck and waist ties.',
      'Slip fingers inside neck/shoulders, pull gown forward and roll contaminated outside inward into a bundle.',
      'Discard in designated hamper/container and immediately wash hands thoroughly.'
    ],
    commonMistakes: [
      'Touching bare skin to outer contaminated surface of gloves or gown.',
      'Shaking gown when unfolding.',
      'Failing to wash hands immediately after doffing.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'assisting-with-bedpan',
    name: 'Assists with Use of Bedpan',
    category: 'Personal Care',
    durationEstimateMinutes: 8,
    equipmentNeeded: ['Standard bedpan or fracture pan', 'Barrier pad', 'Toilet paper', 'Moist towelette / washcloth', 'Gloves'],
    criticalSteps: [
      'Place clean barrier pad under resident hips.',
      'Position bedpan correctly under resident buttocks (wider end toward head for standard pan; handle toward feet for fracture pan).',
      'Elevate head of bed to sitting position (semi-Fowler or Fowler) unless contraindicated so resident is in comfortable elimination posture.',
      'Leave toilet tissue and call light within easy reach of resident, then step away to provide privacy.',
      'Wear clean gloves when removing bedpan, empty into toilet/measuring container, rinse and dry.'
    ],
    procedureSteps: [
      'Introduce self, wash hands, verify resident, explain procedure, pull privacy curtain.',
      'Lower head of bed flat, put on gloves.',
      'Have resident bend knees and lift hips, or turn resident on side to position bedpan.',
      'Ensure correct placement, raise head of bed so resident is upright.',
      'Place toilet paper, call bell, and moist towelette within resident reach.',
      'Remove gloves, wash hands, state you will return when resident rings.',
      'Upon return: wash hands, put on clean gloves, lower head of bed, assist resident off bedpan.',
      'Offer moist towelette for resident hand hygiene, clean equipment, lower bed, wash hands.'
    ],
    commonMistakes: [
      'Leaving resident lying flat on bedpan (painful and unnatural for voiding).',
      'Forgetting to leave call light or toilet paper within reach.',
      'Touching bedpan exterior with bare hands.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'perineal-care-female',
    name: 'Perineal Care for Female Resident',
    category: 'Personal Care',
    durationEstimateMinutes: 9,
    equipmentNeeded: ['Basin with warm water (105°F)', 'Soap', '3-4 washcloths', 'Towel', 'Barrier pad', 'Gloves'],
    criticalSteps: [
      'Test water temperature and ask resident to verify water is comfortable.',
      'Put on clean gloves and protect bed with waterproof barrier.',
      'Wash perineal area using clean area of washcloth for each stroke from FRONT to BACK (urethra toward rectum).',
      'Clean between labia downward front-to-back, rinse front-to-back with clean cloth, pat dry.',
      'Turn resident onto side to wash, rinse, and pat dry anal area from front to back; discard soiled linens, remove gloves, wash hands.'
    ],
    procedureSteps: [
      'Verify water temperature on inner wrist, offer resident to test with fingers.',
      'Drape resident with bath blanket to maintain privacy, uncover only perineum.',
      'Wet washcloth, apply soap.',
      'Separate labia: wipe center from clitoris down to anus; change fold, wipe left side down; change fold, wipe right side down.',
      'Rinse with warm wet washcloth using same front-to-back technique with clean surfaces.',
      'Pat dry gently with clean towel.',
      'Turn resident on side: clean rectal area from front to back, rinse, pat dry.',
      'Remove barrier, dispose of water and linens, remove gloves, wash hands.'
    ],
    commonMistakes: [
      'Wiping from back to front (spreads fecal bacteria into urethra causing severe UTI).',
      'Using the same dirty fold of washcloth across multiple strokes.',
      'Leaving resident wet without patting dry (leads to skin breakdown).'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'range-of-motion-shoulder',
    name: 'Range of Motion (ROM) Exercises — Shoulder',
    category: 'Basic Restorative & Mobility',
    durationEstimateMinutes: 6,
    equipmentNeeded: ['No special equipment; resident supine in bed'],
    criticalSteps: [
      'Support resident arm at elbow and wrist joints throughout the exercise movements.',
      'Perform flexion/extension (raising arm straight up over head) slowly and smoothly at least 3 times unless pain occurs.',
      'Perform abduction/adduction (moving arm out away from body and back) at least 3 times smoothly.',
      'Ask resident throughout if they feel any pain or discomfort, and stop immediately if pain is indicated.'
    ],
    procedureSteps: [
      'Greet resident, verify ID, explain ROM, wash hands, ensure privacy.',
      'Position resident comfortably in supine position.',
      'Gently cup one hand under resident wrist and one hand under elbow joint.',
      'Slowly raise arm straight up toward head of bed and gently return down (flexion/extension x 3).',
      'Ask: "Does this cause you any pain?"',
      'Gently move straight arm out to side away from body and return to side (abduction/adduction x 3).',
      'Leave resident in good alignment, lower bed, provide call bell, wash hands.'
    ],
    commonMistakes: [
      'Failing to support both the wrist and elbow joints.',
      'Moving joint past the point of resistance or pain.',
      'Doing fast, jerky movements instead of slow, controlled stretches.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  }
];

export const SC_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 'q1',
    scenario: 'You enter Mrs. Gable’s room to assist her with morning hygiene. She appears withdrawn and says, "What is the point of getting washed up? Nobody visits me anyway."',
    options: [
      { id: 'a', text: 'Tell her that her family will surely visit soon and proceed to wash her quickly.' },
      { id: 'b', text: 'Sit at eye level, listen actively, and encourage her to express how she is feeling before gently offering assistance.' },
      { id: 'c', text: 'Report to the nurse that Mrs. Gable refused care and leave the room immediately.' },
      { id: 'd', text: 'Remind her that facility policy requires all residents to be bathed by 9:00 AM.' }
    ],
    correctOptionId: 'b',
    rationale: 'Active listening and emotional support address the resident’s psychosocial needs while honoring resident rights and dignity. Never brush off feelings with false reassurance or punitive policy reminders.',
    domain: 'Psychosocial Care Skills',
    officialSourceCitation: 'Credentia NNAAP Candidate Handbook — Emotional & Mental Health Needs'
  },
  {
    id: 'q2',
    scenario: 'While measuring Mrs. Davis’s radial pulse, you count 52 beats per minute. Her chart indicates her baseline resting pulse is normally between 72 and 80 bpm.',
    options: [
      { id: 'a', text: 'Document 72 bpm because it is within her normal baseline range.' },
      { id: 'b', text: 'Wait until the end of your shift to mention the finding on the general report sheet.' },
      { id: 'c', text: 'Immediately notify the charge nurse of the bradycardia reading (52 bpm) and recheck.' },
      { id: 'd', text: 'Offer Mrs. Davis a cup of hot coffee to stimulate her heart rate before recounting.' }
    ],
    correctOptionId: 'c',
    rationale: 'A pulse of 52 bpm is bradycardia and represents a significant acute deviation from Mrs. Davis’s baseline. Vital sign abnormalities must be reported immediately to the supervising licensed nurse.',
    domain: 'Role of the Nurse Aide',
    officialSourceCitation: 'Credentia NNAAP Handbook — Reporting and Recording Changes'
  },
  {
    id: 'q3',
    scenario: 'When performing female perineal care, in which direction must the nursing assistant always wipe the resident’s anatomy?',
    options: [
      { id: 'a', text: 'From the rectal area forward toward the urethra.' },
      { id: 'b', text: 'In circular motions outward from the thighs toward the center.' },
      { id: 'c', text: 'From front to back (urethra toward rectum), using a clean area of the cloth for each stroke.' },
      { id: 'd', text: 'Back and forth briskly to ensure thorough removal of dried secretions.' }
    ],
    correctOptionId: 'c',
    rationale: 'Wiping front to back prevents bacteria from the anal area from contaminating the urinary meatus, which is the primary cause of healthcare-associated urinary tract infections (UTIs).',
    domain: 'Infection Control & Safety',
    officialSourceCitation: 'Credentia SC Skills Handbook — Perineal Care for Female'
  },
  {
    id: 'q4',
    scenario: 'You are helping Mr. Jones, who has right-sided hemiparesis following a stroke, transfer from his bed to a wheelchair. Where should the wheelchair be positioned?',
    options: [
      { id: 'a', text: 'Directly behind Mr. Jones so he can back up into it.' },
      { id: 'b', text: 'On his stronger (unaffected left) side at a 30-45 degree angle to the bed.' },
      { id: 'c', text: 'On his weak (right) side so he can practice bearing weight on the affected limb.' },
      { id: 'd', text: 'At least 5 feet away from the bed to allow him room to walk.' }
    ],
    correctOptionId: 'b',
    rationale: 'During transfer, always position the wheelchair on the resident’s stronger (unaffected) side so they can lead with their strong side, bear weight, and reach the armrest for stability.',
    domain: 'Physical Care Skills',
    officialSourceCitation: 'Credentia SC Skills Handbook — Transfer from Bed to Wheelchair'
  },
  {
    id: 'q5',
    scenario: 'A resident’s son pulls you aside in the hallway and asks, "My dad’s doctor was here earlier. Did his cancer spread to his liver?" How must you respond?',
    options: [
      { id: 'a', text: 'Tell him the diagnosis if you saw it in the physician progress note.' },
      { id: 'b', text: 'Politely inform him that HIPAA and facility confidentiality policies require the physician or charge nurse to discuss medical diagnoses with family.' },
      { id: 'c', text: 'Hand him his father’s electronic chart tablet so he can read the physician notes directly.' },
      { id: 'd', text: 'Reassure him that everything is fine and avoid bringing up cancer.' }
    ],
    correctOptionId: 'b',
    rationale: 'Under HIPAA and scope-of-practice regulations, the CNA cannot disclose medical diagnoses or prognostic details. Directing the family member to the nurse/physician protects resident confidentiality.',
    domain: 'Role of the Nurse Aide',
    officialSourceCitation: 'Credentia NNAAP Handbook — Legal and Ethical Principles & Confidentiality'
  },
  {
    id: 'q6',
    scenario: 'When applying a gait (transfer) belt around a resident’s waist prior to ambulation, which guideline must be strictly followed?',
    options: [
      { id: 'a', text: 'Fasten the belt directly over the resident’s bare skin for maximum friction.' },
      { id: 'b', text: 'Leave enough slack so you can slide your entire forearm between belt and waist.' },
      { id: 'c', text: 'Place the belt snugly over clothing with room for two flat fingers underneath, grasping with an underhand grip.' },
      { id: 'd', text: 'Use an overhand, downward-pulling grip to lift the resident off the bed.' }
    ],
    correctOptionId: 'c',
    rationale: 'The gait belt must be applied over clothing to avoid skin shearing, fitted so two fingers fit snugly, and held with an upward (underhand) grasp for controlled support during standing.',
    domain: 'Physical Care Skills',
    officialSourceCitation: 'Credentia SC Skills Handbook — Ambulation with Gait Belt'
  },
  {
    id: 'q7',
    scenario: 'A candidate has just finished performing the Hand Hygiene skill during the South Carolina Skills Evaluation. To properly turn off the water faucet, the candidate should:',
    options: [
      { id: 'a', text: 'Use clean bare fingers since the hands have already been washed with antimicrobial soap.' },
      { id: 'b', text: 'Use the towel that was just used to dry the hands and wrists.' },
      { id: 'c', text: 'Use a clean, dry paper towel to turn off the faucet handles without touching them with bare hands.' },
      { id: 'd', text: 'Turn off the water using their elbow or forearm directly.' }
    ],
    correctOptionId: 'c',
    rationale: 'Faucet handles are contaminated surfaces. Touching them with newly washed bare hands or with wet towels instantly re-contaminates the hands. A clean, dry paper towel must be used.',
    domain: 'Infection Control & Safety',
    officialSourceCitation: 'Credentia SC Skills Handbook — Hand Hygiene Critical Step'
  },
  {
    id: 'q8',
    scenario: 'How many total clock hours must a candidate complete in a South Carolina state-approved nurse aide training program, including the mandatory clinical component?',
    options: [
      { id: 'a', text: '75 hours total, with at least 16 hours clinical.' },
      { id: 'b', text: '100 hours total, with at least 40 hours of supervised clinical training.' },
      { id: 'c', text: '120 hours total, all completed in a classroom.' },
      { id: 'd', text: '150 hours total, with at least 80 hours clinical.' }
    ],
    correctOptionId: 'b',
    rationale: 'South Carolina Department of Health and Human Services requires a minimum 100-hour state-approved curriculum, which must include at least 40 hours of supervised clinical experience in a nursing facility.',
    domain: 'Role of the Nurse Aide',
    officialSourceCitation: 'Credentia SC Eligibility Criteria — SCDHHS Training Standards'
  },
  {
    id: 'q9',
    scenario: 'You are preparing to take your NNAAP Written Examination at an in-person South Carolina testing center. What must you bring for identification?',
    options: [
      { id: 'a', text: 'Just your cell phone with a digital photo of your driver license.' },
      { id: 'b', text: 'Two forms of matching valid ID: one government-issued photo ID with signature, and one secondary matching ID.' },
      { id: 'c', text: 'Only your birth certificate and utility bill.' },
      { id: 'd', text: 'Your nursing school lanyard badge alone.' }
    ],
    correctOptionId: 'b',
    rationale: 'Credentia requires two matching, unexpired IDs. One must be a government-issued photo ID with signature (Driver’s License, Passport, State ID, Military ID). Names must match CNA365 exactly.',
    domain: 'Infection Control & Safety',
    officialSourceCitation: 'Credentia SC Candidate Handbook — Exam Day Test Center Identification'
  },
  {
    id: 'q10',
    scenario: 'After successfully passing both the Written/Oral Exam and the Skills Evaluation in South Carolina, what is the maintenance requirement to keep CNA certification active on the SC Nurse Aide Registry?',
    options: [
      { id: 'a', text: 'Retake both examinations every single year.' },
      { id: 'b', text: 'Work at least 8 consecutive hours for pay performing nurse aide duties under RN/LPN supervision every 24 months.' },
      { id: 'c', text: 'Pay a $200 renewal fee every 5 years with no work requirement.' },
      { id: 'd', text: 'Log 500 volunteer community service hours at a hospital.' }
    ],
    correctOptionId: 'b',
    rationale: 'Under South Carolina DHHS rules, registry renewal requires documented paid employment of at least one shift (8 consecutive hours) of nurse aide duties under licensed nursing supervision during the 24-month period.',
    domain: 'Role of the Nurse Aide',
    officialSourceCitation: 'Credentia SC Handbook — Registry Maintenance and Renewal'
  }
];
