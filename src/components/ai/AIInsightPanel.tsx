import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, AlertTriangle, Wand2, Languages, UserRound } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { AI_INSIGHT } from '../../data/mockData'
import { PERSONAS } from '../../data/mockData'
import { LANGUAGES } from '../../i18n/translations'

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

export function AIInsightPanel() {
  const { t, persona, language } = useApp()
  const confidence = useCountUp(AI_INSIGHT.confidence, true)
  const personaLabel = PERSONAS.find((p) => p.id === persona)?.label ?? 'Student'
  const langLabel = LANGUAGES.find((l) => l.code === language)?.native ?? 'English'

  const rows = [
    { icon: Target, label: 'Current Intent', value: AI_INSIGHT.intent, tone: 'text-sbi-600 dark:text-sbi-300' },
    { icon: AlertTriangle, label: 'Detected Problem', value: AI_INSIGHT.problem, tone: 'text-accent-orange' },
    { icon: Wand2, label: 'Suggested Resolution', value: AI_INSIGHT.resolution, tone: 'text-accent-teal' },
    { icon: Languages, label: 'Language', value: langLabel, tone: 'text-accent-violet' },
    { icon: UserRound, label: 'Persona', value: personaLabel, tone: 'text-sbi-600 dark:text-sbi-300' },
  ]

  return (
    <div className="relative overflow-hidden rounded-4xl bg-slate-900 p-5 text-white shadow-float dark:bg-slate-900">
      {/* animated aura */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-sbi-500/40 blur-3xl"
      />
      <div className="relative mb-4 flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-sbi-gradient">
          <Brain className="h-5 w-5" />
        </div>
        <div>
          <p className="font-display text-sm font-bold">{t('aiThinking')}</p>
          <p className="flex items-center gap-1 text-[11px] text-white/50">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-teal" />
            Live · updating in real time
          </p>
        </div>
      </div>

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
        {rows.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2.5"
          >
            <r.icon className={`h-4 w-4 ${r.tone}`} />
            <span className="text-xs text-white/50">{r.label}</span>
            <span className={`ml-auto text-right text-sm font-semibold ${r.tone}`}>{r.value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
