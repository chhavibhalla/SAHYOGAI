import {
  GraduationCap, Wallet, TrendingUp, Award, CreditCard, PiggyBank, LineChart, Lightbulb,
  HeartPulse, FileCheck, Landmark, ShieldCheck, Users, Type, Headphones,
  Banknote, Receipt, Briefcase, BarChart3, Building2, IndianRupee, Truck, Waves,
  ArrowUpRight, ArrowDownLeft, ShoppingBag, Coffee, Smartphone, Zap, Bell, Sparkles,
  BadgeIndianRupee, FileText,
} from 'lucide-react'
import type {
  Persona, PersonaId, WidgetItem, Transaction, TelemetryEvent, AIInsight, ProactiveAlert, AnalyticsMetric,
} from '../types'

export const PERSONAS: Persona[] = [
  { id: 'student', label: 'Student', emoji: '🎓', tagline: 'Banking that grows with your ambitions', accent: 'from-sbi-500 to-accent-violet' },
  { id: 'senior', label: 'Senior Citizen', emoji: '🌿', tagline: 'Calm, clear, and caring banking', accent: 'from-accent-teal to-sbi-500' },
  { id: 'professional', label: 'Professional', emoji: '💼', tagline: 'Wealth on autopilot', accent: 'from-sbi-600 to-sbi-400' },
  { id: 'business', label: 'Business Owner', emoji: '🏢', tagline: 'Your cash flow, always in control', accent: 'from-accent-orange to-sbi-500' },
]

export const PERSONA_WIDGETS: Record<PersonaId, WidgetItem[]> = {
  student: [
    { id: 's1', title: 'Education Loan', subtitle: 'Sanctioned · ₹8.5L', value: '6.5% p.a.', icon: GraduationCap, tone: 'blue', badge: 'Active' },
    { id: 's2', title: 'Budget Tracker', subtitle: '₹4,200 left this month', icon: PiggyBank, tone: 'teal', progress: 62 },
    { id: 's3', title: 'UPI Insights', subtitle: '38 payments · ₹12,400', icon: LineChart, tone: 'violet' },
    { id: 's4', title: 'Scholarship Status', subtitle: 'Disbursal in 4 days', icon: Award, tone: 'orange', badge: 'On track' },
    { id: 's5', title: 'Debit Card Controls', subtitle: 'Online & tap enabled', icon: CreditCard, tone: 'blue' },
    { id: 's6', title: 'Monthly Spending', subtitle: 'Food · Travel · Books', value: '₹8,200', icon: Wallet, tone: 'slate' },
    { id: 's7', title: 'Internship Banking', subtitle: 'Zero-balance stipend a/c', icon: Briefcase, tone: 'teal' },
    { id: 's8', title: 'Career Banking Tips', subtitle: 'Build credit early', icon: Lightbulb, tone: 'orange' },
  ],
  senior: [
    { id: 'sr1', title: 'Pension Status', subtitle: 'July credited · ₹42,500', icon: Landmark, tone: 'blue', badge: 'Paid' },
    { id: 'sr2', title: 'Life Certificate', subtitle: 'Due 30 Nov · file digitally', icon: FileCheck, tone: 'orange', badge: 'Reminder' },
    { id: 'sr3', title: 'Fixed Deposits', subtitle: '₹6.2L · matures 12 Aug', value: '7.25%', icon: PiggyBank, tone: 'teal' },
    { id: 'sr4', title: 'Medical Insurance', subtitle: 'Active · ₹5L cover', icon: HeartPulse, tone: 'violet' },
    { id: 'sr5', title: 'Nominee Details', subtitle: 'Verified & up to date', icon: ShieldCheck, tone: 'blue' },
    { id: 'sr6', title: 'Large Text Mode', subtitle: 'Tap to make everything bigger', icon: Type, tone: 'slate' },
    { id: 'sr7', title: 'One-Tap Support', subtitle: 'Talk to a banker now', icon: Headphones, tone: 'orange', badge: '24×7' },
  ],
  professional: [
    { id: 'p1', title: 'Salary Account', subtitle: 'Credited · ₹1,45,000', icon: Banknote, tone: 'blue', badge: 'Premium' },
    { id: 'p2', title: 'Credit Card Bills', subtitle: 'Due in 6 days · ₹38,900', icon: CreditCard, tone: 'orange' },
    { id: 'p3', title: 'Investments', subtitle: 'Portfolio ₹12.4L', value: '+14.2%', icon: TrendingUp, tone: 'teal' },
    { id: 'p4', title: 'Mutual Funds', subtitle: '5 SIPs active', value: '₹25k/mo', icon: LineChart, tone: 'violet' },
    { id: 'p5', title: 'EMI', subtitle: 'Home loan · ₹34,200', icon: Building2, tone: 'blue' },
    { id: 'p6', title: 'Tax Documents', subtitle: 'Form 16 & 26AS ready', icon: FileText, tone: 'slate' },
    { id: 'p7', title: 'Expense Analytics', subtitle: 'Spends down 8% MoM', icon: BarChart3, tone: 'teal' },
  ],
  business: [
    { id: 'b1', title: 'Current Account', subtitle: 'Balance ₹18.6L', icon: Building2, tone: 'blue', badge: 'Business' },
    { id: 'b2', title: 'GST Payments', subtitle: 'GSTR-3B due 20 Jul', icon: Receipt, tone: 'orange', badge: 'Due soon' },
    { id: 'b3', title: 'Payroll', subtitle: '24 employees · ₹9.8L', icon: Users, tone: 'violet' },
    { id: 'b4', title: 'Business Loans', subtitle: 'Pre-approved ₹25L', icon: BadgeIndianRupee, tone: 'teal', badge: 'Offer' },
    { id: 'b5', title: 'Vendor Payments', subtitle: '7 scheduled today', icon: Truck, tone: 'blue' },
    { id: 'b6', title: 'Cash Flow Insights', subtitle: 'Healthy · 42-day runway', icon: Waves, tone: 'teal' },
    { id: 'b7', title: 'Tax & Compliance', subtitle: 'All filings on track', icon: IndianRupee, tone: 'slate' },
  ],
}

export const TRANSACTIONS: Transaction[] = [
  { id: 't1', name: 'Swiggy', category: 'Food & Dining', amount: 428, direction: 'out', icon: Coffee, time: '2:14 PM' },
  { id: 't2', name: 'Salary · Infosys', category: 'Income', amount: 145000, direction: 'in', icon: ArrowDownLeft, time: '9:02 AM' },
  { id: 't3', name: 'Amazon', category: 'Shopping', amount: 2199, direction: 'out', icon: ShoppingBag, time: 'Yesterday' },
  { id: 't4', name: 'Airtel Recharge', category: 'Utilities', amount: 299, direction: 'out', icon: Smartphone, time: 'Yesterday' },
  { id: 't5', name: 'UPI · Rohan', category: 'Transfer', amount: 1500, direction: 'in', icon: ArrowUpRight, time: 'Mon' },
  { id: 't6', name: 'Electricity Bill', category: 'Utilities', amount: 1840, direction: 'out', icon: Zap, time: 'Mon' },
]

export const TELEMETRY_EVENTS: TelemetryEvent[] = [
  { id: 'e1', label: 'Opened Cards', detail: 'Navigated from Home', status: 'ok', timeOffset: '0s' },
  { id: 'e2', label: 'Tapped “Apply Debit Card”', detail: 'Form started', status: 'ok', timeOffset: '+12s' },
  { id: 'e3', label: 'OTP requested', detail: 'Sent to •••• 8821', status: 'ok', timeOffset: '+38s' },
  { id: 'e4', label: 'OTP Failed', detail: 'Not received', status: 'error', timeOffset: '+70s' },
  { id: 'e5', label: 'Tapped “Resend OTP”', detail: '2nd attempt', status: 'warn', timeOffset: '+95s' },
  { id: 'e6', label: 'Waited 30 seconds', detail: 'No input · hesitation', status: 'warn', timeOffset: '+125s' },
  { id: 'e7', label: 'Retry Failed', detail: 'OTP still pending', status: 'error', timeOffset: '+150s' },
  { id: 'e8', label: 'AI detected user needs assistance', detail: 'Proactive intervention triggered', status: 'ai', timeOffset: '+152s' },
]

export const AI_INSIGHT: AIInsight = {
  intent: 'Applying for Debit Card',
  confidence: 96,
  problem: 'OTP Delivery Failure',
  resolution: 'Alternative Authentication (Face ID)',
  persona: 'student',
}

export const PROACTIVE_ALERTS: ProactiveAlert[] = [
  { id: 'a1', title: 'KYC expires in 20 days', body: 'Re-verify in under 2 minutes to keep full access.', icon: ShieldCheck, tone: 'orange', cta: 'Update KYC' },
  { id: 'a2', title: 'You recently graduated 🎓', body: 'Update your occupation to unlock a salary account & better limits.', icon: GraduationCap, tone: 'blue', cta: 'Update details' },
  { id: 'a3', title: 'Student Credit Card offer', body: 'Based on your spending, you could benefit from a no-fee student card.', icon: CreditCard, tone: 'violet', cta: 'See offer' },
  { id: 'a4', title: 'Your FD matures next week', body: '₹6.2L matures on 12 Aug. Auto-renew at 7.25% or withdraw.', icon: PiggyBank, tone: 'teal', cta: 'Choose option' },
  { id: 'a5', title: 'Pension verification due', body: 'File your Life Certificate digitally before 30 Nov.', icon: FileCheck, tone: 'orange', cta: 'File now' },
]

export const ANALYTICS_METRICS: AnalyticsMetric[] = [
  { label: 'Journey Completion', value: 92, suffix: '%', trend: 6, tone: 'blue' },
  { label: 'AI Success Rate', value: 88, suffix: '%', trend: 4, tone: 'teal' },
  { label: 'Issues Resolved', value: 1284, trend: 18, tone: 'violet' },
  { label: 'Human Escalations', value: 6, suffix: '%', trend: -3, tone: 'orange' },
]

// Journey funnel for the analytics section
export const JOURNEY_FUNNEL = [
  { stage: 'Login', value: 100 },
  { stage: 'Explore', value: 86 },
  { stage: 'Apply', value: 71 },
  { stage: 'Verify (OTP)', value: 54 },
  { stage: 'Complete', value: 92 },
]

export const FEATURE_USAGE = [
  { name: 'UPI', value: 88, icon: Smartphone },
  { name: 'Transfers', value: 72, icon: ArrowUpRight },
  { name: 'Cards', value: 64, icon: CreditCard },
  { name: 'Deposits', value: 51, icon: PiggyBank },
  { name: 'Loans', value: 39, icon: Landmark },
]

export const DROPOFF_POINTS = [
  { stage: 'OTP screen', value: 46 },
  { stage: 'KYC upload', value: 28 },
  { stage: 'Form fill', value: 17 },
  { stage: 'Payment', value: 9 },
]

// AI success over the week (sparkline / area)
export const AI_WEEKLY = [64, 70, 68, 78, 82, 85, 88]

export const QUICK_ACTIONS = [
  { id: 'send', label: 'Send', icon: ArrowUpRight, tone: 'blue' as const },
  { id: 'request', label: 'Request', icon: ArrowDownLeft, tone: 'teal' as const },
  { id: 'scan', label: 'Scan & Pay', icon: Smartphone, tone: 'violet' as const },
  { id: 'bills', label: 'Bills', icon: Receipt, tone: 'orange' as const },
]

export const HERO_SHORTCUTS = [
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'cards', label: 'Cards', icon: CreditCard },
  { id: 'loans', label: 'Loans', icon: Landmark },
  { id: 'invest', label: 'Invest', icon: TrendingUp },
  { id: 'bills', label: 'Bills', icon: Receipt },
  { id: 'more', label: 'More', icon: Sparkles },
]

export const NOTIFICATIONS = [
  { id: 'n1', title: 'OTP delivery delayed', body: 'AI switched you to Face ID.', icon: Bell, time: 'now' },
  { id: 'n2', title: 'FD maturing soon', body: '₹6.2L on 12 Aug.', icon: PiggyBank, time: '2h' },
  { id: 'n3', title: 'Salary credited', body: '₹1,45,000 from Infosys.', icon: Banknote, time: '5h' },
]

export const SUGGESTED_PROMPTS = [
  'I need help',
  "My OTP isn't coming",
  'Where is my pension?',
  'Transfer money',
  'Block my card',
]
