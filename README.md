<div align="center">

# 🧠 AuraGen

### *An AI-Powered Self-Healing User Interface*

<p align="center">
Transforming complex user experiences into intuitive workflows through<br>
<b>Cognitive Load Detection</b> and <b>Generative AI</b>.
</p>

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express)
![LangChain](https://img.shields.io/badge/LangChain-00A67E?style=flat-square)
![Ollama](https://img.shields.io/badge/Ollama-000000?style=flat-square)

</p>

</div>

---

## ✨ What is AuraGen?

AuraGen is an experimental AI-powered interface that understands when users struggle with complex workflows.

Instead of displaying tooltips or redirecting users to documentation, AuraGen observes interaction behavior, estimates cognitive load, and dynamically transforms the interface into a simpler, guided experience—all while preserving the user's progress.

---

## 🚀 Features

- 🧠 Cognitive Load Detection
- 🖱️ Real-Time Interaction Tracking
- 🤖 AI-Generated Adaptive UI
- 🔄 Live Interface Transformation
- ⚡ WebSocket Communication
- 🎨 Smooth UI Morphing
- 🛡️ Secure Component Validation

---

## ⚙️ Tech Stack

| Frontend | Backend | AI |
|----------|----------|------|
| Next.js | Node.js | LangChain |
| React | Express | Ollama |
| TypeScript | Socket.IO | Llama 3.2 |
| Tailwind CSS | TypeScript | Prompt Engineering |

---

## 🏗 Architecture

```text
User
 │
 ▼
Financial Form
 │
 ▼
Telemetry Engine
 │
 ▼
Cognitive Load Score
 │
 ▼
LangChain Agent
 │
 ▼
Ollama
 │
 ▼
Adaptive UI Generator
 │
 ▼
Dynamic React Rendering
```

---

## 📂 Project Structure

```text
AuraGen/
│
├── 📁 frontend/
│   │
│   ├── 📁 public/                  # Static assets
│   │
│   ├── 📁 src/
│   │   │
│   │   ├── 📁 app/                 # Next.js App Router
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── globals.css
│   │   │   └── favicon.ico
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── 📁 forms/
│   │   │   │   ├── FinancialForm.tsx
│   │   │   │   └── WizardForm.tsx
│   │   │   │
│   │   │   ├── 📁 telemetry/
│   │   │   │   ├── TelemetryPanel.tsx
│   │   │   │   └── CognitiveScore.tsx
│   │   │   │
│   │   │   ├── 📁 ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   └── Loader.tsx
│   │   │   │
│   │   │   └── Navbar.tsx
│   │   │
│   │   ├── 📁 hooks/
│   │   │   ├── useTelemetry.ts
│   │   │   ├── useCognitiveLoad.ts
│   │   │   └── useSocket.ts
│   │   │
│   │   ├── 📁 lib/
│   │   │   ├── socket.ts
│   │   │   └── constants.ts
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── telemetry.service.ts
│   │   │   ├── ai.service.ts
│   │   │   └── api.ts
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── calculateScore.ts
│   │   │   ├── validators.ts
│   │   │   └── helpers.ts
│   │   │
│   │   ├── 📁 types/
│   │   │   ├── telemetry.ts
│   │   │   ├── ai.ts
│   │   │   └── form.ts
│   │   │
│   │   └── 📁 styles/
│   │       └── animations.css
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
│
│
├── 📁 backend/
│   │
│   ├── 📁 src/
│   │   │
│   │   ├── 📁 config/
│   │   │   ├── env.ts
│   │   │   └── ollama.ts
│   │   │
│   │   ├── 📁 routes/
│   │   │   ├── ai.routes.ts
│   │   │   └── telemetry.routes.ts
│   │   │
│   │   ├── 📁 controllers/
│   │   │   ├── ai.controller.ts
│   │   │   └── telemetry.controller.ts
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── ai.service.ts
│   │   │   ├── telemetry.service.ts
│   │   │   └── websocket.service.ts
│   │   │
│   │   ├── 📁 agents/
│   │   │   ├── codeGeneration.agent.ts
│   │   │   ├── promptTemplates.ts
│   │   │   └── langchain.ts
│   │   │
│   │   ├── 📁 compiler/
│   │   │   ├── astValidator.ts
│   │   │   ├── parser.ts
│   │   │   └── sanitizer.ts
│   │   │
│   │   ├── 📁 websocket/
│   │   │   └── socket.ts
│   │   │
│   │   ├── 📁 middleware/
│   │   │   ├── errorHandler.ts
│   │   │   └── logger.ts
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── calculateScore.ts
│   │   │   └── helpers.ts
│   │   │
│   │   ├── 📁 types/
│   │   │   ├── telemetry.ts
│   │   │   ├── ai.ts
│   │   │   └── websocket.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── 📁 docs/
│   ├── architecture.png
│   ├── screenshots/
│   ├── demo.gif
│   └── flow-diagram.png
│
├── .gitignore
├── LICENSE
├── README.md
└── package.json (optional, if using npm workspaces)
```

## 🚧 Project Status

> This project is currently under active development as part of an AI-focused internship.

### Completed

- ✔ Project Setup
- ✔ Frontend Initialization
- ✔ Backend Initialization

### In Progress

- 🚧 Financial Form
- 🚧 User Telemetry
- 🚧 Cognitive Load Engine

### Upcoming

- ⏳ LangChain Integration
- ⏳ Ollama Integration
- ⏳ Dynamic UI Generation
- ⏳ AST Validation

---

## 👩‍💻 Developer

**Disha Agarwalla**

**GitHub**  
https://github.com/DishaAgarwalla

**LinkedIn**  
https://www.linkedin.com/in/disha-agarwalla-10884b31b/

---

<div align="center">

⭐ If you like this project, consider giving it a star.

</div>
