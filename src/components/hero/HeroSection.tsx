import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, TrendingUp, ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { QUICK_ACTIONS, HERO_SHORTCUTS } from '../../data/mockData'
import { TONES, formatINR } from '../../lib/tone'
import { BankCard } from './BankCard'

export function HeroSection() {
  const { t } = useApp()
  const [show, setShow] = useState(true)
  const balance = 284560

  return (
    <section className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-5">
        {/* Balance card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-4xl p-6 text-white shadow-float lg:col-span-3"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#0A5FA8_0%,#0b6fc4_45%,#12A0E0_100%)]" />
          {/* decorative */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-accent-teal/25 blur-2xl" />
          <motion.div
            aria-hidden
            initial={{ x: '-140%' }}
            animate={{ x: '220%' }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            className="absolute inset-y-0 w-1/4 -skew-x-12 bg-white/10 blur-md"
          />

          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">{t('balance')}</p>
                <div className="mt-1 flex items-center gap-3">
                  <motion.h1
                    key={show ? 'shown' : 'hidden'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-4xl font-extrabold tracking-tight sm:text-[2.9rem]"
                  >
                    {show ? `₹${formatINR(balance)}` : '₹ • • • • • •'}
                  </motion.h1>
                  <button
                    onClick={() => setShow((s) => !s)}
                    className="grid h-8 w-8 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/25"
                    aria-label="Toggle balance"
                  >
                    {show ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>
                <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +12.4% this month
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/60">Savings •••• 8821</p>
                <p className="mt-1 font-display text-sm font-semibold">Premier</p>
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-7 grid grid-cols-4 gap-2.5">
              {QUICK_ACTIONS.map((a, i) => (
                <motion.button
                  key={a.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/10 py-3 backdrop-blur-md transition hover:bg-white/20"
                >
                  <a.icon className="h-5 w-5" />
                  <span className="text-[11px] font-semibold">{a.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Virtual card */}
        <div className="lg:col-span-2">
          <BankCard />
        </div>
      </div>

      {/* Shortcuts strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card flex items-center gap-2 overflow-x-auto p-3 no-scrollbar"
      >
        {HERO_SHORTCUTS.map((s, i) => {
          const tone = (['blue', 'teal', 'violet', 'orange', 'blue', 'slate'] as const)[i]
          return (
            <motion.button
              key={s.id}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="flex min-w-[86px] flex-1 flex-col items-center gap-2 rounded-2xl px-2 py-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${TONES[tone].icon}`}>
                <s.icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                {s.label}
              </span>
            </motion.button>
          )
        })}
        <button className="ml-1 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sbi-50 text-sbi-600 dark:bg-sbi-500/15 dark:text-sbi-300">
          <ChevronRight className="h-5 w-5" />
        </button>
      </motion.div>
    </section>
  )
}
