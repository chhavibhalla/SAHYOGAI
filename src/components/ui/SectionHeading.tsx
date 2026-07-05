import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  icon?: LucideIcon
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export function SectionHeading({ icon: Icon, title, subtitle, action }: Props) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div className="flex items-center gap-3">
        {Icon && (
          <motion.div
            initial={{ rotate: -8, scale: 0.9, opacity: 0 }}
            whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-sbi-50 text-sbi-600 dark:bg-sbi-500/15 dark:text-sbi-300"
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </motion.div>
        )}
        <div>
          <h2 className="section-title">{title}</h2>
          {subtitle && (
            <p className="text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>
          )}
        </div>
      </div>
      {action}
    </div>
  )
}
