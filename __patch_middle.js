// ═══════════════════════════════════════════════════════════
// CHAPTER 1 — DYNAMIC EMAIL SIMULATION SYSTEM
// Complete flow: EMPTY INBOX → NOTIFICATION (1) → FIRST PHISHING EMAIL →
// INVESTIGATION → FLAG MODE → FEEDBACK → NEW EMAILS → MIXED LEGITIMATE/PHISHING →
// TECHNICAL SOLUTIONS EMAIL → FINAL SCENARIO → KNOWLEDGE CHECK → COMPLETE
// ═══════════════════════════════════════════════════════════

// Master email pool for Chapter 1 dynamic simulation (9 emails, injected in waves)
const EMAILS = [
  // === EMAIL 1: First phishing (loads when player opens Zmail) ===
  {
    id: 1,
    sender: { name: 'Business Support', address: 'support@business-secure-alert.com' },
    subject: 'URGENT: Your Account Requires Immediate Verification',
    time: '8:14 AM',
    preview: 'We have detected suspicious activity on your account. Immediate action is required within 30 minutes...',
    phishing: true,
    evidence: ['fake_sender', 'false_urgency', 'suspicious_link'],
    body: [
      { type: 'p', text: 'Dear Account Holder,' },
      { type: 'p', text: 'We have detected suspicious activity on your account. As a precautionary measure, your access has been temporarily restricted pending verification.' },
      {
        type: 'p-flag',
        flagId: 'urgency',
        flagType: 'false_urgency',
        text: 'WARNING: Your account will be permanently suspended within 30 minutes if you do not verify your identity immediately.',
        label: 'FALSE URGENCY'
      },
      { type: 'p', text: 'To restore your account access and avoid permanent suspension, you must verify your identity using the secure link below.' },
      {
        type: 'link',
        flagId: 'link1',
        flagType: 'suspicious_link',
        text: 'Verify My Account Now',
        destination: 'https://business-account-verify.net/login',
        label: 'SUSPICIOUS LINK'
      },
      { type: 'p', text: 'Do not share this link with anyone. It is tied exclusively to your account.' },
      { type: 'p', text: 'Regards,\nBusiness Support Team\nSecurity Division' }
    ],
    capybaraAnalysis: {
      fake_sender: {
        correct: 'Good catch. The domain <code>business-secure-alert.com</code> is not the company\'s official domain. Attackers register convincing-sounding domains to impersonate organizations. Always verify the exact domain.',
        missed: 'The sender address <code>support@business-secure-alert.com</code> uses a fake domain. The real organization would send from its verified official domain, not <code>business-secure-alert.com</code>.'
      },
      false_urgency: {
        correct: 'Correct. A 30-minute suspension deadline is a manufactured pressure tactic designed to prevent critical thinking. Real organizations never use 30-minute ultimatums in security emails.',
        missed: 'The 30-minute deadline and "permanent suspension" threat are social engineering pressure. Real security alerts give reasonable timeframes and don\'t use extreme time pressure.'
      },
      suspicious_link: {
        correct: 'Correct. The verification link leads to <code>business-account-verify.net</code> — an unrelated fake domain not owned by the real organization. Attackers buy convincing domains to harvest credentials.',
        missed: 'The "Verify My Account Now" button leads to <code>https://business-account-verify.net/login</code> — not the company\'s actual domain. Always verify the destination URL before clicking.'
      }
    }
  },

  // === EMAIL 2: Legitimate HR email (Wave 2, after email 1 reported) ===
  {
    id: 2,
    sender: { name: 'HR Department', address: 'hr@business.com' },
    subject: 'Updated Employee Benefits Information',
    time: '9:02 AM',
    preview: 'Please review the updated employee benefits package for the upcoming quarter...',
    phishing: false,
    evidence: [],
    body: [
      { type: 'p', text: 'Dear Team Member,' },
      { type: 'p', text: 'We are pleased to share the updated employee benefits package for the upcoming quarter. Please take a moment to review the changes.' },
      { type: 'p', text: 'Key updates include:\n\u2022 Enhanced health coverage options\n\u2022 Updated dental and vision plans\n\u2022 Expanded wellness program benefits\n\u2022 New remote work allowance policy' },
      { type: 'p', text: 'Full details are available through the company\'s internal HR portal using your standard work credentials. No password reset or account verification is required.' },
      { type: 'p', text: 'If you have questions, please contact HR directly at hr@business.com or visit us in Room 204.' },
      { type: 'p', text: 'Best regards,\nHR Department\nBusiness Inc.' }
    ],
    capybaraAnalysis: {}
  },

  // === EMAIL 3: Phishing — Microsoft sign-in (Wave 2) ===
  {
    id: 3,
    sender: { name: 'Microsoft Security', address: 'security-alert@m1crosoft-support.com' },
    subject: 'Unusual Sign-In Detected on Your Account',
    time: '9:28 AM',
    preview: 'We detected a sign-in attempt from an unrecognized device. Your account may be at risk...',
    phishing: true,
    evidence: ['fake_sender', 'false_urgency', 'suspicious_link'],
    body: [
      { type: 'p', text: 'Dear Microsoft Account User,' },
      { type: 'p', text: 'We detected a sign-in attempt to your Microsoft account from an unrecognized device located in an unusual geographic location.' },
      {
        type: 'p-flag',
        flagId: 'urgency',
        flagType: 'false_urgency',
        text: 'IMMEDIATE ACTION REQUIRED: Your account will be locked in 60 minutes unless you verify this activity and confirm your identity.',
        label: 'FALSE URGENCY'
      },
      { type: 'p', text: 'If this was not you, please secure your account immediately by reviewing the activity and changing your password.' },
      {
        type: 'link',
        flagId: 'link1',
        flagType: 'suspicious_link',
        text: 'Review Account Activity',
        destination: 'https://m1crosoft-account-verify.com/signin',
        label: 'SUSPICIOUS LINK'
      },
      { type: 'p', text: 'Regards,\nMicrosoft Account Security Team' }
    ],
    capybaraAnalysis: {
      fake_sender: {
        correct: 'Correct. The domain <code>m1crosoft-support.com</code> uses the digit "1" instead of the letter "i" in "Microsoft" — a typosquat domain. Real Microsoft emails come from <code>@microsoft.com</code>.',
        missed: 'The sender domain <code>m1crosoft-support.com</code> substitutes the digit "1" for the letter "i" — a typosquat attack. Microsoft\'s verified domain is <code>microsoft.com</code>.'
      },
      false_urgency: {
        correct: 'Correct. A "60-minute account lockout" is manufactured urgency. Real Microsoft security alerts let you review activity at your own pace and don\'t impose hour-long ultimatums.',
        missed: 'The 60-minute countdown before account lockout is social engineering pressure. Real security notifications don\'t force immediate action under artificial time limits.'
      },
      suspicious_link: {
        correct: 'Correct. The link goes to <code>m1crosoft-account-verify.com</code> — a fake domain mimicking Microsoft. Real Microsoft account management uses <code>account.microsoft.com</code>.',
        missed: 'The "Review Account Activity" button leads to <code>https://m1crosoft-account-verify.com/signin</code> — not Microsoft\'s real domain. Real Microsoft links always use <code>microsoft.com</code>.'
      }
    }
  },

  // === EMAIL 4: Legitimate IT Maintenance (Wave 2) ===
  {
    id: 4,
    sender: { name: 'IT Support', address: 'it-support@business.com' },
    subject: 'Scheduled Network Maintenance \u2014 This Saturday',
    time: '10:15 AM',
    preview: 'The IT team will conduct scheduled network maintenance this Saturday from 10 PM to 2 AM...',
    phishing: false,
    evidence: [],
    body: [
      { type: 'p', text: 'Dear All Staff,' },
      { type: 'p', text: 'The IT Support team will be conducting scheduled network infrastructure maintenance this Saturday, from 10:00 PM to 2:00 AM.' },
      { type: 'p', text: 'Services temporarily unavailable during this window:\n\u2022 VPN access\n\u2022 Internal file server\n\u2022 Company intranet portal\n\u2022 Email (intermittent)' },
      { type: 'p', text: 'No action is required from you. Your files and credentials remain secure. You do NOT need to update your password or re-authenticate after maintenance.' },
      { type: 'p', text: 'For urgent matters during the maintenance window, contact the on-call IT team at: it-oncall@business.com or call IT helpdesk at ext. 4400.' },
      { type: 'p', text: 'We apologize for any inconvenience.\n\nIT Support Team\nBusiness Inc.' }
    ],
    capybaraAnalysis: {}
  },

  // === EMAIL 5: Technical Solutions legitimate (Wave 3) ===
  {
    id: 5,
    sender: { name: 'Technical Solutions Team', address: 'technical.solutions@business.com' },
    subject: 'System Maintenance and Technical Update',
    time: '11:00 AM',
    preview: 'Monthly system maintenance has been completed. Please review the update summary for your department...',
    phishing: false,
    evidence: [],
    body: [
      { type: 'p', text: 'Dear Department Staff,' },
      { type: 'p', text: 'This is a routine notification from the Technical Solutions Team confirming that the monthly system maintenance cycle has been completed successfully.' },
      { type: 'p', text: 'Updates completed this cycle:\n\u2022 Security patch KB-2024-09 applied to all workstations\n\u2022 Database backup verified and stored to secure off-site location\n\u2022 Network monitoring tools upgraded to version 4.2\n\u2022 Legacy software compatibility testing completed' },
      { type: 'p', text: 'No action is required from your end. All systems are operating normally. Your credentials, passwords, and access privileges are unchanged.' },
      { type: 'p', text: 'If you notice any technical issues after this update, please submit a support ticket at the IT help portal or email technical.solutions@business.com.' },
      { type: 'p', text: 'Thank you for your cooperation.\n\nTechnical Solutions Team\nBusiness Inc. IT Division' }
    ],
    capybaraAnalysis: {}
  },

  // === EMAIL 6: Final Scenario \u2014 Legitimate payroll (Wave 4) ===
  {
    id: 6,
    sender: { name: 'Payroll Department', address: 'payroll@business.com' },
    subject: 'September Payroll Processing Confirmation',
    time: '11:45 AM',
    preview: 'Your September payroll has been processed and will be deposited within 1-2 business days...',
    phishing: false,
    evidence: [],
    body: [
      { type: 'p', text: 'Dear Team Member,' },
      { type: 'p', text: 'This is to confirm that September payroll has been successfully processed. Your salary will be deposited to your registered bank account within 1\u20132 business days.' },
      { type: 'p', text: 'Payroll details can be reviewed via the company HR portal using your standard employee credentials. No additional verification is required.' },
      { type: 'p', text: 'If you have payroll questions, please contact the Payroll Department at payroll@business.com or visit HR between 9 AM and 5 PM on working days.' },
      { type: 'p', text: 'Regards,\nPayroll Department\nBusiness Inc.' }
    ],
    capybaraAnalysis: {}
  },

  // === EMAIL 7: Final Scenario \u2014 Obvious phishing (Wave 4) ===
  {
    id: 7,
    sender: { name: 'BANK SECURITY', address: 'urgent-alert@bankng-secure-verify.xyz' },
    subject: '\u26a0\ufe0f FINAL WARNING: Account Suspended \u2014 Act NOW!',
    time: '12:10 PM',
    preview: 'Your bank account has been suspended. You have 15 minutes to verify or lose all access permanently...',
    phishing: true,
    evidence: ['fake_sender', 'false_urgency', 'suspicious_link'],
    body: [
      { type: 'p', text: 'ATTENTION ACCOUNT HOLDER,' },
      { type: 'p', text: '\u26a0\ufe0f Your bank account has been SUSPENDED due to multiple failed verification attempts. To restore access, you must confirm your identity IMMEDIATELY.' },
      {
        type: 'p-flag',
        flagId: 'urgency',
        flagType: 'false_urgency',
        text: '\ud83d\udd34 FINAL WARNING: You have 15 MINUTES to verify your account or you will permanently lose access to all your funds.',
        label: 'FALSE URGENCY'
      },
      { type: 'p', text: 'Click below NOW to restore your account before it is permanently closed and your balance is frozen.' },
      {
        type: 'link',
        flagId: 'link1',
        flagType: 'suspicious_link',
        text: 'RESTORE MY ACCOUNT IMMEDIATELY',
        destination: 'https://bankng-secure-verify.xyz/restore',
        label: 'SUSPICIOUS LINK'
      },
      { type: 'p', text: 'DO NOT IGNORE THIS MESSAGE.\nBank Security Division' }
    ],
    capybaraAnalysis: {
      fake_sender: {
        correct: 'Correct. The domain <code>bankng-secure-verify.xyz</code> misspells "banking" and uses a <code>.xyz</code> TLD. Real banks never use <code>.xyz</code> domains for official communications.',
        missed: 'The sender <code>urgent-alert@bankng-secure-verify.xyz</code> is clearly fake. "bankng" misspells "banking" and <code>.xyz</code> is not used by real financial institutions.'
      },
      false_urgency: {
        correct: 'Correct. "FINAL WARNING" in all-caps with a 15-minute countdown is extreme psychological pressure. No real bank sends 15-minute ultimatums or threatens to permanently freeze funds via email.',
        missed: 'The "15 MINUTES" countdown and "FINAL WARNING" all-caps language are extreme social engineering pressure tactics. Real banks never impose 15-minute deadlines via email.'
      },
      suspicious_link: {
        correct: 'Correct. The link leads to <code>bankng-secure-verify.xyz/restore</code> — the same misspelled fake domain as the sender. Attacker domains always match between sender and link.',
        missed: 'The "RESTORE MY ACCOUNT" button leads to <code>bankng-secure-verify.xyz</code> — a fake domain that matches the misspelled sender domain. Always verify where links go.'
      }
    }
  },

  // === EMAIL 8: Final Scenario \u2014 Sophisticated phishing (Wave 4) ===
  {
    id: 8,
    sender: { name: 'IT Security Operations', address: 'security-ops@business-it-support.com' },
    subject: 'Action Required: Security Policy Compliance Update',
    time: '12:35 PM',
    preview: 'All employees are required to complete mandatory security compliance verification before Friday...',
    phishing: true,
    evidence: ['fake_sender', 'false_urgency', 'suspicious_link'],
    body: [
      { type: 'p', text: 'Dear Employee,' },
      { type: 'p', text: 'As part of our annual cybersecurity compliance review, all employees are required to verify their account credentials through our updated secure portal.' },
      { type: 'p', text: 'This is a mandatory requirement under our updated IT Security Policy (ISP-2024-07). Non-compliance may result in temporary account restrictions.' },
      {
        type: 'p-flag',
        flagId: 'urgency',
        flagType: 'false_urgency',
        text: 'IMPORTANT: This compliance verification must be completed by this Friday, 5:00 PM. Accounts not verified by this deadline will be suspended pending manual review.',
        label: 'FALSE URGENCY'
      },
      { type: 'p', text: 'Please use the secure compliance portal link below to complete your verification. The process takes approximately 3 minutes.' },
      {
        type: 'link',
        flagId: 'link1',
        flagType: 'suspicious_link',
        text: 'Complete Security Compliance Verification',
        destination: 'https://business-it-support.com/compliance-portal',
        label: 'SUSPICIOUS LINK'
      },
      { type: 'p', text: 'Thank you for helping us maintain a secure workplace.\n\nIT Security Operations\nCompliance & Risk Management' }
    ],
    capybaraAnalysis: {
      fake_sender: {
        correct: 'Correct. The sender uses <code>business-it-support.com</code> — not the company\'s real domain <code>business.com</code>. Sophisticated phishers register plausible domains to impersonate internal IT departments.',
        missed: 'The sender is <code>security-ops@business-it-support.com</code>. This looks official, but the domain is <code>business-it-support.com</code> — not the real company domain <code>business.com</code>.'
      },
      false_urgency: {
        correct: 'Correct. A Friday deadline with suspension threats is a softer form of urgency — credible-sounding but still manufactured pressure. Real compliance notices go through multiple official channels with advance notice.',
        missed: 'The "Friday 5 PM deadline with suspension" creates time pressure. Sophisticated phishing uses realistic-sounding deadlines. Real compliance requirements are announced through multiple official channels.'
      },
      suspicious_link: {
        correct: 'Correct. The link goes to <code>business-it-support.com/compliance-portal</code> — the same fake domain as the sender, not the real company domain <code>business.com</code>.',
        missed: 'The link leads to <code>business-it-support.com/compliance-portal</code> — not <code>business.com</code>. The sender and link share the same fake domain, confirming this is a coordinated phishing attempt.'
      }
    }
  },

  // === EMAIL 9: Final Scenario \u2014 Legitimate IT ticket (Wave 4) ===
  {
    id: 9,
    sender: { name: 'IT Help Desk', address: 'helpdesk@business.com' },
    subject: 'Your IT Support Ticket #4821 Has Been Resolved',
    time: '1:05 PM',
    preview: 'Your recent support ticket regarding email configuration has been resolved...',
    phishing: false,
    evidence: [],
    body: [
      { type: 'p', text: 'Dear Employee,' },
      { type: 'p', text: 'This is an automated notification from the IT Help Desk system. Your support ticket #4821 (Email Configuration Issue) has been resolved.' },
      { type: 'p', text: 'Resolution summary:\n\u2022 Mailbox synchronization settings have been corrected\n\u2022 Junk mail filters updated\n\u2022 Email signature template restored to default' },
      { type: 'p', text: 'If you continue to experience issues, please reply to this email or submit a new ticket via the company intranet. No credentials were modified during this process.' },
      { type: 'p', text: 'Thank you,\nIT Help Desk\nBusiness Inc. \u2014 Ticket System' }
    ],
    capybaraAnalysis: {}
  }
];

// ═══════════════════════════════════════════════════════════
// CHAPTER 1 — DYNAMIC INBOX STATE
// The inbox starts EMPTY. Emails are injected in waves
// based on player progress through the simulation stages.
// ═══════════════════════════════════════════════════════════

// ch1InboxEmails: the LIVE inbox — populated dynamically
let ch1InboxEmails         = [];    // subset of EMAILS currently visible in inbox
let ch1PendingNotification = false; // true = badge shows (1) but first email not yet injected
let ch1Stage               = 0;     // 0=start, 1=first loaded, 2=wave2, 3=tech, 4=final
let ch1MistakeCount        = 0;     // adaptive mentor mistake tracking

// Wave definitions — EMAILS ids injected at each stage
const CH1_WAVE_DEFS = {
  1: [1],        // Stage 1: First phishing email (on gmail open)
  2: [2, 3, 4],  // Stage 2: After email 1 reported — HR legit + Microsoft phish + IT maint legit
  3: [5],        // Stage 3: Technical Solutions email
  4: [6, 7, 8, 9] // Stage 4: Final scenario — payroll + obvious phish + sophisticated phish + IT ticket
};

function ch1GetEmailDef(id) {
  return EMAILS.find(e => e.id === id) || null;
}

function ch1InjectWave(waveNum) {
  const ids = CH1_WAVE_DEFS[waveNum] || [];
  const toAdd = ids.filter(id => !ch1InboxEmails.some(e => e.id === id));
  if (toAdd.length === 0) return;
  toAdd.forEach((id, idx) => {
    setTimeout(() => {
      const def = ch1GetEmailDef(id);
      if (def) {
        ch1InboxEmails.push(def);
        renderEmailList();
        updateFolderCounts();
      }
    }, idx * 350);
  });
  setTimeout(() => {
    showToast('\ud83d\udce7 New emails arrived in your inbox.', 'success');
    if (typeof AudioManager !== 'undefined') AudioManager.playNotification();
  }, 250);
}

// Perfect-run score computed over all 9 EMAILS
const MAX_SCORE = EMAILS.reduce((sum, e) => sum + (e.phishing ? 100 + e.evidence.length * 25 : 50), 0);

// Emails already sent by the player — viewable in the Sent folder
const SENT_EMAILS = [
  {
    id: 101,
    to: 'hr@business.com',
    subject: 'Re: Updated Employee Benefits Information',
    time: '9:12 AM',
    preview: 'Thanks for the update — reviewed and confirmed on my end...',
    body: [
      { type: 'p', text: 'Hi HR Department,' },
      { type: 'p', text: 'Thanks for the update — I reviewed the September benefits information through the normal internal resources. No issues on my end.' },
      { type: 'p', text: 'Regards,\nStudent' }
    ]
  },
  {
    id: 102,
    to: 'it-security@business.com',
    subject: 'Suspicious emails flagged this week',
    time: '10:47 AM',
    preview: 'Sharing a couple of phishing samples I caught for awareness...',
    body: [
      { type: 'p', text: 'Hi IT Security Team,' },
      { type: 'p', text: 'Sharing a couple of phishing samples I caught this week — fake sender domains, urgency pressure tactics, and mismatched links. Recommend circulating these for staff awareness training.' },
      { type: 'p', text: 'Regards,\nStudent' }
    ]
  }
];

