# 🦎 Contextual Chameleon
### The Forum That Shapeshifts.

**Hackathon Track:** ⚡ AI & Intelligence



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
* **👨‍💻 DEV_STACK Mode**
* **⚖️ DEBATE Mode**
* **🎨 SHOWCASE Mode**


### 2. AI "Brain" Classification
* Uses **llama 3.2** to read the thread content and return a JSON classification with confidence scores.
* "Explainable AI" feature tells the user *why* a specific layout was chosen.

### 3. Human-in-the-Loop Override
* Users can manually override the AI's choice via a UI dropdown.
* The system learns from these overrides to improve future accuracy.

## 🛠️ Tech Stack

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Shadcn UI
* **AI Logic:** llama 3.2
* **Generative UI:** [v0 by Vercel](https://v0.dev/) (Used to generate the React component layouts)
* **Backend:** [Foru.ms](https://foru.ms/) API (Headless Forum Data)

---



## 🏁 Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/contextual-chameleon.git](https://github.com/yourusername/contextual-chameleon.git)
cd contextual-chameleon
