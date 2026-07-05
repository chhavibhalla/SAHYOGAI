import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Activity, ChevronDown, Check, AlertCircle, Clock, Sparkles, Radio } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { TELEMETRY_EVENTS } from '../../data/mockData'
import type { TelemetryEvent } from '../../types'

const STATUS_STYLE: Record<TelemetryEvent['status'], { dot: string; ring: string; icon: typeof Check }> = {
  ok: { dot: 'bg-sbi-500', ring: 'ring-sbi-200 dark:ring-sbi-500/30', icon: Check },
  warn: { dot: 'bg-accent-orange', ring: 'ring-orange-200 dark:ring-orange-500/30', icon: Clock },
  error: { dot: 'bg-rose-500', ring: 'ring-rose-200 dark:ring-rose-500/30', icon: AlertCircle },
  ai: { dot: 'bg-accent-teal', ring: 'ring-teal-200 dark:ring-teal-500/30', icon: Sparkles },
}

export function TelemetryTimeline() {
  const { t } = useApp()
  const [open, setOpen] = useState(true)

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left"
      >
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white dark:bg-sbi-gradient">
          <Activity className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="section-title">{t('telemetry')}</p>
          <p className="text-xs text-slate-400">How the agent understands this journey · demo panel</p>
        </div>
        <span className="chip bg-teal-50 text-accent-teal dark:bg-teal-500/15">
          <Radio className="h-3 w-3" /> Tracing
        </span>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="relative px-5 pb-5 pt-1">
              <div className="absolute bottom-6 left-[34px] top-2 w-px bg-gradient-to-b from-sbi-200 via-slate-200 to-accent-teal dark:from-sbi-500/40 dark:via-slate-700 dark:to-accent-teal/40" />
              <div className="space-y-1">
                {TELEMETRY_EVENTS.map((e, i) => {
                  const s = STATUS_STYLE[e.status]
                  const Icon = s.icon
                  const isAI = e.status === 'ai'
                  return (
                    <motion.div
                      key={e.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                      className="relative flex items-start gap-3"
                    >
                      <div className="relative z-10 mt-0.5">
                        {isAI && (
                          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-teal/40" />
                        )}
                        <span
                          className={`relative grid h-7 w-7 place-items-center rounded-full ${s.dot} text-white ring-4 ring-white dark:ring-slate-900`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                      </div>
                      <div
                        className={`mb-1 flex-1 rounded-2xl px-3.5 py-2.5 ${
                          isAI
                            ? 'bg-teal-50 ring-1 ring-teal-100 dark:bg-teal-500/10 dark:ring-teal-500/20'
                            : 'bg-slate-50 dark:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`text-sm font-semibold ${
                              isAI
                                ? 'text-accent-teal'
                                : e.status === 'error'
                                  ? 'text-rose-500'
                                  : 'text-slate-800 dark:text-slate-100'
                            }`}
                          >
                            {e.label}
                          </p>
                          <span className="shrink-0 font-mono text-[10px] text-slate-400">
                            {e.timeOffset}
                          </span>
                        </div>
                        {e.detail && (
                          <p className="text-xs text-slate-400">{e.detail}</p>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
