import { motion } from 'framer-motion'

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative grid h-10 w-10 place-items-center rounded-2xl bg-sbi-gradient shadow-soft"
      >
        <svg viewBox="0 0 64 64" className="h-6 w-6">
          <circle cx="32" cy="29" r="15" stroke="white" strokeWidth="5" fill="none" />
          <path d="M18 42 Q32 56 46 42" stroke="#F58220" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="29" r="4.5" fill="white" />
        </svg>
      </motion.div>
      {!compact && (
        <div className="leading-none">
          <p className="font-display text-base font-extrabold tracking-tight text-sbi-700 dark:text-white">
            SBI
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Agentic AI
          </p>
        </div>
      )}
    </div>
  )
}
