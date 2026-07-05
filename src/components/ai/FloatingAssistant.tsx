import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mic, Send, X, Sparkles, Volume2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { ASSISTANT_REPLIES } from '../../i18n/translations'
import { SUGGESTED_PROMPTS } from '../../data/mockData'
import type { ChatMessage } from '../../types'
import { AIAvatar } from './AIAvatar'

interface Props {
  open: boolean
  setOpen: (v: boolean) => void
}

// Pick a canned reply by simple intent keywords.
function matchReply(text: string, dict: Record<string, string>) {
  const q = text.toLowerCase()
  if (q.includes('otp')) return dict.otp
  if (q.includes('pension')) return dict.pension
  if (q.includes('transfer') || q.includes('send') || q.includes('money')) return dict.transfer
  if (q.includes('block') || q.includes('card')) return dict.block
  if (q.includes('help')) return dict.help
  return dict.default
}

let idc = 0
const nextId = () => `m${idc++}`

export function FloatingAssistant({ open, setOpen }: Props) {
  const { t, language } = useApp()
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), role: 'ai', text: ASSISTANT_REPLIES[language].help },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [listening, setListening] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing, open])

  const send = (text: string) => {
    const clean = text.trim()
    if (!clean) return
    setInput('')
    setMessages((m) => [...m, { id: nextId(), role: 'user', text: clean }])
    setTyping(true)
    setTimeout(() => {
      const reply = matchReply(clean, ASSISTANT_REPLIES[language])
      setTyping(false)
      setMessages((m) => [...m, { id: nextId(), role: 'ai', text: reply }])
    }, 1100)
  }

  // Fake voice capture for the demo
  const toggleMic = () => {
    if (listening) {
      setListening(false)
      return
    }
    setListening(true)
    setTimeout(() => {
      setListening(false)
      send(SUGGESTED_PROMPTS[1]) // "My OTP isn't coming"
    }, 1800)
  }

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full bg-white p-1.5 pr-4 shadow-float dark:bg-slate-800 lg:bottom-6 lg:right-6"
          >
            <AIAvatar size={44} speaking />
            <div className="text-left">
              <p className="font-display text-xs font-bold text-slate-900 dark:text-white">
                {t('assistantName')}
              </p>
              <p className="flex items-center gap-1 text-[10px] font-medium text-accent-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" /> {t('online')}
              </p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className="fixed bottom-20 right-4 z-50 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-4xl border border-white/60 bg-white shadow-float dark:border-slate-700 dark:bg-slate-900 lg:bottom-6 lg:right-6"
          >
            {/* header */}
            <div className="flex items-center gap-3 bg-sbi-gradient px-4 py-3.5 text-white">
              <AIAvatar size={40} speaking={typing || listening} />
              <div className="flex-1">
                <p className="font-display text-sm font-bold">{t('assistantName')}</p>
                <p className="flex items-center gap-1 text-[11px] text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
                  {listening ? 'Listening…' : typing ? 'Typing…' : t('online')}
                </p>
              </div>
              <button className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition hover:bg-white/25">
                <Volume2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-950/40">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'ai' && (
                    <div className="mr-2 mt-auto">
                      <AIAvatar size={26} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-3xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      m.role === 'user'
                        ? 'rounded-br-md bg-sbi-gradient text-white'
                        : 'rounded-bl-md bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-100'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex items-end gap-2">
                  <AIAvatar size={26} />
                  <div className="flex gap-1 rounded-3xl rounded-bl-md bg-white px-4 py-3 shadow-sm dark:bg-slate-800">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                        className="h-2 w-2 rounded-full bg-sbi-400"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* suggested prompts */}
            <div className="no-scrollbar flex gap-2 overflow-x-auto border-t border-slate-100 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="flex shrink-0 items-center gap-1 rounded-full bg-sbi-50 px-3 py-1.5 text-xs font-semibold text-sbi-700 transition hover:bg-sbi-100 dark:bg-slate-800 dark:text-sbi-200"
                >
                  <Sparkles className="h-3 w-3" />
                  {p}
                </button>
              ))}
            </div>

            {/* input */}
            <div className="flex items-center gap-2 border-t border-slate-100 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
              <button
                onClick={toggleMic}
                className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition ${
                  listening
                    ? 'bg-accent-orange text-white'
                    : 'bg-sbi-50 text-sbi-600 dark:bg-slate-800 dark:text-sbi-300'
                }`}
                aria-label="Voice input"
              >
                {listening && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent-orange/50" />
                )}
                <Mic className="relative h-5 w-5" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send(input)}
                placeholder={t('askAnything')}
                className="h-10 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-sbi-300 focus:ring-2 focus:ring-sbi-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <button
                onClick={() => send(input)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sbi-gradient text-white shadow-soft transition active:scale-95"
                aria-label="Send"
              >
                <Send className="h-[18px] w-[18px]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
