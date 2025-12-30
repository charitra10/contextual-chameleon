# 🦎 Contextual Chameleon
### The Forum That Shapeshifts.

**Hackathon Track:** ⚡ AI & Intelligence / 🔧 Migration & Utility

![Project Banner](https://via.placeholder.com/1200x400?text=Contextual+Chameleon+Banner)

## 💡 The Problem
Traditional forums force every conversation into the same rigid box.
- A **Developer** debugging code needs syntax highlighting and copy buttons.
- A **Photographer** showcasing work needs a masonry grid and large visuals.
- A **Debate** on politics needs a split-screen view to weigh arguments.

Most platforms treat these data types exactly the same. We fix that.

## 🚀 The Solution
**Contextual Chameleon** is a Next.js application that uses **Generative AI** to analyze the *context* of a discussion and instantly transforms the **User Interface** to match the content.

It combines the raw data power of a **Headless Backend (Foru.ms)** with the dynamic design capabilities of **Generative UI (v0)**.

## ✨ Key Features

### 1. Dynamic Layout Switching (The "Chameleon" Engine)
The app detects the topic intent and serves a bespoke React component:
* **👨‍💻 DEV_STACK Mode:** StackOverflow-style layout. Auto-expands code blocks, adds "Copy" buttons, and highlights technical syntax.
* **⚖️ DEBATE Mode:** Split-screen arena. Separates arguments into "Side A" vs "Side B" for clear comparison.
* **🎨 SHOWCASE Mode:** Pinterest-style masonry grid. Prioritizes images over text for visual storytelling.
* **📋 COLLAB Mode:** Kanban/Checklist view for project planning (Roadmap).

### 2. AI "Brain" Classification
* Uses **OpenAI (GPT-4o)** to read the thread content and return a JSON classification with confidence scores.
* "Explainable AI" feature tells the user *why* a specific layout was chosen.

### 3. Human-in-the-Loop Override
* Users can manually override the AI's choice via a UI dropdown.
* The system learns from these overrides to improve future accuracy.

## 🛠️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Shadcn UI
* **AI Logic:** OpenAI API
* **Generative UI:** [v0 by Vercel](https://v0.dev/) (Used to generate the React component layouts)
* **Backend:** [Foru.ms](https://foru.ms/) API (Headless Forum Data)

---

## 📸 Screenshots & Modes

| **DEV_STACK** | **DEBATE_SPLIT** |
|:---:|:---:|
| ![Dev Mode](https://via.placeholder.com/400x200?text=Dev+Mode+Preview) | ![Debate Mode](https://via.placeholder.com/400x200?text=Debate+Mode+Preview) |
| *Optimized for Code* | *Optimized for Conflict* |

---

## 🏁 Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/contextual-chameleon.git](https://github.com/yourusername/contextual-chameleon.git)
cd contextual-chameleon
