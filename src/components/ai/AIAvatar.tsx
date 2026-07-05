import { motion } from 'framer-motion'

// Animated "agent orb" avatar used across the assistant.
export function AIAvatar({ size = 40, speaking = false }: { size?: number; speaking?: boolean }) {
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      {speaking && (
        <>
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-sbi-400/50" />
          <span
            className="absolute inset-0 animate-pulse-ring rounded-full bg-accent-teal/40"
            style={{ animationDelay: '0.6s' }}
          />
        </>
      )}
      <motion.div
        animate={{
          background: [
            'linear-gradient(135deg,#0A5FA8,#12A0E0)',
            'linear-gradient(135deg,#12A0E0,#12B5A6)',
            'linear-gradient(135deg,#0A5FA8,#12A0E0)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="relative grid h-full w-full place-items-center rounded-full shadow-soft"
      >
        <motion.div
          animate={{ scale: speaking ? [1, 1.15, 1] : [1, 1.06, 1] }}
          transition={{ duration: speaking ? 0.6 : 3, repeat: Infinity }}
          className="grid place-items-center"
        >
          {/* stylised spark / core */}
          <svg viewBox="0 0 24 24" className="text-white" style={{ width: size * 0.5, height: size * 0.5 }}>
            <path
              fill="currentColor"
              d="M12 2c.4 2.8 2.2 4.6 5 5-2.8.4-4.6 2.2-5 5-.4-2.8-2.2-4.6-5-5 2.8-.4 4.6-2.2 5-5Z"
            />
            <circle cx="18.5" cy="17.5" r="1.6" fill="currentColor" opacity="0.9" />
            <circle cx="6" cy="16" r="1" fill="currentColor" opacity="0.7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
