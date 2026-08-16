# WISECRAFT

> **Learn. Build. Prosper.**

WISECRAFT is an AI-powered financial education and entrepreneurship platform built by **Trendorafinds**. It helps people learn practical skills, discover opportunities, improve financial literacy, build businesses, and increase income through personalized AI guidance.

---

## What WISECRAFT Is

- **AI Growth Mentor** — Personalized guidance to help you grow
- **Skill Builder** — Practical courses on entrepreneurship, investing, and digital skills
- **Opportunity Finder** — Discover ways to increase your income
- **Progress Tracker** — Monitor your learning and financial milestones

## What WISECRAFT Is Not

- ❌ Not a cryptocurrency app
- ❌ Not a banking app
- ❌ Not a budgeting app

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework with App Router |
| [React 18](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Firebase](https://firebase.google.com/) | Authentication & database |
| [Lucide React](https://lucide.dev/) | Icon library |

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Firebase project (for authentication)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/wisecraft.git
cd wisecraft

# Install dependencies
npm install

# Set up Firebase
# 1. Create a Firebase project at https://console.firebase.google.com/
# 2. Enable Email/Password authentication
# 3. Copy your Firebase config to .env.local:
#    NEXT_PUBLIC_FIREBASE_API_KEY=...
#    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
#    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
#    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
#    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
#    NEXT_PUBLIC_FIREBASE_APP_ID=...

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
wisecraft/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Splash screen (auth-aware)
│   │   ├── layout.tsx       # Root layout with providers
│   │   ├── welcome/         # Welcome/onboarding screen
│   │   ├── signup/          # Firebase registration
│   │   ├── signin/          # Firebase login + forgot password
│   │   ├── dashboard/       # Main hub (protected)
│   │   ├── learn/           # Course catalog (search, filters)
│   │   ├── mentor/          # AI chat interface (sessions, insights)
│   │   ├── progress/        # Growth tracking (timeline, streaks)
│   │   ├── profile/         # User settings (logout, preferences)
│   │   ├── error.tsx        # Error boundary
│   │   ├── not-found.tsx    # 404 page
│   │   └── loading.tsx      # Global loading state
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Logo.tsx
│   │   ├── layout/          # Layout components
│   │   │   └── Navbar.tsx
│   │   ├── skeletons/       # Loading skeletons
│   │   │   ├── DashboardSkeleton.tsx
│   │   │   ├── CardSkeleton.tsx
│   │   │   └── ChatSkeleton.tsx
│   │   └── empty-states/    # Empty/error states
│   │       ├── EmptyState.tsx
│   │       └── ErrorState.tsx
│   ├── context/             # React Context providers
│   │   ├── AuthContext.tsx   # Firebase auth state
│   │   ├── UserContext.tsx   # User profile state
│   │   └── ThemeContext.tsx  # Dark/light mode
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuthGuard.ts  # Route protection
│   │   ├── useAsync.ts      # Async operation handler
│   │   └── useLocalStorage.ts # Persistent state
│   ├── services/            # Business logic layer
│   │   ├── ai.service.ts     # AI response generation (mock)
│   │   ├── mentor.service.ts # Mentor session management
│   │   └── knowledge.service.ts # Content retrieval
│   ├── repositories/        # Data access layer
│   │   └── course.repository.ts # Course data (repository pattern)
│   ├── lib/
│   │   ├── utils.ts         # Utility functions
│   │   └── firebase/        # Firebase configuration
│   │       ├── config.ts
│   │       └── auth.ts
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   └── data/                # Mock data (if needed)
├── public/                  # Static assets
│   ├── logo.jpg
│   └── favicon.jpg
├── .github/workflows/        # CI/CD
│   └── ci.yml
├── .vscode/                 # Editor settings
│   ├── settings.json
│   └── extensions.json
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── .env.local.example
├── .gitignore
├── .editorconfig
├── .nvmrc
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## Architecture

### Authentication Flow

```
User → Sign Up/Sign In → Firebase Auth → AuthContext → Protected Routes
```

### State Management

| Context | Purpose |
|---------|---------|
| `AuthContext` | Firebase auth state, login/logout/signup |
| `UserContext` | Extended profile, preferences, stats |
| `ThemeContext` | Dark/light mode with system preference |

### Data Flow

```
UI → Service → Repository → (Mock Data / Future API)
```

- **Services**: Business logic, AI responses, content retrieval
- **Repositories**: Data access abstraction, ready for API swap

---

## Features

### Sprint 1 (Foundation)

- ✅ Splash screen with auto-navigation
- ✅ Welcome screen with feature highlights
- ✅ Sign up / Sign in forms
- ✅ Dark / light mode toggle
- ✅ Responsive mobile-first design
- ✅ Reusable UI component library
- ✅ 9 complete screens

### Sprint 2 (Production-Ready)

- ✅ **Firebase Authentication** — Email sign up, sign in, forgot password, session persistence, logout
- ✅ **Protected Routes** — Auth guards redirect unauthenticated users
- ✅ **AI Architecture** — Mock AI service with conversation history, insights, suggested prompts
- ✅ **Knowledge Engine** — Repository pattern for course data, search, filters
- ✅ **Enhanced Dashboard** — Real data fetching, recommendations, trending topics, daily insights
- ✅ **Skeleton Loaders** — Shimmer loading states for all screens
- ✅ **Empty States** — Graceful handling when no data is available
- ✅ **Error Boundaries** — Error recovery with retry options
- ✅ **Accessibility** — ARIA labels, keyboard navigation, focus management, reduced motion support
- ✅ **Performance** — Code splitting, lazy loading, optimized imports

---

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#0F172A` | Primary brand, dark backgrounds |
| Emerald | `#10B981` | Success, accent, CTAs |
| Royal Blue | `#3B82F6` | Links, interactive elements |
| Gold | `#F59E0B` | Highlights, achievements |
| Surface | `#F8FAFC` | Light mode background |

### Typography

- **Font Family:** Inter (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700, 800

### Principles

- Premium, minimal, modern aesthetic
- Apple-level simplicity
- Stripe-quality UI
- ChatGPT-level whitespace
- Smooth animations with 16–20px border radius
- Soft shadows, no flashy gradients

---

## Screens

| Route | Description | Auth Required |
|-------|-------------|---------------|
| `/` | Splash screen with auth-aware redirect | No |
| `/welcome` | Onboarding with feature highlights | No (redirects if auth) |
| `/signup` | Firebase account creation | No (redirects if auth) |
| `/signin` | Firebase login + forgot password | No (redirects if auth) |
| `/dashboard` | Main hub with stats, recommendations, activity | Yes |
| `/learn` | Course catalog with search & filters | Yes |
| `/mentor` | AI chat with sessions & insights | Yes |
| `/progress` | Milestones, weekly activity, streaks | Yes |
| `/profile` | Account settings, preferences, logout | Yes |

---

## Environment Variables

Create a `.env.local` file with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

---

## License

MIT License — © 2026 Trendorafinds. All rights reserved.

---

Built with care by the Trendorafinds team.
Updated
