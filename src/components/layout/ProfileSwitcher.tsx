import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, LogOut, Settings, UserRound, Repeat } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { ACCOUNTS, PERSONAS } from '../../data/mockData'

export function ProfileSwitcher() {
  const { persona, setPersona } = useApp()
  const [open, setOpen] = useState(false)
  const active = ACCOUNTS[persona]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 p-1 pr-2.5 transition hover:border-sbi-200 dark:border-slate-700 dark:bg-slate-800/70"
      >
        <img
          src={active.avatar}
          alt={active.name}
          className="h-8 w-8 rounded-full object-cover ring-2 ring-sbi-100 dark:ring-sbi-500/30"
        />
        <span className="hidden text-left leading-tight sm:block">
          <span className="block text-xs font-bold text-slate-800 dark:text-slate-100">
            {active.greetingName}
          </span>
          <span className="block text-[10px] font-medium text-slate-400">{active.role}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition ${open ? 'rotate-180' : ''}`} />
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
              className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-float dark:border-slate-700 dark:bg-slate-800"
            >
              {/* current */}
              <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/60 px-4 py-3 dark:border-slate-700 dark:bg-slate-900/40">
                <img src={active.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{active.name}</p>
                  <p className="text-xs text-slate-400">SBI Savings {active.maskedId}</p>
                </div>
              </div>

              {/* switch accounts */}
              <div className="p-2">
                <p className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <Repeat className="h-3 w-3" /> Switch account
                </p>
                {PERSONAS.map((p) => {
                  const acc = ACCOUNTS[p.id]
                  const isActive = p.id === persona
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPersona(p.id)
                        setOpen(false)
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition ${
                        isActive
                          ? 'bg-sbi-50 dark:bg-sbi-500/15'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700/40'
                      }`}
                    >
                      <img src={acc.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                          {acc.name}
                        </p>
                        <p className="text-[11px] text-slate-400">{p.emoji} {acc.role}</p>
                      </div>
                      {isActive && <Check className="h-4 w-4 text-sbi-600 dark:text-sbi-300" />}
                    </button>
                  )
                })}
              </div>

              {/* footer actions */}
              <div className="border-t border-slate-100 p-2 dark:border-slate-700">
                {[
                  { icon: UserRound, label: 'My Profile' },
                  { icon: Settings, label: 'Settings' },
                  { icon: LogOut, label: 'Sign out' },
                ].map((a) => (
                  <button
                    key={a.label}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/40"
                  >
                    <a.icon className="h-4 w-4" /> {a.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
