import { motion } from 'framer-motion'

// Calm grey-blue backdrop — minimal colour, low noise, clean.
export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base grey-blue wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#eef2f7] via-[#e9edf4] to-[#e4e9f1] dark:from-slate-950 dark:via-slate-950 dark:to-[#0a1220]" />

      {/* two soft blue washes only — very subtle */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 18, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-sbi-300/20 blur-[140px] dark:bg-sbi-500/10"
      />
      <motion.div
        animate={{ x: [0, -24, 0], y: [0, 30, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-slate-400/15 blur-[150px] dark:bg-slate-500/10"
      />

      {/* faint grid for structure */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 55% at 50% 0%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 55% at 50% 0%, black, transparent)',
        }}
      />
    </div>
  )
}
