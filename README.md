# ISL Connect — Frontend MVP

A frontend for real-time Indian Sign Language (ISL) → text communication, built for a Smart India Hackathon submission. Built with **React 18 + TypeScript + Vite**, styled with **Tailwind CSS**, and using only the libraries specified in the project's todo list: Headless UI, Heroicons, axios, zod, react-hook-form, date-fns, i18next/react-i18next, and react-router-dom.

The recognition backend isn't built yet, so this frontend ships with a **built-in mock recognizer** — it's fully clickable and demoable today. Point one environment variable at your real backend when it's ready and the mock switches off automatically.

---

## 1. Prerequisites (install these first)

| Requirement | Version | Check with |
|---|---|---|
| **Node.js** | 18.x or 20.x (LTS) | `node -v` |
| **npm** | 9+ (ships with Node) | `npm -v` |
| A modern browser | Chrome, Edge, or Safari (latest) | — camera capture (`getUserMedia`/`MediaRecorder`) needs a modern engine |
| **HTTPS or `localhost`** | — | Browsers only allow camera access on secure origins. `localhost` is exempt, so local dev works out of the box; if you deploy to a real domain, it must be served over HTTPS. |

Don't have Node? Install it from [nodejs.org](https://nodejs.org) (pick the LTS version) or via `nvm`:
```bash
nvm install 20
nvm use 20
```

No other global tools are required — no CLI installs, no native build tools.

---

## 2. Setup

```bash
# 1. Unzip / clone the project, then move into it
cd isl-frontend

# 2. Install dependencies
npm install

# 3. (Optional) configure a real backend
cp .env.example .env
# edit .env and set VITE_API_BASE_URL if you have a recognition backend running
# leave it blank to keep using the built-in mock recognizer

# 4. Start the dev server
npm run dev
```

Open the printed local URL (default `http://localhost:5173`). Your browser will ask for camera permission the first time you click **Turn on camera** — allow it.

---

## 3. Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Type-check with `tsc` then build a production bundle to `dist/` |
| `npm run preview` | Serve the production build locally to sanity-check it |
| `npm run lint` | Run ESLint over `src/` |
| `npm run format` | Format `src/` with Prettier |
| `npm test` | Run the Vitest test suite (jsdom + React Testing Library) |

---

## 4. Connecting the real recognition backend

The frontend expects a backend endpoint at `POST {VITE_API_BASE_URL}/recognize` that accepts:
```json
{ "video": "data:video/webm;base64,...." }
```
and returns:
```json
{ "text": "Hello, how are you?", "confidence": 0.91, "timestamp": "2026-09-27T10:00:00.000Z" }
```
The response is validated with `zod` (`src/types/index.ts`) before it touches the UI, so a malformed response fails safely into the error state instead of crashing the app.

Once `VITE_API_BASE_URL` is set in `.env`, the mock recognizer (`src/services/api.ts`) is bypassed automatically — no code changes needed.

---

## 5. Project structure

```
src/
  components/
    atoms/        Button, InputField, ToggleSwitch, Badge, Avatar, LoadingSpinner, ToastNotification
    molecules/    VideoPreview, CommunicationDisplay, MessageInput (placeholder),
                  ConversationHistory (placeholder), FeedbackButton, ISLDictionary, FavoritesPanel
    layout/       MainLayout, Header, Footer
  pages/          Home, Dictionary, NotFound
  hooks/          useCamera, useSignRecorder, useTheme, useFavorites
  services/       api.ts (axios + zod + mock fallback)
  context/        ToastContext, FavoritesContext
  i18n/           i18next setup + en/hi locale files
  data/           sample ISL dictionary entries
  types/          zod schemas & shared TypeScript types
  test/           Vitest + React Testing Library specs
```

---

## 6. What's implemented vs. placeholder

**Fully working:** camera access & switching, 2–3s clip capture, mocked (swappable) recognition API with retry, all UI states (idle/recording/processing/result/error/permission-denied/unsupported), share, favorites (localStorage), dark/light theme (system-aware + manual override), English/Hindi language switch, searchable ISL dictionary, feedback form → pre-filled email, full keyboard/screen-reader accessibility pass.

**Intentional placeholders** (as scoped in the todo list, for future work): `MessageInput` (text/speech reply) and `ConversationHistory` (full transcript log) are visually present but disabled — they're wired up as soon as that feature is prioritized. Confidence indicator is shown but not yet backend-tuned. Cypress e2e tests are not set up (Vitest unit tests are).

---

## 7. Accessibility notes

- Skip-to-content link, visible 2px focus rings on every interactive element, ARIA labels on all icon-only buttons
- Color contrast checked against WCAG 2.1 AA in both themes
- All dialogs (Feedback, Favorites) are keyboard-navigable and trap focus (Headless UI)
- Respects `prefers-reduced-motion`
