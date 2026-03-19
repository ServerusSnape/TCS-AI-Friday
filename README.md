# 🚀 DevGrow — AI-Powered Career Growth Platform

An intelligent career development platform that uses AI (Claude by Anthropic) to help professionals — developers, QA engineers, data analysts, designers, and more — assess skills, prepare for interviews, build learning roadmaps, and discover career paths.

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.18-blue?logo=express)
![Anthropic](https://img.shields.io/badge/AI-Claude%20by%20Anthropic-purple)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **📊 Skill Assessment** | 10-question AI-generated MCQ quiz with animated SVG scorecard, grade, and category breakdown |
| **🗺️ Learning Roadmap** | Interactive timeline with phases, topics, resources, projects, and milestone checklists |
| **📄 Resume Analyzer** | ATS score gauge, section-by-section analysis, missing keywords, and rewritten bullet points |
| **🎤 Mock Interview** | 5-question structured interview with per-answer feedback and radar chart report |
| **🧭 Career Path Recommender** | Multi-select skill/interest form → 3 career paths with match %, salary, demand, and first steps |
| **📈 Progress Dashboard** | Chart.js-powered dashboard tracking your scores and activity over time |

### Supported Roles
Not just for developers! Includes roles for:
- **Development** — Frontend, Backend, Full Stack, Mobile, DevOps, AI/ML
- **Quality & Testing** — QA Engineer, Automation Tester, SDET, Performance Tester
- **Data & Analytics** — Data Analyst, Data Engineer, BI Analyst
- **Design & Product** — UI/UX Designer, Product Manager
- **Security & Cloud** — Cybersecurity Analyst, Cloud Engineer, Network Engineer
- **Management** — Engineering Manager, Scrum Master, Technical Writer

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Anthropic API Key](https://console.anthropic.com/settings/keys)

---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/devgrow.git
cd devgrow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the project root:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=3000
```

> 🔑 Get your API key from [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)

### 4. Start the server

```bash
npm start
```

### 5. Open in browser

Navigate to **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Project Structure

```
devgrow/
├── server/
│   ├── index.js              # Express server & route setup
│   ├── claude.js             # Anthropic Claude API wrapper
│   └── routes/
│       ├── ai.js             # General AI chat & roadmap routes
│       ├── assessment.js     # Skill quiz generation & evaluation
│       ├── resume.js         # Resume analysis routes
│       ├── interview.js      # Mock interview routes
│       └── career.js         # Career path recommendation routes
├── client/
│   ├── index.html            # Home page with dashboard
│   ├── skill-assessment.html # Quiz & scorecard UI
│   ├── learning-roadmap.html # Interactive timeline UI
│   ├── resume-analyzer.html  # Split-screen resume analysis UI
│   ├── mock-interview.html   # Interview simulation UI
│   └── career-path.html      # Career recommender UI
├── components/
│   └── navbar.js             # Shared navbar, footer, utilities
├── public/
│   └── styles.css            # Global styles (dark theme)
├── .env                      # API keys (not committed)
├── .gitignore
├── package.json
└── README.md
```

---

## 🎨 Tech Stack

- **Backend:** Node.js, Express 4.18
- **AI:** Anthropic Claude (claude-sonnet-4-20250514)
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Charts:** Chart.js 4.4 (CDN)
- **Theme:** Custom dark theme (#0f0f1a / #6c63ff / #00d4ff)

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm` not recognized | Make sure Node.js is installed and added to PATH. Restart your terminal. |
| API errors / empty responses | Check that your `.env` file has a valid `ANTHROPIC_API_KEY` |
| Port already in use | Change `PORT=3001` in `.env` or stop the other process |
| Windows PowerShell blocks `npm` | Use `npm.cmd` instead, or run from Command Prompt (cmd) |

---

## 📄 License

MIT License — feel free to use, modify, and share.
