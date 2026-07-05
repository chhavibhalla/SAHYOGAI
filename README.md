# Sahyog AI · Agentic AI Banking

> A next-generation, **Agentic AI** concept UI for digital banking — built for a hackathon.
> **Unofficial** demonstration. Not affiliated with State Bank of India.

Sahyog AI reimagines digital banking as **proactive** instead of reactive. The AI observes
the user's journey through telemetry, detects where they struggle, and steps in to help —
while the dashboard **adapts to who the user is** (Student, Senior Citizen, Working
Professional, or Business Owner).

---

## ✨ Highlights

- **🎭 Dynamic Persona Space** — one section of the dashboard re-composes itself per persona
  (with skeleton-load + spring animations); the rest of the banking stays exactly where users expect it.
- **🤖 Floating AI Assistant** — animated agent avatar, voice + text, typing indicator,
  suggested prompts, multi-language replies.
- **🧠 Live AI Insight Panel** — shows the agent's current intent, confidence ring,
  detected problem, and suggested resolution in real time.
- **📊 Agentic Telemetry Timeline** — animated node trace of the user's journey up to the
  moment the AI decides to intervene.
- **🔔 Smart Proactive Alerts** — KYC expiry, life-stage nudges, FD maturity, and more.
- **🌐 Multi-language** — English, हिन्दी, ਪੰਜਾਬੀ, தமிழ், मराठी (chatbot replies switch too).
- **♿ Accessibility** — Dark Mode, Large Text, High Contrast, Voice Navigation, Simple Mode.
- **📈 Analytics** — journey funnel, AI success trend, feature usage, drop-off donut.
- **🤝 Human Escalation** — chat, video call, callback, nearby branch.

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS** (custom SBI design tokens)
- **Framer Motion** (animations)
- **Lucide React** (outlined icons)
- **Vite** (build tooling)
- No backend — fully mock-data driven.

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run preview  # preview the build
```

## 📁 Structure

```
src/
├── components/
│   ├── layout/         # TopNav, BottomNav, language, notifications
│   ├── hero/           # Balance card, virtual card, transactions
│   ├── persona/        # Dynamic persona widget space
│   ├── ai/             # Assistant, telemetry, insight, alerts, avatar
│   ├── analytics/      # Charts & metrics
│   ├── support/        # Human banker escalation
│   ├── accessibility/  # Accessibility drawer
│   └── ui/             # Shared UI (logo, ambient bg, headings)
├── context/            # Global app state (persona, language, a11y)
├── data/               # Mock data
├── i18n/               # Translations
├── hooks/              # Reusable hooks
├── lib/                # Design tokens / helpers
└── types/              # Shared TypeScript types
```

---

<p align="center"><em>Built to showcase the future of proactive, persona-aware digital banking.</em></p>
