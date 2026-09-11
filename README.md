# 🎯 FocusMatrix · Eisenhower Matrix Standalone PWA

> A standalone, zero-dependency Progressive Web Application (PWA) centered on the 4-quadrant Eisenhower Matrix prioritization system. Features persistent local storage, customizable recurring alerts, Web Audio synthesized chimes, and tactile mobile vibration feedback.

![PWA Standalone](https://img.shields.io/badge/PWA-Standalone-3b82f6?style=flat-square)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-emerald?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-slate?style=flat-square)

---

## ✨ Features

- **🏛️ 4-Quadrant Eisenhower Matrix**:
  - **Q1: Do First** (Urgent & Important) – Red
  - **Q2: Schedule** (Important & Not Urgent) – Blue
  - **Q3: Delegate** (Urgent & Not Important) – Amber
  - **Q4: Eliminate** (Not Urgent & Not Important) – Slate
- **📱 Standalone Mobile & Desktop Installation**:
  - Operates full-screen without address bars or browser frames.
  - Native home screen installation via Web App Manifest.
  - Offline-first caching via Service Worker.
- **⚡ Recurring Priority Alerts & Mobile Haptics**:
  - Scan intervals (15m, 30m, 1h default, 2h, 4h).
  - Tactile rhythm vibration pulse (`navigator.vibrate([250, 100, 250, 100, 400])`).
  - Web Audio API harmonic chime (pure synthesizer, zero mp3 files).
  - Native Web Notifications summarizing pending Q1 & Q2 tasks.
- **🔄 Frictionless Triage**:
  - One-tap completion & strike-through.
  - Inline title editing (`Enter` to save, `Esc` to cancel).
  - Drag-and-drop between quadrants & quick quadrant shift menus.
  - Quick-capture bar with keyboard shortcut (`/` to focus).
- **💾 Local Storage & Backup**:
  - 100% private: all data stays in your browser's `localStorage`.
  - One-click JSON backup export & restore.
  - Clean completed tasks utility.
- **🌓 Adaptive Theme**: High-contrast dark and light themes with auto-detection.

---

## 🚀 Instant Deployment to GitHub Pages

You can host this entire PWA for free on **GitHub Pages** with a permanent HTTPS URL:

1. Create a new repository on GitHub (e.g., `focus-matrix` or `eisenhower-pwa`).
2. Push this directory to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial release of FocusMatrix Eisenhower PWA"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** $\rightarrow$ **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Select **Branch**: `main`, Folder: `/ (root)`, and click **Save**.
4. In ~60 seconds, GitHub Pages will give you a public HTTPS URL:
   `https://<your-username>.github.io/<your-repo-name>/`

---

## 📲 How to Install on Your Devices

Once published to GitHub Pages (or opened locally via HTTPS):

- **📱 Android (Chrome)**: Tap the 3-dot menu `⋮` $\rightarrow$ **"Install app"** or **"Add to Home screen"**.
- **🍏 iOS (Safari)**: Tap the **Share** button $\rightarrow$ **"Add to Home Screen"**.
- **💻 Desktop (Chrome / Edge / Brave)**: Click the **"Install"** button in the app header or the install icon in the browser address bar.

---

## 📂 File Architecture

```
├── index.html       # Complete application (UI, styles, logic, Web Audio, haptics)
├── manifest.json    # PWA configuration (standalone mode, portrait, theme colors)
├── sw.js            # Service worker (offline asset cache & notification handling)
├── icon.svg         # High-resolution vector 4-quadrant app icon
├── server.py        # Local Python server for offline/desktop development
└── README.md        # Documentation & deployment guide
```

---

## 🔒 Privacy & Independence

- Zero tracking, analytics, or external API dependencies.
- Works 100% offline once cached by the Service Worker.
- MIT License.
