import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Type, Contrast, Mic, Accessibility, X, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useApp } from '../../context/AppContext'

interface Props {
  open: boolean
  onClose: () => void
}

type Key = 'dark' | 'largeText' | 'highContrast' | 'voiceNav' | 'simpleMode'

const TOGGLES: { key: Key; label: string; sub: string; icon: LucideIcon }[] = [
  { key: 'dark', label: 'Dark Mode', sub: 'Easier on the eyes at night', icon: Moon },
  { key: 'largeText', label: 'Large Text', sub: 'Bigger, clearer typography', icon: Type },
  { key: 'highContrast', label: 'High Contrast', sub: 'Stronger colour separation', icon: Contrast },
  { key: 'voiceNav', label: 'Voice Navigation', sub: 'Control the app by speaking', icon: Mic },
  { key: 'simpleMode', label: 'Simple Mode', sub: 'Fewer options, larger buttons', icon: Sparkles },
]

function Switch({ on }: { on: boolean }) {
  return (
    <span
      className={`relative flex h-6 w-11 shrink-0 items-center rounded-full transition ${
        on ? 'bg-sbi-500' : 'bg-slate-300 dark:bg-slate-600'
      }`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute h-5 w-5 rounded-full bg-white shadow ${on ? 'right-0.5' : 'left-0.5'}`}
      />
    </span>
  )
}

export function AccessibilityPanel({ open, onClose }: Props) {
  const { a11y, toggleA11y } = useApp()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[88vw] max-w-sm flex-col bg-white shadow-float dark:bg-slate-900"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 p-5 dark:border-slate-800">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-sbi-gradient text-white">
                <Accessibility className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-display text-base font-bold text-slate-900 dark:text-white">
                  Accessibility
                </p>
                <p className="text-xs text-slate-400">Designed for everyone, especially elders</p>
              </div>
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-2.5 overflow-y-auto p-5">
              {TOGGLES.map((tg) => {
                const on = a11y[tg.key]
                return (
                  <button
                    key={tg.key}
                    onClick={() => toggleA11y(tg.key)}
                    className={`flex w-full items-center gap-3 rounded-3xl border p-4 text-left transition ${
                      on
                        ? 'border-sbi-200 bg-sbi-50 dark:border-sbi-500/40 dark:bg-sbi-500/10'
                        : 'border-slate-100 bg-white hover:border-slate-200 dark:border-slate-800 dark:bg-slate-900'
                    }`}
                  >
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
                        on ? 'bg-sbi-gradient text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                      }`}
                    >
                      <tg.icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-sm font-bold text-slate-900 dark:text-white">
                        {tg.label}
                      </span>
                      <span className="block text-xs text-slate-400">{tg.sub}</span>
                    </span>
                    <Switch on={on} />
                  </button>
                )
              })}

              <div className="mt-4 rounded-3xl bg-slate-900 p-4 text-white dark:bg-slate-800">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-accent-teal" /> AI Accessibility Assist
                </p>
                <p className="mt-1 text-xs text-white/60">
                  The assistant automatically enables Large Text & simplified flows when it detects a
                  senior-citizen persona or repeated hesitation.
                </p>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
