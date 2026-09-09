<div align="center">

# 🧠 XYZ Insta — Neural Social Hub

<p align="center">
  <img src="https://img.shields.io/badge/XYZ%20Insta-Neural%20Social%20Hub-7c3aed?style=for-the-badge" alt="XYZ Insta Badge" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=for-the-badge&logo=javascript&logoColor=black" alt="JS Badge" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4.0-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind Badge" />
  <img src="https://img.shields.io/badge/WebGL-Neural%20UI-6366f1?style=for-the-badge&logo=opengl&logoColor=white" alt="WebGL Badge" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License Badge" />
</p>

**A futuristic, cyber-inspired Instagram alternative powered by real-time interactive WebGL neural shaders and modern glassmorphism UX.**

[Live Demo](#) • [Features](#-features) • [Screenshots](#-screenshots) • [Architecture](#%EF%B8%8F-architecture--project-structure) • [Quick Start](#-quick-start)

---

</div>

## 🌌 Overview

**XYZ Insta — Neural Social Hub** fuses familiar social media mechanics with generative WebGL visuals. Built around a dynamic, particle-reactive neural network background, the platform delivers a high-tech user experience featuring dark glassmorphism components, responsive layout scaling, and full offline client-side data persistence.

> 💡 **Core Philosophy:** Social Media Dynamics × WebGL Generative Visuals × Glassmorphism UX

---

## ✨ Features

| Feature | Description |
| :--- | :--- |
| **🔐 Authentication** | Secure client-side registration, sign-in/sign-out, state validation, and persistent session memory. |
| **👤 Profile Studio** | Customizable display names, bio configuration, avatar updates, and personal media management. |
| **📝 Social Feed** | Interactive feed supporting rich image/text posts, real-time likes, and dynamic relative timestamps. |
| **🧠 Neural Canvas** | High-performance WebGL canvas rendering a reactive particle background with interactive physics. |
| **🎨 Cyber UI/UX** | Dark-mode glassmorphism cards, glowing neon accents, and adaptive layout scaling across modern displays. |
| **🌓 Theme Engine** | Instant light/dark contrast switching across all layout boundaries without reloading state. |

---

## 📸 Screenshots

### 🔐 Access Portal
<div align="center">
  <img src="https://res.cloudinary.com/wpop4xyo/image/upload/v1787929195/Screenshot_2026-08-28_201324.png" width="90%" alt="XYZ Insta Access Portal" style="border-radius: 8px;" />
</div>

<br />

### 👤 Profile Studio
<div align="center">
  <img src="https://res.cloudinary.com/wpop4xyo/image/upload/v1787929135/Screenshot_2026-08-28_201538.png" width="90%" alt="XYZ Insta Profile Studio" style="border-radius: 8px;" />
</div>

---

---⚡ Quick Start
Prerequisites
Node.js (v18.0.0 or higher recommended) 

npm or yarn

```Installation
Clone the repository:

Bash
git clone [https://github.com/your-username/XYZ-Insta-Neural-Social-Hub.git](https://github.com/your-username/XYZ-Insta-Neural-Social-Hub.git)
cd XYZ-Insta-Neural-Social-Hub
Install dependencies:

Bash
npm install
Start the local development server:

Bash
npm run dev
Build for production:

```bash
npm run build 
## 🏗️ Architecture & Project Structure

### 🔄 Data & Execution Flow

```text
 🧠 XYZ INSTA SYSTEM
          │
          ▼
   🔐 AUTHENTICATION
    /             \
Register         Login
    \             /
     ▼           ▼
      👤 PROFILE
          │
          ▼
    📝 CREATE POST
          │
          ▼
       🌐 FEED
    /     │     \
  ❤️     🕒     💾
 Likes  Time  Storage
          │
          ▼
     🧠 NEURAL UI
          │
          ▼
  ✨ USER EXPERIENCE 

## XYZ-Insta-Neural-Social-Hub/
├── 📁 assets/
│   ├── 📁 css/         # Tailwind CSS v4.0 & custom glassmorphism styles
│   ├── 📁 js/          # WebGL canvas shader & app routing logic
│   └── 📁 images/      # Static assets & default avatar presets
├── 📄 index.html        # Main SPA entry point
├── 📄 README.md        # Documentation
└── 📄 package.json     # Dependencies & scripts  

