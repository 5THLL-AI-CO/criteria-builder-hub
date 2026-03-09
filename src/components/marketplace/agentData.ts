export interface Agent {
  id: number;
  category: string;
  agentName: string;
  initials: string;
  professional: string;
  description: string;
  calibration: string;
  status: string;
  isComingSoon: boolean;
}

export interface AgentDetailData {
  initials: string;
  name: string;
  credential: string;
  location: string;
  agentName: string;
  description: string;
  steps: string[];
  metrics: { value: string; label: string }[];
  formHeader: string;
  formFields: { name: string; label: string; type: "text" | "textarea"; placeholder: string; required?: boolean }[];
  pricing: { label: string; price: string }[];
  ctaText: string;
}

export const agents: Agent[] = [
  {
    id: 1,
    category: "LEGAL",
    agentName: "T&C Legal Risk Review",
    initials: "JM",
    professional: "John Morales R. · Commercial Lawyer, 13 yrs",
    description: "Terms and conditions analysis for commercial websites. Detects regulatory exposure from website language.",
    calibration: "50h+",
    status: "In calibration",
    isComingSoon: false,
  },
  {
    id: 2,
    category: "PSYCHOLOGY",
    agentName: "Family Dynamics Assessment",
    initials: "PT",
    professional: "Pilot Professional · Child Psychologist, 15 yrs",
    description: "Evaluates childhood behavioral issues through the lens of family dynamics and adult environment.",
    calibration: "50h+",
    status: "In calibration",
    isComingSoon: false,
  },
  {
    id: 3,
    category: "COACHING",
    agentName: "Career Transition Strategy",
    initials: "CE",
    professional: "Pilot Professional · Employability Coach",
    description: "Personalized career transition plans based on market positioning and professional profile analysis.",
    calibration: "50h+",
    status: "In calibration",
    isComingSoon: false,
  },
  {
    id: 4,
    category: "FINANCE",
    agentName: "Startup Valuation Model",
    initials: "AR",
    professional: "Coming Soon · Investment Banking",
    description: "Company valuation for early-stage startups using comparable transactions and DCF analysis.",
    calibration: "Pending",
    status: "--",
    isComingSoon: true,
  },
  {
    id: 5,
    category: "ACCOUNTING",
    agentName: "Tax Optimization Review",
    initials: "ML",
    professional: "Coming Soon · Tax Accountant",
    description: "Identifies tax optimization opportunities for small businesses based on current regulations.",
    calibration: "Pending",
    status: "--",
    isComingSoon: true,
  },
  {
    id: 6,
    category: "CONSULTING",
    agentName: "Management Consulting Brief",
    initials: "DS",
    professional: "Coming Soon · Strategy Consultant",
    description: "Structured analysis of business problems using frameworks calibrated from 20 years of consulting.",
    calibration: "Pending",
    status: "--",
    isComingSoon: true,
  },
];

export const agentDetails: Record<number, AgentDetailData> = {
  1: {
    initials: "JM",
    name: "John Morales R.",
    credential: "Commercial Lawyer · 13 years of practice",
    location: "Bogotá, Colombia",
    agentName: "T&C Legal Risk Review",
    description: "This agent analyzes terms and conditions for commercial websites, detecting regulatory exposure from website language, jurisdictional risks, and compliance gaps that standard legal review would miss. Built from 13 years of commercial law practice.",
    steps: [
      "Collects business registration, website URL, current T&C, business description, and competitor references.",
      "Analyzes website language, maps competitor regulatory approaches, and cross-references everything against the T&C.",
      "Produces a risk assessment identifying regulatory exposure and delivers revised T&C with ongoing monitoring.",
    ],
    metrics: [
      { value: "50h+", label: "Calibration" },
      { value: "13", label: "Years Experience" },
      { value: "1hr", label: "Avg. Delivery" },
    ],
    formHeader: "Start a Consultation",
    formFields: [
      { name: "businessName", label: "Business name", type: "text", placeholder: "Your company name", required: true },
      { name: "websiteUrl", label: "Website URL", type: "text", placeholder: "https://yoursite.com", required: true },
      { name: "email", label: "Email", type: "text", placeholder: "you@company.com", required: true },
      { name: "businessDescription", label: "Describe your business", type: "textarea", placeholder: "Brief description of what you do" },
    ],
    pricing: [
      { label: "One-time review", price: "$200" },
      { label: "Monthly monitoring", price: "$20/mo" },
    ],
    ctaText: "Request Review",
  },
  2: {
    initials: "PT",
    name: "Pilot Professional",
    credential: "Child Psychologist · 15 years of practice",
    location: "To be announced",
    agentName: "Family Dynamics Assessment",
    description: "This agent evaluates childhood behavioral issues by analyzing the family environment, adult dynamics, and contextual factors that clinical experience has shown to be the real drivers of childhood behavior. Built from 15 years of practice and over 8,000 digitized evaluations.",
    steps: [
      "Collects information about the child's age, presenting behaviors, and family composition.",
      "Probes the adult environment: parental dynamics, conflict patterns, routines, and emotional responses to the child's behavior.",
      "Produces a preliminary assessment identifying likely environmental contributors and recommends next steps, including whether in-person evaluation is needed.",
    ],
    metrics: [
      { value: "50h+", label: "Calibration" },
      { value: "8,000", label: "Evaluations Base" },
      { value: "45min", label: "Avg. Delivery" },
    ],
    formHeader: "Request an Assessment",
    formFields: [
      { name: "childAge", label: "Child's age", type: "text", placeholder: "e.g. 4 years old", required: true },
      { name: "concern", label: "Brief description of concern", type: "textarea", placeholder: "Describe the behavioral issues or concerns", required: true },
      { name: "email", label: "Email", type: "text", placeholder: "you@email.com", required: true },
      { name: "language", label: "Preferred language", type: "text", placeholder: "English / Spanish" },
    ],
    pricing: [
      { label: "Initial assessment", price: "$150" },
      { label: "Follow-up session", price: "$75" },
    ],
    ctaText: "Request Assessment",
  },
  3: {
    initials: "CE",
    name: "Pilot Professional",
    credential: "Employability Coach · Former Head of Waze Latam",
    location: "To be announced",
    agentName: "Career Transition Strategy",
    description: "This agent designs personalized career transition strategies by analyzing professional profiles, market positioning, transferable skills, and industry demand. Built from years of executive coaching and talent placement at scale.",
    steps: [
      "Analyzes your current professional profile: experience, skills, achievements, and positioning gaps.",
      "Maps your profile against market demand, identifies high-value transition paths, and flags skills to develop.",
      "Delivers a transition strategy with specific actions, timeline, and positioning recommendations for your target roles or industries.",
    ],
    metrics: [
      { value: "50h+", label: "Calibration" },
      { value: "500+", label: "Profiles Analyzed" },
      { value: "1hr", label: "Avg. Delivery" },
    ],
    formHeader: "Start Your Strategy",
    formFields: [
      { name: "currentRole", label: "Current role and company", type: "text", placeholder: "e.g. Product Manager at Startup", required: true },
      { name: "targetRole", label: "Target role or industry", type: "text", placeholder: "e.g. VP Product at Series B+", required: true },
      { name: "email", label: "Email", type: "text", placeholder: "you@email.com", required: true },
      { name: "linkedIn", label: "LinkedIn URL", type: "text", placeholder: "https://linkedin.com/in/" },
    ],
    pricing: [
      { label: "Full strategy", price: "$180" },
      { label: "Strategy + 30-day follow-up", price: "$35/mo" },
    ],
    ctaText: "Request Strategy",
  },
};
