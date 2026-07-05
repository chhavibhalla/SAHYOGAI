import { motion } from 'framer-motion'

// Soft, slow-moving aurora backdrop. Fixed, non-interactive, very subtle.
export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f3f8fd] via-[#eef4fb] to-[#e9f0f9] dark:from-slate-950 dark:via-slate-950 dark:to-[#0a1220]" />

      {/* aurora orbs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-32 -top-24 h-[32rem] w-[32rem] rounded-full bg-sbi-400/25 blur-[120px] dark:bg-sbi-500/15"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-40 top-32 h-[34rem] w-[34rem] rounded-full bg-accent-teal/20 blur-[130px] dark:bg-accent-teal/10"
      />
      <motion.div
        animate={{ x: [0, 25, 0], y: [0, -25, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-accent-violet/15 blur-[130px] dark:bg-accent-violet/10"
      />

      {/* fine grid overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0A5FA8 1px, transparent 1px), linear-gradient(to bottom, #0A5FA8 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)',
        }}
      />
    </div>
  )
}
