import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { NOTIFICATIONS } from '../../data/mockData'

export function NotificationBell() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/70 text-slate-600 transition hover:border-sbi-200 hover:text-sbi-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
        aria-label="Notifications"
      >
        <Bell className="h-[18px] w-[18px]" />
        <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-orange opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-orange" />
        </span>
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
              className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-float dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-700">
                <p className="font-display text-sm font-bold text-slate-900 dark:text-white">
                  Notifications
                </p>
                <span className="chip bg-accent-orange/10 text-accent-orange">3 new</span>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {NOTIFICATIONS.map((n, i) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-3 rounded-2xl p-3 transition hover:bg-slate-50 dark:hover:bg-slate-700/40"
                  >
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sbi-50 text-sbi-600 dark:bg-sbi-500/15 dark:text-sbi-300">
                      <n.icon className="h-[18px] w-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {n.title}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {n.body}
                      </p>
                    </div>
                    <span className="ml-auto shrink-0 text-[10px] text-slate-400">{n.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
