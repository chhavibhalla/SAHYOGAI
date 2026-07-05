import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, UserCheck } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { PERSONAS, PERSONA_WIDGETS, ACCOUNTS } from '../../data/mockData'
import { WidgetCard } from './WidgetCard'

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
  const account = ACCOUNTS[persona]
  const widgets = PERSONA_WIDGETS[persona]

  // Simulate the AI "re-composing" the space when persona changes.
  useEffect(() => {
    setLoading(true)
    const id = setTimeout(() => setLoading(false), 620)
    return () => clearTimeout(id)
  }, [persona])

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100/60 p-5 dark:border-slate-800 dark:bg-slate-900/40 sm:p-6">
      <div className="relative mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-sbi-600 shadow-sm dark:bg-slate-800 dark:text-sbi-300">
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
            </motion.h2>
          </AnimatePresence>
          <p className="mt-0.5 text-sm text-slate-400">{meta.tagline}</p>
        </div>

        {/* Account-bound indicator (switch from the profile menu, top-right) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={persona}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <img src={account.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
            <div className="leading-tight">
              <p className="flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-100">
                <UserCheck className="h-3.5 w-3.5 text-accent-teal" /> {account.role} account
              </p>
              <p className="text-[10px] text-slate-400">Personalised for {account.name}</p>
            </div>
          </motion.div>
        </AnimatePresence>
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
        ✨ Only this space adapts to your account — the rest of your banking stays exactly where you expect it.
        <span className="ml-1 font-semibold text-sbi-500">Switch accounts from your profile, top-right ↗</span>
      </p>
    </section>
  )
}
