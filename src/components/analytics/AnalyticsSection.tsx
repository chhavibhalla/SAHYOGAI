import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import {
  ANALYTICS_METRICS, JOURNEY_FUNNEL, FEATURE_USAGE, DROPOFF_POINTS, AI_WEEKLY,
} from '../../data/mockData'
import { TONES } from '../../lib/tone'
import { useCountUp } from '../../hooks/useCountUp'
import { SectionHeading } from '../ui/SectionHeading'

function MetricCard({ m, i }: { m: (typeof ANALYTICS_METRICS)[number]; i: number }) {
  const val = useCountUp(m.value, true)
  const tone = TONES[m.tone]
  const up = m.trend >= 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.06 }}
      className="card p-4"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-400">{m.label}</p>
        <span
          className={`chip ${up ? 'bg-teal-50 text-accent-teal dark:bg-teal-500/15' : 'bg-orange-50 text-accent-orange dark:bg-orange-500/15'}`}
        >
          {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(m.trend)}%
        </span>
      </div>
      <p className={`mt-2 font-display text-3xl font-extrabold ${tone.text}`}>
        {m.value >= 1000 ? Math.round(val).toLocaleString('en-IN') : Math.round(val)}
        {m.suffix}
      </p>
    </motion.div>
  )
}

function JourneyFunnel() {
  const max = Math.max(...JOURNEY_FUNNEL.map((s) => s.value))
  return (
    <div className="card p-5">
      <p className="section-title mb-1 text-base">User Journey Completion</p>
      <p className="mb-4 text-xs text-slate-400">Where users flow — and where the AI steps in</p>
      <div className="space-y-3">
        {JOURNEY_FUNNEL.map((s, i) => (
          <div key={s.stage} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
              {s.stage}
            </span>
            <div className="h-6 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(s.value / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: 'easeOut' }}
                className="flex h-full items-center justify-end rounded-full bg-sbi-gradient pr-2"
              >
                <span className="text-[10px] font-bold text-white">{s.value}%</span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AISuccessTrend() {
  const w = 260
  const h = 90
  const max = Math.max(...AI_WEEKLY)
  const min = Math.min(...AI_WEEKLY) - 6
  const pts = AI_WEEKLY.map((v, i) => {
    const x = (i / (AI_WEEKLY.length - 1)) * w
    const y = h - ((v - min) / (max - min)) * h
    return [x, y] as const
  })
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="section-title text-base">AI Success Rate</p>
          <p className="text-xs text-slate-400">Last 7 days</p>
        </div>
        <span className="chip bg-teal-50 text-accent-teal dark:bg-teal-500/15">
          <TrendingUp className="h-3 w-3" /> +24%
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="aiArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12B5A6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#12B5A6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={area}
          fill="url(#aiArea)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d={line}
          fill="none"
          stroke="#12B5A6"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        {pts.map((p, i) => (
          <motion.circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r="3"
            fill="#fff"
            stroke="#12B5A6"
            strokeWidth="2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + i * 0.08 }}
          />
        ))}
      </svg>
    </div>
  )
}

function FeatureUsage() {
  return (
    <div className="card p-5">
      <p className="section-title mb-1 text-base">Most Used Features</p>
      <p className="mb-4 text-xs text-slate-400">Share of active engagement</p>
      <div className="space-y-3">
        {FEATURE_USAGE.map((f, i) => (
          <div key={f.name} className="flex items-center gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-sbi-50 text-sbi-600 dark:bg-sbi-500/15 dark:text-sbi-300">
              <f.icon className="h-4 w-4" />
            </span>
            <span className="w-20 shrink-0 text-xs font-medium text-slate-600 dark:text-slate-300">
              {f.name}
            </span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${f.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="h-full rounded-full bg-gradient-to-r from-sbi-500 to-accent-violet"
              />
            </div>
            <span className="w-8 shrink-0 text-right text-xs font-bold text-slate-500">
              {f.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DropoffDonut() {
  const total = DROPOFF_POINTS.reduce((s, d) => s + d.value, 0)
  const colors = ['#0A5FA8', '#F58220', '#12B5A6', '#6C5CE7']
  let offset = 0
  const r = 42
  const c = 2 * Math.PI * r
  return (
    <div className="card p-5">
      <p className="section-title mb-1 text-base">Drop-off Points</p>
      <p className="mb-3 text-xs text-slate-400">Where AI intervention matters most</p>
      <div className="flex items-center gap-4">
        <div className="relative grid h-32 w-32 shrink-0 place-items-center">
          <svg viewBox="0 0 110 110" className="h-32 w-32 -rotate-90">
            {DROPOFF_POINTS.map((d, i) => {
              const frac = d.value / total
              const dash = frac * c
              const seg = (
                <motion.circle
                  key={d.stage}
                  cx="55" cy="55" r={r}
                  fill="none"
                  stroke={colors[i]}
                  strokeWidth="14"
                  strokeDasharray={`${dash} ${c - dash}`}
                  strokeDashoffset={-offset}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                />
              )
              offset += dash
              return seg
            })}
          </svg>
          <div className="absolute text-center">
            <p className="font-display text-lg font-extrabold text-slate-900 dark:text-white">46%</p>
            <p className="text-[9px] text-slate-400">at OTP</p>
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          {DROPOFF_POINTS.map((d, i) => (
            <div key={d.stage} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: colors[i] }} />
              <span className="text-slate-600 dark:text-slate-300">{d.stage}</span>
              <span className="ml-auto font-bold text-slate-500">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AnalyticsSection() {
  const { t } = useApp()
  return (
    <section>
      <SectionHeading
        icon={BarChart3}
        title={t('analytics')}
        subtitle="Demo telemetry visualisations from the agentic layer"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ANALYTICS_METRICS.map((m, i) => (
          <MetricCard key={m.label} m={m} i={i} />
        ))}
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">
        <JourneyFunnel />
        <AISuccessTrend />
        <FeatureUsage />
        <DropoffDonut />
      </div>
    </section>
  )
}
