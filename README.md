# ISH‑Investopedia

ISH‑Investopedia explains the major types of investments and guides a user through one selected type, including pros, cons, and key things to look out for before investing.

## Tech Stack
- HTML5
- CSS3 (Flexbox, Grid, gradients, shadows)
- Vanilla JavaScript (no frameworks)

## Features
- Overview of common investment types (clickable cards)
- Guided deep dive for a selected type:
  - Overview
  - Pros and cons
  - What to look out for
- Prompt input for natural questions (e.g., “Tell me about bonds” or “What are investment types?”)

## Run Locally
1. Clone the repo:
   ```bash
   gh repo clone <your-username>/ISH-Investopedia
   # or
   git clone https://github.com/<your-username>/ISH-Investopedia.git
   ```
2. Start a local server (Python recommended):
   ```bash
   cd ISH-Investopedia
   python3 -m http.server 8000
   ```
3. Open http://localhost:8000/ in your browser.

## Project Structure
```
ISH-Investopedia/
├─ index.html
├─ styles.css
├─ app.js
└─ README.md
```

## Notes
- Educational content only; not financial advice
- Purely static app; no backend or storage dependencies

