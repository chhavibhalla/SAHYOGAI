import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { WidgetItem } from '../../types'
import { TONES } from '../../lib/tone'

export function WidgetCard({ item, index }: { item: WidgetItem; index: number }) {
  const tone = TONES[item.tone]
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: index * 0.04 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group card card-hover flex flex-col justify-between p-4 text-left"
    >
      <div className="flex items-start justify-between">
        <span className={`grid h-11 w-11 place-items-center rounded-2xl ${tone.icon}`}>
          <item.icon className="h-[22px] w-[22px]" strokeWidth={2} />
        </span>
        {item.badge ? (
          <span className={`chip ${tone.soft} ${tone.text}`}>{item.badge}</span>
        ) : (
          <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-sbi-500 dark:text-slate-600" />
        )}
      </div>

      <div className="mt-3">
        <p className="font-display text-[15px] font-bold leading-tight text-slate-900 dark:text-white">
          {item.title}
        </p>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p>
      </div>

      {item.value && (
        <p className={`mt-2 font-display text-lg font-extrabold ${tone.text}`}>{item.value}</p>
      )}

      {typeof item.progress === 'number' && (
        <div className="mt-3">
          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.progress}%` }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
              className={`h-full rounded-full ${tone.bar}`}
            />
          </div>
          <p className="mt-1 text-right text-[11px] font-semibold text-slate-400">
            {item.progress}%
          </p>
        </div>
      )}
    </motion.button>
  )
}
