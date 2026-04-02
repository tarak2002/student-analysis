# 🧠 AI Tutor — Cognitive Assessment & Personalized Learning Plan Generator

A Proof-of-Concept system that assesses a student's cognitive understanding of **Solving Linear Equations**, diagnoses specific learning difficulties, and generates a tailored, actionable learning plan.

## 🚀 Quick Start

1. **Open the application** — Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).

   Or serve it locally:
   ```bash
   npx serve .
   ```
   Then open `http://localhost:3000`

2. **No setup required** — No backend, no API keys, no dependencies. Everything runs client-side.

## 🎯 Features

### Three Modes of Operation

| Mode | Description |
|------|-------------|
| **✏️ Take Assessment** | Interactive adaptive assessment with 20 questions across 4 difficulty levels |
| **👁️ View Demo Results** | Instantly see diagnosis & learning plan for a sample student |
| **👩‍🏫 Educator Dashboard** | Aggregated view of 20 sample students with heatmaps, charts, and detail modals |

### Adaptive Difficulty
- Questions start at **Level 1** (one-step equations)
- Students who score ≥60% unlock the next level
- Up to **Level 4** (parentheses, distribution, variables on both sides)
- Struggling students stay focused on fundamentals

### Cognitive Diagnosis (6 Types)
| Code | Difficulty | Example |
|------|-----------|---------|
| D1 | Word Problem Interpretation | "twice as much" → adds instead of multiplies |
| D2 | Procedural Error (Isolation) | Subtracts instead of divides |
| D3 | Sign/Arithmetic Errors | −3x = 9 → x = 3 instead of x = −3 |
| D4 | Foundational Gap | Treats x as a label, not a value |
| D5 | Order of Operations | Divides before subtracting in 2x + 3 = 7 |
| D6 | Inverse Operation Confusion | Adds when should subtract |

### Personalized Learning Plans
- Targeted remediation strategies for each diagnosed difficulty
- Specific activities with estimated completion times
- Resource recommendations (videos, worksheets, interactive tools)
- Progress tracking with re-assessment suggestions

## 📁 Project Structure

```
├── index.html              # Main application (single-page app)
├── css/
│   └── styles.css          # Light theme design system
├── js/
│   ├── app.js              # Application controller & UI logic
│   └── charts.js           # Canvas-based chart library
├── data/
│   ├── questions.js        # 20 curated assessment questions
│   └── sample-responses.js # 20 sample student profiles
├── engine/
│   ├── analyzer.js         # Cognitive diagnosis engine
│   └── planner.js          # Learning plan generator
├── README.md               # This file
└── REPORT.md               # Methodology & findings report
```

## 🔧 Technology Stack

- **HTML5** — Semantic structure with SEO best practices
- **CSS3** — Custom design system with CSS variables, glassmorphism, animations
- **Vanilla JavaScript** — No frameworks or libraries
- **Canvas API** — Lightweight charts (score rings, radar, bar, donut)

## 📊 How the Assessment Engine Works

1. **Answer Matching** — Compares student answer to correct answer and a library of known wrong-answer patterns
2. **Pattern Recognition** — Each wrong answer maps to specific difficulty types with confidence scores
3. **Fallback Inference** — When no pattern matches, analyzes answer characteristics (sign errors, equation numbers, magnitude)
4. **Aggregation** — Across all responses, accumulates difficulty signals and calculates severity levels
5. **Plan Generation** — Maps diagnosed difficulties to a curated knowledge base of remediation strategies

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License

This is a POC project for educational purposes.
