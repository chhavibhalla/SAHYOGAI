// Central mapping of "tone" tokens -> tailwind class bundles.
// Keeps colour usage consistent and premium across the app.

export type Tone = 'blue' | 'orange' | 'teal' | 'violet' | 'slate'

interface ToneStyle {
  icon: string // text + bg for icon chips
  text: string
  ring: string
  bar: string // solid fill for progress/bars
  soft: string // soft background
}

export const TONES: Record<Tone, ToneStyle> = {
  blue: {
    icon: 'text-sbi-600 bg-sbi-50 dark:bg-sbi-500/15 dark:text-sbi-300',
    text: 'text-sbi-600 dark:text-sbi-300',
    ring: 'ring-sbi-200 dark:ring-sbi-500/30',
    bar: 'bg-sbi-500',
    soft: 'bg-sbi-50 dark:bg-sbi-500/10',
  },
  orange: {
    icon: 'text-accent-orange bg-orange-50 dark:bg-orange-500/15 dark:text-orange-300',
    text: 'text-accent-orange dark:text-orange-300',
    ring: 'ring-orange-200 dark:ring-orange-500/30',
    bar: 'bg-accent-orange',
    soft: 'bg-orange-50 dark:bg-orange-500/10',
  },
  teal: {
    icon: 'text-accent-teal bg-teal-50 dark:bg-teal-500/15 dark:text-teal-300',
    text: 'text-accent-teal dark:text-teal-300',
    ring: 'ring-teal-200 dark:ring-teal-500/30',
    bar: 'bg-accent-teal',
    soft: 'bg-teal-50 dark:bg-teal-500/10',
  },
  violet: {
    icon: 'text-accent-violet bg-violet-50 dark:bg-violet-500/15 dark:text-violet-300',
    text: 'text-accent-violet dark:text-violet-300',
    ring: 'ring-violet-200 dark:ring-violet-500/30',
    bar: 'bg-accent-violet',
    soft: 'bg-violet-50 dark:bg-violet-500/10',
  },
  slate: {
    icon: 'text-slate-600 bg-slate-100 dark:bg-slate-700/40 dark:text-slate-300',
    text: 'text-slate-600 dark:text-slate-300',
    ring: 'ring-slate-200 dark:ring-slate-600',
    bar: 'bg-slate-500',
    soft: 'bg-slate-100 dark:bg-slate-800',
  },
}

export const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n)
