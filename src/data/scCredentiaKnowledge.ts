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
  },
  {
    id: 'elastic-stocking',
    name: 'Applies One Knee-High Elastic Stocking',
    category: 'Basic Restorative & Mobility',
    durationEstimateMinutes: 5,
    equipmentNeeded: ['One knee-high elastic stocking (TED hose)', 'Resident supine in bed'],
    criticalSteps: [
      'Turns stocking inside out, at least to the heel, before placing onto resident foot.',
      'Places foot of stocking over resident toes, foot, and heel, with the heel of the stocking centered squarely over the resident heel.',
      'Pulls and smooths stocking up leg without any twists, bunches, rolls, or wrinkles, with the top of stocking resting 1-2 inches below the patella (knee bend).'
    ],
    procedureSteps: [
      'Knock, introduce self, explain procedure, wash hands, provide privacy.',
      'Ensure resident is lying comfortably supine in good body alignment.',
      'Expose only the leg receiving the stocking.',
      'Turn stocking inside out down to the heel pocket, creating a smooth toe sleeve.',
      'Ease stocking over resident toes, foot, and heel, aligning the heel pocket securely.',
      'Gently pull and gather remaining stocking up the calf toward the knee.',
      'Check that toe area is smooth with no tight constriction over toes, heel is centered, and no wrinkles or rolled top band exist.',
      'Cover resident with top sheet, lower bed, place call bell within reach, wash hands.'
    ],
    commonMistakes: [
      'Bunching the entire stocking and forcing it over foot without turning inside out first.',
      'Leaving a rolled band at the top of the stocking (acts as a venous tourniquet, causing blood clots).',
      'Leaving wrinkles in the fabric against fragile skin.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'denture-care',
    name: 'Cleans Upper or Lower Denture',
    category: 'Personal Care',
    durationEstimateMinutes: 6,
    equipmentNeeded: ['Denture cup with lid', 'Toothbrush or denture brush', 'Denture cleanser or toothpaste', 'Small towel or washcloth for sink lining', 'Gloves'],
    criticalSteps: [
      'Lines bottom of sink with a clean protective towel or washcloth, or fills sink with moderate level of water, BEFORE cleaning dentures over sink.',
      'Applies approved denture cleanser or toothpaste to brush.',
      'Brushes inner, outer, and chewing/groove surfaces of denture thoroughly.',
      'Rinses denture completely under moderate temperature running water (never uses hot water).',
      'Places cleaned denture into clean, labeled denture cup filled with cool clean water or soaking solution, and secures lid.'
    ],
    procedureSteps: [
      'Put on clean examination gloves.',
      'Line sink basin with clean towel or fill halfway with cool water to protect against chipping if dropped.',
      'Open denture cup and inspect dentures.',
      'Apply toothpaste or denture paste to brush.',
      'Brush inner surface that contacts gums, outer surface, and chewing edges under moderate running water.',
      'Rinse denture completely under cool running water to eliminate all paste residue.',
      'Rinse denture cup, place denture inside, fill with cool clean water, and cover with lid.',
      'Rinse toothbrush, remove sink lining and dispose in linen hamper, clean basin, remove gloves, wash hands.'
    ],
    commonMistakes: [
      'Brushing dentures over an empty, unlined hard porcelain sink (shatters if dropped).',
      'Using hot water (warps denture acrylic, destroying comfortable fit).',
      'Handling resident dentures without gloves.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'dressing-weak-arm',
    name: 'Dresses Resident with Affected (Weak) Right or Left Arm',
    category: 'Personal Care',
    durationEstimateMinutes: 7,
    equipmentNeeded: ['Two choices of shirts/blouses with front buttons', 'Bath blanket/sheet for privacy'],
    criticalSteps: [
      'Dresses the affected (weak) arm FIRST by inserting sleeve over the affected arm before the unaffected arm.',
      'Undresses the unaffected (strong) arm FIRST before removing garment from the affected arm.',
      'Handles resident extremities gently, supporting joints and avoiding hyperextension or pulling.'
    ],
    procedureSteps: [
      'Knock, greet resident, explain dressing procedure, wash hands, provide privacy.',
      'Offer resident a choice between two shirts and honor their selection.',
      'Place bath blanket over resident and remove top sheet to maintain warmth and dignity.',
      'To undress: gently slide garment off the unaffected (strong) arm first, then ease off the affected (weak) arm.',
      'To dress: gather sleeve and slide gently over the affected (weak) arm first up to shoulder, then have resident reach through opposite sleeve with strong arm.',
      'Button shirt smoothly, straighten clothing, remove bath blanket, leave resident comfortable, place call bell, wash hands.'
    ],
    commonMistakes: [
      'Dressing the strong arm first (causes extreme pain and strain on the paralyzed or weak limb).',
      'Pulling aggressively on resident fingers or wrist.',
      'Leaving resident exposed without a privacy drape.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'feeding-resident',
    name: 'Feeds Resident Who Cannot Feed Self',
    category: 'Measurement',
    isMeasurement: true,
    durationEstimateMinutes: 8,
    equipmentNeeded: ['Meal tray with food and beverage', 'Clothing protector or napkin', 'Wet wipe / washcloth for resident hands', 'Recording sheet', 'Pen'],
    criticalSteps: [
      'Assists resident to an upright sitting position (75 to 90 degrees, high Fowler’s) before offering any food or fluid.',
      'Performs or assists resident with hand hygiene before meal begins.',
      'Sits in a chair placed at resident eye level facing the resident while assisting with meal.',
      'Offers food in small, manageable spoonfuls, asks resident what they prefer to eat first, and ensures resident has swallowed each bite before offering another.',
      'Records meal consumption percentage accurately on Credentia recording sheet within +/- 25% of Evaluator calculation, and fluid intake in mL within +/- 25 mL.'
    ],
    procedureSteps: [
      'Introduce self, wash hands, confirm resident identity matching diet card.',
      'Elevate head of bed to 75-90 degrees.',
      'Clean resident hands with moist wipe or cloth.',
      'Wipe overbed table and position meal tray.',
      'Sit facing resident at eye level.',
      'Describe food items on tray, ask resident preferences for first bite.',
      'Offer small spoonfuls of food, alternating with sips of beverage.',
      'Confirm resident has completely swallowed before offering next spoonful.',
      'When finished, wipe resident mouth and hands, remove meal tray, leave resident upright (at least 30 min) to prevent aspiration.',
      'Record food intake percentage and fluid consumed on Credentia recording sheet immediately.'
    ],
    commonMistakes: [
      'Feeding resident while semi-reclined (critical choking/aspiration pneumonia risk).',
      'Standing over the resident while feeding instead of sitting at eye level.',
      'Rushing food without verifying each bite has been swallowed.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'modified-bed-bath',
    name: 'Gives Modified Bed Bath (Face and One Arm, Hand and Underarm)',
    category: 'Personal Care',
    durationEstimateMinutes: 10,
    equipmentNeeded: ['Basin with warm water (105°F)', 'Soap', '2-3 washcloths', '2 towels', 'Bath blanket', 'Clean gown', 'Gloves'],
    criticalSteps: [
      'Tests water temperature on inner wrist and asks resident to verify water temperature is comfortable.',
      'Washes eyes gently with wet washcloth WITHOUT soap, wiping from inner canthus to outer canthus using a clean area of the cloth for each stroke.',
      'Washes, rinses, and pats dry face without soap (or soap only upon explicit resident request).',
      'Places protective towel under arm, washes arm, hand, and axilla (underarm) with soap, rinses thoroughly, and pats dry.',
      'Applies clean gown while keeping resident draped for privacy and warmth throughout.'
    ],
    procedureSteps: [
      'Wash hands, greet resident, explain bath, pull privacy curtain.',
      'Fill basin with warm water, test temperature on inner wrist, offer resident to test with fingers.',
      'Put on clean gloves, place bath blanket over resident, and remove soiled gown under blanket.',
      'Clean eyes from inner to outer canthus with warm water only, using separate clean folds of cloth.',
      'Wash face, ears, and neck with water, pat dry with towel.',
      'Expose one arm: place towel underneath, wash arm, hand, fingernails, and axilla with soap.',
      'Rinse arm, hand, and axilla with wet washcloth; pat completely dry with towel.',
      'Assist into clean gown, remove bath blanket, empty and dry basin, dispose of linens, remove gloves, wash hands.'
    ],
    commonMistakes: [
      'Using soap on or near resident eyes (causes chemical irritation and eye injury).',
      'Wiping eyes from outer canthus toward inner canthus (spreads bacteria into tear duct).',
      'Leaving resident underarm or skin folds damp without patting dry.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'measuring-weight',
    name: 'Measures and Records Weight of Ambulatory Resident',
    category: 'Measurement',
    isMeasurement: true,
    durationEstimateMinutes: 5,
    equipmentNeeded: ['Standing balance beam or digital scale', 'Non-skid footwear', 'Recording sheet', 'Pen'],
    criticalSteps: [
      'Ensures resident is wearing non-skid footwear before standing and walking to scale.',
      'Zeros / balances the scale to zero (0.0 lb) before resident steps onto the platform.',
      'Stands close to resident to provide physical stability and fall protection while resident steps on, stands centered, and steps down.',
      'Records weight measurement on candidate recording sheet within +/- 2 lbs of Evaluator measurement.'
    ],
    procedureSteps: [
      'Greet resident, explain procedure, wash hands.',
      'Ensure resident has non-skid shoes securely on feet.',
      'Calibrate scale to zero: verify beam indicator balances level or digital display shows 0.0.',
      'Assist resident to step onto center of scale platform.',
      'Instruct resident to stand upright and keep hands off walls or rails while balancing.',
      'Adjust weights until balance indicator rests centered, read value.',
      'Assist resident safely off scale and return to comfortable seating.',
      'Document weight on recording sheet immediately, wash hands.'
    ],
    commonMistakes: [
      'Failing to zero the scale before resident steps on.',
      'Allowing resident to step onto scale in slippery stocking feet.',
      'Recording weight outside the +/- 2 lb allowable variance.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'range-of-motion-knee-ankle',
    name: 'Range of Motion (ROM) Exercises — Knee and Ankle',
    category: 'Basic Restorative & Mobility',
    durationEstimateMinutes: 6,
    equipmentNeeded: ['Resident supine in bed (no external equipment)'],
    criticalSteps: [
      'Supports resident leg at knee joint with one hand and under ankle/heel with other hand throughout movements.',
      'Performs flexion and extension of knee (bending toward chest and straightening) smoothly at least 3 times unless pain occurs.',
      'Performs dorsiflexion and plantar flexion of ankle (pushing foot toward head and pointing toes down) smoothly at least 3 times.',
      'Asks resident throughout if they feel any pain or discomfort, and ceases exercise immediately if pain is indicated.'
    ],
    procedureSteps: [
      'Greet resident, identify self, explain ROM, wash hands, ensure privacy.',
      'Position resident comfortably supine in good body alignment.',
      'Place one hand under resident knee and one hand under ankle to support joints.',
      'Flex knee by gently moving toward chest, then extend leg back flat (flexion/extension x 3).',
      'Support ankle and foot: gently push foot up toward head (dorsiflexion) and point toes downward (plantar flexion) x 3.',
      'Ask resident if they feel any pain after each set of movements.',
      'Align resident comfortably, lower bed, place call bell within reach, wash hands.'
    ],
    commonMistakes: [
      'Failing to support both the knee and ankle joints simultaneously.',
      'Moving joint past resistance or ignoring verbal/nonverbal pain signals.',
      'Performing jerky, fast movements.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'catheter-care-female',
    name: 'Provides Catheter Care for Female Resident',
    category: 'Personal Care',
    durationEstimateMinutes: 8,
    equipmentNeeded: ['Basin with warm water (105°F)', 'Soap', '2-3 washcloths', 'Towel', 'Barrier pad', 'Gloves'],
    criticalSteps: [
      'Tests water temperature on inner wrist and asks resident to verify temperature is comfortable.',
      'Puts on clean gloves and places protective barrier beneath resident hips.',
      'While holding catheter tubing securely near urinary meatus with one hand to prevent pulling or tension, washes at least 4 inches of catheter tubing moving AWAY from meatus in one direction with soapy cloth.',
      'Rinses at least 4 inches of catheter tubing with clean wet cloth moving away from meatus in downward direction.',
      'Dries catheter tubing gently with clean towel, removes barrier, disposes of equipment, removes gloves, washes hands.'
    ],
    procedureSteps: [
      'Wash hands, greet resident, explain procedure, pull privacy curtain.',
      'Test water temperature and confirm with resident.',
      'Put on clean gloves, place barrier pad under hips, drape resident exposing only catheter site.',
      'Hold catheter securely with fingers near meatus without pulling on urethra.',
      'Wipe tubing away from body at least 4 inches with soapy washcloth (never back-and-forth).',
      'Rinse with wet washcloth wiping away from body at least 4 inches.',
      'Pat dry gently with clean towel.',
      'Ensure tubing is free of kinks and drainage bag is hung below bladder level on bed frame (not side rail).',
      'Dispose of linens and water, remove gloves, wash hands.'
    ],
    commonMistakes: [
      'Tugging or pulling on catheter tubing at meatus (severe pain and tissue damage).',
      'Wiping toward the meatus (pushes bacteria straight up urinary tract causing CAUTI).',
      'Hanging drainage bag higher than bladder level or on moving bed rail.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'foot-care',
    name: 'Provides Foot Care on One Foot',
    category: 'Personal Care',
    durationEstimateMinutes: 8,
    equipmentNeeded: ['Basin with warm water (105°F)', 'Soap', 'Washcloth', '2 towels', 'Lotion', 'Gloves'],
    criticalSteps: [
      'Tests water temperature on inner wrist and asks resident to verify comfort.',
      'Submerges foot in warm water basin and washes foot with soap, including between all toes.',
      'Rinses foot thoroughly, ensuring soap is rinsed completely from between toes.',
      'Dries entire foot thoroughly with clean towel, paying special attention to drying completely BETWEEN TOES.',
      'Applies lotion to top and sole of foot, removes excess with towel, and NEVER applies lotion between toes.'
    ],
    procedureSteps: [
      'Introduce self, wash hands, explain foot care, pull curtain.',
      'Check water temperature on inner wrist, offer resident to test with toes/fingers.',
      'Put on clean gloves, place protective towel on floor, position basin.',
      'Immerse resident foot in warm water to soak briefly.',
      'Wash foot with soapy washcloth, gently washing between every toe.',
      'Rinse foot thoroughly, ensuring all soap residue is removed from between toes.',
      'Dry foot thoroughly with towel, separating toes to ensure skin is completely dry.',
      'Warm lotion in hands, massage onto top and bottom of foot; wipe excess with towel.',
      'Put on clean sock and shoe, empty and dry basin, remove gloves, wash hands.'
    ],
    commonMistakes: [
      'Leaving lotion between toes (causes moisture buildup, skin maceration, and fungal growth).',
      'Failing to dry thoroughly between toes.',
      'Placing foot into water without testing temperature.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'mouth-care-teeth',
    name: 'Provides Mouth Care (Brushing Teeth)',
    category: 'Personal Care',
    durationEstimateMinutes: 7,
    equipmentNeeded: ['Toothbrush', 'Toothpaste', 'Cup of water', 'Emesis basin', 'Towel barrier', 'Gloves'],
    criticalSteps: [
      'Assists resident to an upright sitting position (75 to 90 degrees) before beginning mouth care to prevent aspiration.',
      'Puts on clean gloves and places protective towel across resident chest.',
      'Applies toothpaste to wet toothbrush and gently cleans all surfaces of teeth (inner, outer, and chewing surfaces) and gumline.',
      'Gently cleans surface of resident tongue.',
      'Holds emesis basin under resident chin while resident rinses mouth with clean water and spits, then pats mouth dry.'
    ],
    procedureSteps: [
      'Greet resident, explain brushing, wash hands, provide privacy.',
      'Raise head of bed to 75-90 degrees (high Fowler’s).',
      'Put on clean gloves, place towel barrier over chest.',
      'Moisten toothbrush with water, apply small ribbon of toothpaste.',
      'Clean upper and lower teeth, gums, and roof of mouth with gentle circular strokes.',
      'Gently brush tongue from back to front.',
      'Offer water to rinse, hold basin to chin as resident spits.',
      'Repeat until mouth is clean, wipe resident face and chin.',
      'Rinse toothbrush, dry equipment, dispose of towel, remove gloves, wash hands.'
    ],
    commonMistakes: [
      'Brushing teeth while resident is semi-reclined or lying down (aspiration hazard).',
      'Forgetting to brush tongue or inner surfaces of teeth.',
      'Touching soiled toothbrush directly to clean table surfaces.'
    ],
    officialSourceUrl: 'https://kb-sc.credentia.com/en/article/skills'
  },
  {
    id: 'making-occupied-bed',
    name: 'Makes an Occupied Bed',
    category: 'Safety & Positioning',
    durationEstimateMinutes: 10,
    equipmentNeeded: ['Clean bottom fitted/flat sheet', 'Draw sheet (if used)', 'Clean top sheet', 'Clean pillowcase', 'Gloves', 'Laundry hamper'],
    criticalSteps: [
      'Raises bed to comfortable working height and raises side rail on opposite turning side for resident safety.',
      'Keeps resident covered with a top sheet or bath blanket throughout procedure to maintain warmth and privacy.',
      'Rolls soiled bottom linen toward resident with soiled side rolled inward, and tucks snug against resident back.',
      'Applies clean bottom sheet to exposed mattress, unrolls toward resident, and tucks clean roll under soiled roll.',
      'Turns resident to opposite side over linen roll, removes soiled linens directly into hamper (never touches floor or uniform), pulls clean linens taut without wrinkles, and leaves a toe pleat at foot of bed.'
    ],
    procedureSteps: [
      'Knock, introduce self, wash hands, explain linen change, ensure privacy.',
      'Raise bed to ergonomic working height, flatten head of bed if tolerated.',
      'Raise side rail on far side, assist resident to turn toward raised rail.',
      'Loosen soiled bottom linens on near side, roll inward tightly against resident back.',
      'Place clean bottom sheet on mattress, fanfold/roll clean center edge under dirty roll.',
      'Raise near rail, move to opposite side, assist resident to turn over roll onto clean side.',
      'Lower opposite rail, remove soiled linen directly into laundry bag.',
      'Pull clean bottom sheet through, smoothing all wrinkles taut.',
      'Center top sheet, tuck at foot of bed, make mitered corners, and create a 2-3 inch toe pleat for foot comfort.',
      'Change pillowcase supporting head, lower bed to lowest position, place call light in reach, wash hands.'
    ],
    commonMistakes: [
      'Leaving wrinkles in bottom sheet (creates friction and leads to decubitus pressure ulcers).',
      'Shaking dirty linens or placing dirty linens on the floor or chairs.',
      'Failing to create a toe pleat at the foot of the bed (causes foot drop and pressure on toes).'
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
