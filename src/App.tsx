import { useState } from 'react'
import { motion } from 'framer-motion'
import { TopNav } from './components/layout/TopNav'
import { BottomNav } from './components/layout/BottomNav'
import { HeroSection } from './components/hero/HeroSection'
import { RecentTransactions } from './components/hero/RecentTransactions'
import { PersonaWidgets } from './components/persona/PersonaWidgets'
import { AIInsightPanel } from './components/ai/AIInsightPanel'
import { TelemetryTimeline } from './components/ai/TelemetryTimeline'
import { ProactiveAlerts } from './components/ai/ProactiveAlerts'
import { FloatingAssistant } from './components/ai/FloatingAssistant'
import { HumanEscalation } from './components/support/HumanEscalation'
import { AnalyticsSection } from './components/analytics/AnalyticsSection'
import { AccessibilityPanel } from './components/accessibility/AccessibilityPanel'
import { AmbientBackground } from './components/ui/AmbientBackground'
import { useApp } from './context/AppContext'

const stagger = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function App() {
  const { a11y } = useApp()
  const [a11yOpen, setA11yOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const simple = a11y.simpleMode

  return (
    <div className="relative min-h-screen pb-24 lg:pb-8">
      <AmbientBackground />
      <TopNav onOpenA11y={() => setA11yOpen(true)} />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6">
        {/* Mobile greeting (hidden on desktop where it's in the nav) */}
        <div className="md:hidden">
          <h1 className="font-display text-2xl font-extrabold">
            <span className="text-slate-900 dark:text-white">Good Morning, </span>
            <span className="gradient-text">Chhavi</span>
            <span className="text-slate-900 dark:text-white"> 👋</span>
          </h1>
          <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-teal opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-teal" />
            </span>
            Your AI Banking Assistant is Active
          </p>
        </div>

        <motion.div variants={stagger} initial="hidden" animate="show" transition={{ duration: 0.5 }}>
          <HeroSection />
        </motion.div>

        {/* MOST IMPORTANT: dynamic persona space */}
        <PersonaWidgets />

        {!simple && (
          <>
            {/* AI intelligence row */}
            <section className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <TelemetryTimeline />
                <RecentTransactions />
              </div>
              <div className="lg:col-span-1">
                <AIInsightPanel />
              </div>
            </section>

            <ProactiveAlerts />

            <AnalyticsSection />
          </>
        )}

        {simple && (
          <div className="space-y-6">
            <ProactiveAlerts />
            <RecentTransactions />
          </div>
        )}

        <HumanEscalation />

        <footer className="pt-4 text-center text-xs text-slate-400">
          <p className="font-semibold">SBI · Agentic AI Banking — Hackathon Concept</p>
          <p className="mt-1">
            Unofficial demonstration. Not affiliated with State Bank of India. Built to showcase
            proactive, persona-aware digital banking.
          </p>
        </footer>
      </main>

      <FloatingAssistant open={assistantOpen} setOpen={setAssistantOpen} />
      <AccessibilityPanel open={a11yOpen} onClose={() => setA11yOpen(false)} />
      <BottomNav onAssistant={() => setAssistantOpen(true)} />
    </div>
  )
}
