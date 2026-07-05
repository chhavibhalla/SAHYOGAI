import { motion } from 'framer-motion'
import { ArrowRight, Receipt } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { TRANSACTIONS } from '../../data/mockData'
import { formatINR } from '../../lib/tone'
import { SectionHeading } from '../ui/SectionHeading'

export function RecentTransactions() {
  const { t } = useApp()

  return (
    <div className="card p-5">
      <SectionHeading
        icon={Receipt}
        title={t('recent')}
        subtitle="Auto-categorised by AI"
        action={
          <button className="flex items-center gap-1 text-xs font-semibold text-sbi-600 hover:gap-2 dark:text-sbi-300">
            {t('viewAll')} <ArrowRight className="h-3.5 w-3.5 transition-all" />
          </button>
        }
      />
      <div className="space-y-1">
        {TRANSACTIONS.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 rounded-2xl px-2 py-2.5 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <div
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                tx.direction === 'in'
                  ? 'bg-teal-50 text-accent-teal dark:bg-teal-500/15'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <tx.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                {tx.name}
              </p>
              <p className="text-xs text-slate-400">{tx.category}</p>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-bold ${
                  tx.direction === 'in'
                    ? 'text-accent-teal'
                    : 'text-slate-800 dark:text-slate-100'
                }`}
              >
                {tx.direction === 'in' ? '+' : '−'}₹{formatINR(tx.amount)}
              </p>
              <p className="text-[11px] text-slate-400">{tx.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
