import { motion } from 'framer-motion'
import { ArrowRight, BellRing } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { PROACTIVE_ALERTS } from '../../data/mockData'
import { TONES } from '../../lib/tone'
import { SectionHeading } from '../ui/SectionHeading'

export function ProactiveAlerts() {
  const { t } = useApp()

  return (
    <div>
      <SectionHeading
        icon={BellRing}
        title={t('alerts')}
        subtitle="Nudges the AI surfaced before you had to ask"
      />
      <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
        {PROACTIVE_ALERTS.map((a, i) => {
          const tone = TONES[a.tone]
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className={`card card-hover relative w-[80vw] shrink-0 overflow-hidden p-4 sm:w-auto`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 ${tone.bar}`} />
              <div className="flex items-start gap-3">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${tone.icon}`}>
                  <a.icon className="h-[22px] w-[22px]" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold leading-snug text-slate-900 dark:text-white">
                    {a.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {a.body}
                  </p>
                </div>
              </div>
              <button
                className={`mt-3 flex items-center gap-1 text-xs font-bold ${tone.text} hover:gap-2`}
              >
                {a.cta} <ArrowRight className="h-3.5 w-3.5 transition-all" />
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
