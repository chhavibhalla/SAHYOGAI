import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HelpCircle, X, Brain, Target, AlertTriangle, Wand2, Languages, UserRound } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { AI_INSIGHT, PERSONAS } from '../../data/mockData'
import { LANGUAGES } from '../../i18n/translations'

interface Props {
  open: boolean
  setOpen: (v: boolean) => void
}

function useCountUp(target: number, active: boolean) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf = 0
    const start = performance.now()
    const dur = 1000
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active])
  return n
}

export function QuickHelpPanel({ open, setOpen }: Props) {
  const { persona, language } = useApp()
  const confidence = useCountUp(AI_INSIGHT.confidence, open)
  const personaLabel = PERSONAS.find((p) => p.id === persona)?.label ?? 'Student'
  const langLabel = LANGUAGES.find((l) => l.code === language)?.native ?? 'English'

  const rows = [
    { icon: Target, label: 'Current Intent', value: AI_INSIGHT.intent, tone: 'text-sbi-300' },
    { icon: AlertTriangle, label: 'Detected Problem', value: AI_INSIGHT.problem, tone: 'text-accent-orange' },
    { icon: Wand2, label: 'Suggested Resolution', value: AI_INSIGHT.resolution, tone: 'text-accent-teal' },
    { icon: Languages, label: 'Language', value: langLabel, tone: 'text-accent-violet' },
    { icon: UserRound, label: 'Persona', value: personaLabel, tone: 'text-sbi-300' },
  ]

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setOpen(true)}
            className="fixed right-4 top-20 z-40 flex items-center gap-2 rounded-full bg-sbi-gradient px-4 py-3 text-white shadow-float lg:right-6 lg:top-24"
            aria-label="Quick Help"
          >
            <HelpCircle className="h-5 w-5" />
            <span className="font-display text-sm font-bold">Quick Help</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Popup panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className="fixed right-4 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-[380px] -translate-y-1/2 overflow-hidden rounded-4xl bg-slate-900 text-white shadow-float lg:right-6"
          >
            <div className="flex items-center gap-2.5 bg-sbi-gradient px-5 py-4">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
                <Brain className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-bold">Quick Help</p>
                <p className="flex items-center gap-1 text-[11px] text-white/70">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-teal" />
                  What the AI is thinking
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
                aria-label="Close quick help"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-5">
              {/* Confidence ring */}
              <div className="relative mb-5 flex items-center gap-4 rounded-3xl bg-white/5 p-4">
                <div className="relative grid h-20 w-20 place-items-center">
                  <svg className="h-20 w-20 -rotate-90">
                    <circle cx="40" cy="40" r="32" strokeWidth="7" className="fill-none stroke-white/10" />
                    <motion.circle
                      cx="40" cy="40" r="32" strokeWidth="7" strokeLinecap="round"
                      className="fill-none stroke-accent-teal"
                      strokeDasharray={2 * Math.PI * 32}
                      initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - AI_INSIGHT.confidence / 100) }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                    />
                  </svg>
                  <span className="absolute font-display text-xl font-extrabold">{confidence}%</span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Confidence</p>
                  <p className="mt-0.5 text-sm font-medium text-white/90">
                    High certainty in detected intent
                  </p>
                  <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${AI_INSIGHT.confidence}%` }}
                      transition={{ duration: 1.1 }}
                      className="h-full rounded-full bg-accent-teal"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                {rows.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2.5"
                  >
                    <r.icon className={`h-4 w-4 ${r.tone}`} />
                    <span className="text-xs text-white/50">{r.label}</span>
                    <span className={`ml-auto text-right text-sm font-semibold ${r.tone}`}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
