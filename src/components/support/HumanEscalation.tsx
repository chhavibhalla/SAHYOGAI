import { motion } from 'framer-motion'
import { MessageSquareText, Video, PhoneCall, MapPin, ShieldCheck } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const OPTIONS = [
  { id: 'chat', label: 'Chat with Banker', sub: 'Avg. wait < 1 min', icon: MessageSquareText, tone: 'from-sbi-500 to-sbi-400' },
  { id: 'video', label: 'Schedule Video Call', sub: 'Pick a slot today', icon: Video, tone: 'from-accent-violet to-sbi-500' },
  { id: 'callback', label: 'Request Callback', sub: "We'll call you back", icon: PhoneCall, tone: 'from-accent-teal to-sbi-500' },
  { id: 'branch', label: 'Visit Nearby Branch', sub: '2 branches near you', icon: MapPin, tone: 'from-accent-orange to-sbi-500' },
]

export function HumanEscalation() {
  const { t } = useApp()
  return (
    <section className="relative overflow-hidden rounded-4xl border border-slate-100 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-sbi-100/50 blur-3xl dark:bg-sbi-500/10" />
      <div className="relative flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-accent-teal dark:bg-teal-500/15">
            <ShieldCheck className="h-3.5 w-3.5" /> Human help, always
          </div>
          <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
            {t('stillHelp')}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('reassure')}</p>
        </div>
      </div>

      <div className="relative mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {OPTIONS.map((o, i) => (
          <motion.button
            key={o.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-3 rounded-3xl border border-slate-100 bg-slate-50/60 p-4 text-left transition hover:border-transparent hover:shadow-soft dark:border-slate-800 dark:bg-slate-800/40"
          >
            <span
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${o.tone} text-white shadow-soft`}
            >
              <o.icon className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-sm font-bold text-slate-900 dark:text-white">
                {o.label}
              </p>
              <p className="text-xs text-slate-400">{o.sub}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
