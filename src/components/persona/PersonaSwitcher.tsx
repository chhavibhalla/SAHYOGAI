import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { PERSONAS } from '../../data/mockData'

export function PersonaSwitcher() {
  const { persona, setPersona } = useApp()

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-full border border-slate-200 bg-white/70 p-1.5 backdrop-blur dark:border-slate-700 dark:bg-slate-800/60">
      {PERSONAS.map((p) => {
        const active = p.id === persona
        return (
          <button
            key={p.id}
            onClick={() => setPersona(p.id)}
            className="relative shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition"
          >
            {active && (
              <motion.span
                layoutId="persona-pill"
                className="absolute inset-0 rounded-full bg-sbi-gradient shadow-soft"
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              />
            )}
            <span
              className={`relative flex items-center gap-1.5 ${
                active ? 'text-white' : 'text-slate-500 dark:text-slate-300'
              }`}
            >
              <span>{p.emoji}</span>
              {p.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
