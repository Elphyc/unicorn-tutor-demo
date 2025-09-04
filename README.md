# Unicorn Tutor — Chat UI Demo

A small Vite + React + TypeScript demo that implements the client brief: a responsive chat view with text messaging, a reimagined voice recording control, and a mode toggle (Text + Speak vs. Speak Only). The visual treatment replaces the black‑shaded elements from the brief with a soft lavender/sakura theme.

## Quick Start
- Prereqs: Node 18+ and npm.
- Install: `npm install`
- Dev server: `npm run dev` then open the printed URL
- Build: `npm run build`
- Preview build: `npm run preview`

## How To Use
- Send a message: type in the input and press Enter or click the paper plane.
- Auto‑reply: an AI response is appended after each user message (hardcoded string).
- Record audio: click the circular mic button to start; click again to stop and auto‑play the recording. Grant microphone permission when prompted.
- Speaking indicator: during recording, the mic glows and sakura petals animate based on input level.
- Toggle modes: use the “Text and Speak” / “Speak Only” toggle. In Speak Only, the text input is hidden and the mic centers. The last selected mode is remembered per browser via `localStorage`.

## Features Mapped To Brief
- Design adherence: responsive layout; colors/positions follow the spirit of the Figma. Black‑shaded elements are reimagined with gradients and floral motifs (chat bubbles, mic button, toggle).
- Chat flow: new user bubble + trailing assistant bubble, with history auto‑scroll and top‑fade when overflowing.
- Recording: start/stop via MediaRecorder; playback of the recorded clip; graceful fallback to file download if autoplay is blocked.
- Speaking visual: animated glow + procedurally arranged sakura petals that react to microphone level.
- Mode switch: Text + Speak and Speak Only modes adjust layout and visibility.
- Mobile: simplified single‑column layout and adjusted avatar sizing on small screens.

## Tech Stack
- Vite, React 19, TypeScript
- Plain CSS modules (no runtime CSS frameworks)
- Web Media APIs: `MediaRecorder`, `getUserMedia`, `AudioContext`/`AnalyserNode`

## Project Structure
- App shell: `src/App.tsx`, `src/main.tsx`
- Chat UI: `src/components/ChatArea.tsx` (history, input, mic, mode)
- Chat parts: `src/components/chat/*` (history, text send, mic button, mode toggle, types)
- Styles: `src/styles/*` (layout, chat, mic animations, responsive rules)
- Assets: `src/assets/*` (avatar, petals, accents)

## Notes & Limitations
- Microphone: requires HTTPS in production and user permission. Desktop Chrome, Edge, and Firefox are tested; Safari works but may behave differently with autoplay.
- AI response: intentionally hardcoded for the exercise.
- Accessibility: controls have labels/roles, buttons are keyboard‑focusable, and Enter submits in text mode.

## Reasoning Highlights
- Reimagined elements: replaced black areas with a lavender gradient for assistant bubbles and a sakura‑themed mic that conveys state and input level without heavy UI chrome.
- Motion as feedback: subtle mic glow and petal density scale with RMS of the mic input for a playful but readable speaking indicator.
- Mode persistence: lightweight `localStorage` keeps the last chosen mode to reduce friction when revisiting.
