import { JourneyStage } from '../types/journey';

export const SC_JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'training',
    order: 1,
    title: 'State-Approved Training',
    subtitle: '100 total hours (minimum 40 clinical hours)',
    description: 'South Carolina Department of Health and Human Services (SCDHHS) requires all nurse aide candidates to graduate from an approved training program consisting of at least 100 clock hours.',
    actionRequired: 'Verify your school or training facility has issued your official Certificate of Completion and logged your 40 clinical hours.',
    actionLinkText: 'Check SC Approved Training List',
    actionUrl: 'https://credentia.com/test-takers/sc/',
    officialSource: {
      title: 'Credentia SC — Eligibility Criteria',
      url: 'https://kb-sc.credentia.com/en/article/eligibility-criteria',
      lastVerified: 'October 4, 2026'
    },
    whyThisMatters: 'Without an approved SC training code or official completion certificate uploaded to CNA365, Credentia cannot verify your eligibility to test.',
    checklistItems: [
      'Completed 60+ classroom/lab hours',
      'Completed 40+ supervised hands-on clinical hours in a licensed nursing facility',
      'Obtained signed certificate of completion from Training Director',
      'Confirmed program graduation date is within the past 24 months'
    ]
  },
  {
    id: 'eligibility',
    order: 2,
    title: 'Eligibility & Route Selection',
    subtitle: 'Determine your testing pathway under SC law',
    description: 'Ensure you qualify under Route 1 (SC NATCEP graduate), Route 2 (LPN/RN student with 100+ clinical hours), Route 3 (Military medical corps), or Route 4 (Reciprocity/Endorsement).',
    actionRequired: 'Confirm your identification documents (legal first and last name) match your training certificate letter-for-letter.',
    actionLinkText: 'View SC Eligibility Routes',
    actionUrl: 'https://kb-sc.credentia.com/en/article/eligibility-criteria',
    officialSource: {
      title: 'Credentia SC — Eligibility Criteria',
      url: 'https://kb-sc.credentia.com/en/article/eligibility-criteria',
      lastVerified: 'October 4, 2026'
    },
    whyThisMatters: 'If your legal name in Credentia CNA365 does not match your government ID, testing center evaluators are required by state law to turn you away without refund.',
    checklistItems: [
      'Selected primary eligibility route (Route 1 for standard SC graduates)',
      'Verified government photo ID is unexpired and has matching signature',
      'Gathered secondary identification (Social Security card or signed bank card)',
      'Noted the 24-month testing expiration date'
    ]
  },
  {
    id: 'application',
    order: 3,
    title: 'Credentia CNA365 Application',
    subtitle: 'Create portal account & submit examination application',
    description: 'All registration, exam fee payments ($140 for written + skills), and accommodation requests are managed through Credentia’s CNA365 portal.',
    actionRequired: 'Sign in to Credentia CNA365, complete the online South Carolina Nurse Aide application, and upload your training documentation.',
    actionLinkText: 'Go to Credentia CNA365 South Carolina',
    actionUrl: 'https://credentia.com/test-takers/sc/',
    officialSource: {
      title: 'Credentia SC — Application and Scheduling',
      url: 'https://kb-sc.credentia.com/en/article/application-and-scheduling',
      lastVerified: 'October 4, 2026'
    },
    whyThisMatters: 'Your application must be reviewed and officially approved by Credentia or SCDHHS before testing center dates become visible in the booking calendar.',
    checklistItems: [
      'Created permanent personal Credentia CNA365 account',
      'Entered legal name matching ID exactly (including suffixes like Jr/III)',
      'Uploaded training certificate or program director verification',
      'Paid $140 exam fee (or submitted employer voucher code)'
    ]
  },
  {
    id: 'scheduling',
    order: 4,
    title: 'Exam Approval & Scheduling',
    subtitle: 'Select test dates for Written/Oral and Skills components',
    description: 'Once Credentia reviews and approves your application (usually 2-5 business days), you can select your test date and testing location.',
    actionRequired: 'Book your in-person Skills Evaluation at an approved SC regional test site, and choose either in-person or online proctoring for the Written Exam.',
    actionLinkText: 'Open Credentia Booking Calendar',
    actionUrl: 'https://credentia.com/test-takers/sc/',
    officialSource: {
      title: 'Credentia SC — Application and Scheduling',
      url: 'https://kb-sc.credentia.com/en/article/application-and-scheduling',
      lastVerified: 'October 4, 2026'
    },
    whyThisMatters: 'Test center seats fill up weeks in advance across Columbia, Charleston, Greenville, Florence, and other SC regions. Scheduling promptly keeps you within your 2-year window.',
    checklistItems: [
      'Received "Application Approved" confirmation email from Credentia',
      'Chose written exam modality: In-Person Center vs. Online Proctored',
      'Selected test center location nearest your South Carolina county',
      'Downloaded and saved the official Confirmation Notice / Ticket'
    ]
  },
  {
    id: 'written_exam',
    order: 5,
    title: 'NNAAP Written / Oral Exam',
    subtitle: '70 multiple-choice questions in 2 hours',
    description: 'Evaluates your nursing theory knowledge across Physical Care (ADLs, restorative care), Psychosocial Care (mental health, dignity), and Role of the Nurse Aide (HIPAA, ethics).',
    actionRequired: 'Practice timed scenario questions, master resident rights and infection control principles, and complete your hardware check if testing online.',
    actionLinkText: 'Review Written Exam Outline',
    actionUrl: 'https://kb-sc.credentia.com/en/article/exam-overview',
    officialSource: {
      title: 'Credentia SC — Exam Overview',
      url: 'https://kb-sc.credentia.com/en/article/exam-overview',
      lastVerified: 'October 4, 2026'
    },
    whyThisMatters: 'The written exam requires a passing score on 60 scored questions. Understanding why an option is right prevents second-guessing under timed pressure.',
    checklistItems: [
      'Reviewed infection control chain and standard precautions',
      'Mastered normal vital sign ranges (Pulse 60-100, BP 120/80, Resp 12-20)',
      'Understood resident rights, abuse reporting, and scope of practice',
      'Completed practice exams with >80% accuracy'
    ]
  },
  {
    id: 'skills_exam',
    order: 6,
    title: 'NNAAP Skills Evaluation',
    subtitle: 'Demonstrate 5 assigned skills in 30 minutes',
    description: 'An approved RN Evaluator will assess you performing 5 skills: Hand Hygiene is ALWAYS first, 1 Measurement skill, and 3 randomly selected care skills.',
    actionRequired: 'Rehearse all 23 skills, memorizing bold critical steps (e.g. keeping fingertips downward, locking wheelchair brakes, front-to-back perineal wiping).',
    actionLinkText: 'Study the 23 Credentia Skills',
    actionUrl: 'https://kb-sc.credentia.com/en/article/skills',
    officialSource: {
      title: 'Credentia SC — Skills Evaluation Overview',
      url: 'https://kb-sc.credentia.com/en/article/skills',
      lastVerified: 'October 4, 2026'
    },
    whyThisMatters: 'Missing a single bold critical step results in an automatic skill failure. Remember the Credentia self-correction rule: you can verbally correct any step before moving on!',
    checklistItems: [
      'Memorized 5-step Hand Hygiene sequence (20 sec scrub, clean towel faucet)',
      'Practiced radial pulse and BP measurement within acceptable tolerances',
      'Memorized gait belt application and transfer pivot rules',
      'Practiced self-correction protocol: "Nurse Evaluator, I would like to correct that step"'
    ]
  },
  {
    id: 'results',
    order: 7,
    title: 'Score Reports & CNA365 Results',
    subtitle: 'Receive scores within hours to 24-48 hours',
    description: 'Credentia posts official score reports directly in your CNA365 portal. The report details PASS/FAIL status for both written and skills components.',
    actionRequired: 'Log into CNA365 to view your official score report. If one component was missed, you only retest that specific component within your 2-year window.',
    actionLinkText: 'Check Credentia Score Reports',
    actionUrl: 'https://kb-sc.credentia.com/en/article/exam-results',
    officialSource: {
      title: 'Credentia SC — Exam Results',
      url: 'https://kb-sc.credentia.com/en/article/exam-results',
      lastVerified: 'October 4, 2026'
    },
    whyThisMatters: 'Testing results are official once reflected in CNA365. Both components must reflect PASS to trigger automatic state registry submission.',
    checklistItems: [
      'Checked CNA365 notification email',
      'Downloaded and saved PDF score report for employment records',
      'Confirmed both Written and Skills reflect "PASS"',
      'Verified home address in CNA365 for registry correspondence'
    ]
  },
  {
    id: 'registry',
    order: 8,
    title: 'South Carolina Nurse Aide Registry',
    subtitle: 'Official listing by SCDHHS in ~10 business days',
    description: 'Credentia automatically submits your passing scores to the South Carolina Department of Health and Human Services. You are officially certified!',
    actionRequired: 'Verify your name and active CNA registry number on the South Carolina Nurse Aide Registry online search portal.',
    actionLinkText: 'Search SC Nurse Aide Registry',
    actionUrl: 'https://credentia.com/test-takers/sc/',
    officialSource: {
      title: 'Credentia SC — Registry Placement & Renewal',
      url: 'https://kb-sc.credentia.com/en/article/exam-results',
      lastVerified: 'October 4, 2026'
    },
    whyThisMatters: 'South Carolina employers (hospitals, long-term care, home health) legally verify your registry listing before scheduling you for patient care.',
    checklistItems: [
      'Waited ~10 business days following exam pass date',
      'Looked up name on SC DHHS Nurse Aide Registry portal',
      'Recorded official SC Nurse Aide Registry Certificate Number',
      'Noted 24-month renewal requirement: 8 consecutive hours paid CNA work'
    ]
  }
];
