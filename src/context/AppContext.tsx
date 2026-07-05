import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { LanguageCode, PersonaId } from '../types'
import { T } from '../i18n/translations'

interface A11yState {
  dark: boolean
  largeText: boolean
  highContrast: boolean
  simpleMode: boolean
  voiceNav: boolean
}

interface AppContextValue {
  persona: PersonaId
  setPersona: (p: PersonaId) => void
  language: LanguageCode
  setLanguage: (l: LanguageCode) => void
  t: (key: string) => string
  a11y: A11yState
  toggleA11y: (key: keyof A11yState) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<PersonaId>('student')
  const [language, setLanguage] = useState<LanguageCode>('en')
  const [a11y, setA11y] = useState<A11yState>({
    dark: false,
    largeText: false,
    highContrast: false,
    simpleMode: false,
    voiceNav: false,
  })

  const toggleA11y = (key: keyof A11yState) =>
    setA11y((prev) => ({ ...prev, [key]: !prev[key] }))

  // Apply global classes for accessibility + dark mode
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', a11y.dark)
    root.classList.toggle('a11y-large-text', a11y.largeText)
    root.classList.toggle('a11y-contrast', a11y.highContrast)
  }, [a11y.dark, a11y.largeText, a11y.highContrast])

  const t = useMemo(() => {
    return (key: string) => T[language]?.[key] ?? T.en[key] ?? key
  }, [language])

  const value: AppContextValue = {
    persona,
    setPersona,
    language,
    setLanguage,
    t,
    a11y,
    toggleA11y,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
