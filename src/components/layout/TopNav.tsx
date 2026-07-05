import { motion } from 'framer-motion'
import { Sparkles, SlidersHorizontal } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { LanguageSelector } from './LanguageSelector'
import { NotificationBell } from './NotificationBell'
import { ProfileSwitcher } from './ProfileSwitcher'
import { useApp } from '../../context/AppContext'
import { ACCOUNTS } from '../../data/mockData'

interface Props {
  onOpenA11y: () => void
}

export function TopNav({ onOpenA11y }: Props) {
  const { t, persona } = useApp()
  const account = ACCOUNTS[persona]

  return (
    <header className="sticky top-0 z-30 border-b border-white/40 bg-white/70 backdrop-blur-xl dark:border-white/5 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Left: Logo + welcome */}
        <div className="flex items-center gap-3">
          <Logo />
          <div className="hidden pl-1 md:block">
            <div className="flex items-center gap-2">
              <p className="font-display text-sm font-bold text-slate-900 dark:text-white">
                {t('greeting')}, {account.greetingName} 👋
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-teal opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-teal" />
              </span>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {t('assistantActive')}
              </p>
            </div>
          </div>
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* AI status pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden items-center gap-1.5 rounded-full bg-sbi-gradient px-3 py-1.5 text-xs font-semibold text-white shadow-soft sm:flex"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Active
          </motion.div>

          <LanguageSelector />

          <button
            onClick={onOpenA11y}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/70 text-slate-600 transition hover:border-sbi-200 hover:text-sbi-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
            aria-label="Accessibility settings"
          >
            <SlidersHorizontal className="h-[18px] w-[18px]" />
          </button>

          <NotificationBell />

          <ProfileSwitcher />
        </div>
      </div>
    </header>
  )
}
