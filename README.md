<div align="center">

# 🧠 AuraGen

### *AI-Powered Self-Healing User Interface*

*Transforming static interfaces into adaptive experiences through cognitive load detection and Generative AI.*

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai)

</div>

---

## 📖 Overview

**AuraGen** is an AI-powered adaptive user interface that detects when users struggle with complex forms and dynamically transforms the interface into a simpler, more intuitive experience.

Instead of forcing users to seek help through documentation or chatbots, AuraGen observes interaction patterns such as hesitation, repeated clicks, and validation errors to estimate **cognitive load**. When frustration is detected, the system leverages Generative AI to redesign the interface in real time while preserving the user's progress.

---

## ✨ Key Features

- 🧠 **Cognitive Load Detection**
  - Tracks user interaction patterns
  - Measures hesitation, repeated clicks, and validation errors

- ⚡ **Real-Time Adaptation**
  - Detects friction instantly
  - Triggers UI transformation without refreshing the page

- 🤖 **AI-Powered UI Generation**
  - Uses Generative AI to simplify complex forms
  - Converts lengthy forms into guided workflows

- 🔄 **Live Communication**
  - Real-time frontend ↔ backend communication using WebSockets

- 🎨 **Smooth User Experience**
  - Fluid UI transitions
  - Preserves previously entered form data

---

## 🏗️ Project Architecture

```text
                User
                  │
                  ▼
        Financial Form (Next.js)

                  │
        Interaction Telemetry
                  │
                  ▼
      Cognitive Load Calculator
                  │
      High Cognitive Load?
          │            │
         No           Yes
          │            ▼
          │     Backend (Express)
          │            │
          │            ▼
          │      Generative AI
          │            │
          ▼            ▼
 Continue Form    Adaptive UI
```

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form

### Backend

- Node.js
- Express.js
- Socket.IO
- TypeScript

### AI

- OpenAI API
- Prompt Engineering

### Development

- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```text
AuraGen/

├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/AuraGen.git
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🧩 Core Modules

### 📊 Telemetry Engine

Captures user interaction metrics including:

- Mouse movement
- Cursor hesitation
- Repeated clicks
- Validation failures
- Typing behavior

---

### 🧠 Cognitive Load Engine

Processes telemetry data to estimate user frustration and determines when the interface should adapt.

---

### 🤖 AI Adaptation Engine

Generates a simplified interface tailored to the user's current interaction context.

---

### 🎨 Dynamic UI Renderer

Renders the AI-generated interface while maintaining application state and providing seamless transitions.

---

## 🎯 Current Development Status

- [x] Project Setup
- [x] Frontend Initialization
- [x] Backend Initialization
- [ ] Financial Form
- [ ] Telemetry Tracking
- [ ] Cognitive Load Detection
- [ ] WebSocket Integration
- [ ] AI Integration
- [ ] Adaptive UI Rendering
- [ ] Final Testing

---

## 🌟 Future Enhancements

- Personalized UI adaptation
- Accessibility-aware interface generation
- Multi-language support
- Predictive assistance
- User behavior analytics dashboard

---

## 👩‍💻 Author

**Disha**

Built as an AI-focused internship project exploring adaptive interfaces, cognitive computing, and Generative AI.

---

<div align="center">

### ⭐ If you find this project interesting, consider giving it a star!

**AuraGen — Building interfaces that understand people.**

</div>
