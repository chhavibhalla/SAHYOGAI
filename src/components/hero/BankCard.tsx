import { motion } from 'framer-motion'
import { Wifi } from 'lucide-react'

// Premium virtual card visual with a moving sheen and tilt-on-hover.
export function BankCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      whileHover={{ rotateX: 4, rotateY: -6, y: -4 }}
      style={{ transformPerspective: 900 }}
      className="group relative aspect-[1.62/1] w-full overflow-hidden rounded-3xl p-5 text-white shadow-float"
    >
      {/* base gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#063a6b_0%,#0A5FA8_45%,#1288c9_100%)]" />
      {/* glow blobs */}
      <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-accent-teal/30 blur-2xl" />
      <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-accent-violet/25 blur-2xl" />
      {/* moving sheen */}
      <motion.div
        aria-hidden
        initial={{ x: '-120%' }}
        animate={{ x: '160%' }}
        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
        className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/15 blur-md"
      />
      {/* engraved lines */}
      <div className="pointer-events-none absolute right-4 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute right-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full border border-white/10" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-display text-sm font-extrabold tracking-tight">SBI Premier</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">Debit · Platinum</p>
          </div>
          <Wifi className="h-5 w-5 rotate-90 text-white/80" />
        </div>

        {/* chip */}
        <div className="flex items-center gap-3">
          <div className="h-7 w-9 rounded-md bg-gradient-to-br from-amber-200 to-amber-400 shadow-inner">
            <div className="mx-auto mt-1 h-3.5 w-6 rounded-sm border border-amber-500/40" />
          </div>
          <p className="font-mono text-base tracking-[0.18em] text-white/90">
            •••• •••• •••• 8821
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-white/50">Card Holder</p>
            <p className="font-display text-sm font-semibold">Chhavi Bhalla</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-widest text-white/50">Valid</p>
            <p className="font-mono text-sm">08/29</p>
          </div>
          <svg viewBox="0 0 48 30" className="h-7 w-11">
            <circle cx="17" cy="15" r="12" fill="#EB001B" opacity="0.9" />
            <circle cx="31" cy="15" r="12" fill="#F79E1B" opacity="0.9" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
