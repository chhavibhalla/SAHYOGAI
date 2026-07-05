import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Globe, ChevronDown } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { LANGUAGES } from '../../i18n/translations'

export function LanguageSelector() {
  const { language, setLanguage } = useApp()
  const [open, setOpen] = useState(false)
  const active = LANGUAGES.find((l) => l.code === language)!

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-sbi-200 hover:text-sbi-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{active.native}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-100 bg-white p-1.5 shadow-float dark:border-slate-700 dark:bg-slate-800"
            >
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                    l.code === language
                      ? 'bg-sbi-50 font-semibold text-sbi-700 dark:bg-sbi-500/15 dark:text-sbi-200'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{l.flag}</span>
                    {l.native}
                  </span>
                  {l.code === language && <Check className="h-4 w-4" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
