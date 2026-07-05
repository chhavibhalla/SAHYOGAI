import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { PERSONAS, PERSONA_WIDGETS } from '../../data/mockData'
import { WidgetCard } from './WidgetCard'
import { PersonaSwitcher } from './PersonaSwitcher'

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="card p-4">
          <div className="skeleton h-11 w-11 rounded-2xl" />
          <div className="skeleton mt-3 h-4 w-3/4" />
          <div className="skeleton mt-2 h-3 w-1/2" />
          <div className="skeleton mt-4 h-2 w-full" />
        </div>
      ))}
    </div>
  )
}

export function PersonaWidgets() {
  const { persona, t } = useApp()
  const [loading, setLoading] = useState(false)
  const meta = PERSONAS.find((p) => p.id === persona)!
  const widgets = PERSONA_WIDGETS[persona]

  // Simulate the AI "re-composing" the space when persona changes.
  useEffect(() => {
    setLoading(true)
    const id = setTimeout(() => setLoading(false), 620)
    return () => clearTimeout(id)
  }, [persona])

  return (
    <section className="relative overflow-hidden rounded-4xl border border-sbi-100/70 bg-sbi-soft p-5 dark:border-slate-800 dark:bg-slate-900/40 sm:p-6">
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sbi-200/40 blur-3xl dark:bg-sbi-500/10" />

      <div className="relative mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-sbi-600 shadow-sm dark:bg-slate-800 dark:text-sbi-300">
            <Sparkles className="h-3.5 w-3.5" />
            {t('personaTitle')}
          </div>
          <AnimatePresence mode="wait">
            <motion.h2
              key={persona}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="font-display text-xl font-extrabold sm:text-2xl"
            >
              <span className="text-slate-900 dark:text-white">{meta.emoji} </span>
              <span className="gradient-text">{meta.label}</span>
              <span className="ml-2 text-sm font-medium text-slate-400">— {meta.tagline}</span>
            </motion.h2>
          </AnimatePresence>
        </div>
        <PersonaSwitcher />
      </div>

      <div className="relative">
        {loading ? (
          <SkeletonGrid />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {widgets.map((w, i) => (
                <WidgetCard key={w.id} item={w} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <p className="relative mt-4 text-center text-[11px] text-slate-400">
        ✨ Only this space adapts to who you are — the rest of your banking stays exactly where you expect it.
      </p>
    </section>
  )
}
