import { motion } from 'framer-motion'
import { Home, Wallet, ArrowLeftRight, Bot, CreditCard, User } from 'lucide-react'
import { useState } from 'react'

const ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'accounts', label: 'Accounts', icon: Wallet },
  { id: 'payments', label: 'Payments', icon: ArrowLeftRight },
  { id: 'ai', label: 'Assistant', icon: Bot, center: true },
  { id: 'cards', label: 'Cards', icon: CreditCard },
  { id: 'profile', label: 'Profile', icon: User },
]

interface Props {
  onAssistant: () => void
}

export function BottomNav({ onAssistant }: Props) {
  const [active, setActive] = useState('home')

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-100 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
        {ITEMS.map((item) => {
          if (item.center) {
            return (
              <button
                key={item.id}
                onClick={onAssistant}
                className="-mt-6 grid h-14 w-14 place-items-center rounded-2xl bg-sbi-gradient text-white shadow-float"
                aria-label="AI Assistant"
              >
                <motion.span
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <item.icon className="h-6 w-6" />
                </motion.span>
              </button>
            )
          }
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="relative flex flex-1 flex-col items-center gap-0.5 py-1.5"
            >
              <item.icon
                className={`h-[22px] w-[22px] transition ${
                  isActive ? 'text-sbi-600 dark:text-sbi-300' : 'text-slate-400'
                }`}
                strokeWidth={isActive ? 2.4 : 1.9}
              />
              <span
                className={`text-[10px] font-medium transition ${
                  isActive ? 'text-sbi-600 dark:text-sbi-300' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.span
                  layoutId="bottomnav-dot"
                  className="absolute -top-0.5 h-1 w-1 rounded-full bg-sbi-500"
                />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
