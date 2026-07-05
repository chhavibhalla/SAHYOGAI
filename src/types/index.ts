import type { LucideIcon } from 'lucide-react'

export type PersonaId = 'student' | 'senior' | 'professional' | 'business'

export type LanguageCode = 'en' | 'hi' | 'pa' | 'ta' | 'mr'

export interface Persona {
  id: PersonaId
  label: string
  emoji: string
  tagline: string
  accent: string // tailwind gradient classes
}

export interface WidgetItem {
  id: string
  title: string
  subtitle: string
  value?: string
  icon: LucideIcon
  tone: 'blue' | 'orange' | 'teal' | 'violet' | 'slate'
  progress?: number // 0-100 for progress widgets
  badge?: string
}

export interface Transaction {
  id: string
  name: string
  category: string
  amount: number
  direction: 'in' | 'out'
  icon: LucideIcon
  time: string
}

export interface TelemetryEvent {
  id: string
  label: string
  detail?: string
  status: 'ok' | 'warn' | 'error' | 'ai'
  timeOffset: string
}

export interface AIInsight {
  intent: string
  confidence: number
  problem: string
  resolution: string
  persona: PersonaId
}

export interface ProactiveAlert {
  id: string
  title: string
  body: string
  icon: LucideIcon
  tone: 'blue' | 'orange' | 'teal' | 'violet'
  cta: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'ai'
  text: string
}

export interface AnalyticsMetric {
  label: string
  value: number
  suffix?: string
  trend: number
  tone: 'blue' | 'orange' | 'teal' | 'violet'
}
