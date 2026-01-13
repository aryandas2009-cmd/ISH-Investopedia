# ISH‑Investopedia

ISH‑Investopedia helps new investors learn different investment types and see simple, simulated trend analysis. Ask questions in plain English, pick from sample prompts, and view results clearly on the right pane with quick feedback.

## Goal
- Provide simple, repeatable steps to recreate and run ISH‑Investopedia
- Make setup novice‑friendly with clear, copy‑paste commands

## What It Is
- A static, client‑side app that teaches investment basics and shows simulated trends
- No backend or databases required; runs in any web browser

## Project Steps (for repeatability)
- Plan flows: left pane for inputs; right pane for results and feedback
- Scaffold pages: index.html, styles.css, app.js
- Add investment types and guided details: overview, pros, cons, factors, risks
- Add chat and sample questions; “Send” button and Enter key support
- Add simulated 5‑year trend chart for symbols/assets via header prompt
- Add predictive outlook via chat (“predictive trend for MSFT”) with:
  - Market context, scenario targets, growth projections, risks
  - Compact forecast chart and configurable scenario weights
- Refine UX: left = inputs only; right = results only; scrollable right pane
- Add thumbs feedback (localStorage); remove duplicate inputs; update README

## Tech Stack
- HTML5
- CSS3 (Flexbox, Grid, gradients, shadows)
- Vanilla JavaScript (no frameworks)

## Features
- Free‑text chat (top‑left) and sample questions to learn investing
- Quick Options to choose investment types (left pane)
- Header prompt supports symbol/asset trend (e.g., MSFT, IBM, GOOGL, Bitcoin)
- Right pane displays:
  - Overview in plain language
  - Pros and cons
  - Factors to consider (what to look out for)
  - Risks and issues
  - Simulated 5‑year trend chart and summary
- Thumbs up/down feedback per result (stored with localStorage)

## Clone & Run (macOS/Linux)
1. Clone the repo:
   ```bash
   git clone https://github.com/aryandas2009-cmd/ISH-Investopedia.git
   cd ISH-Investopedia
   ```
2. Start locally (Python):
   ```bash
   python3 -m http.server 8002
   ```
3. Open http://localhost:8002/ISH-Investopedia/

## Clone & Run (Windows)
1. Clone the repo:
   ```bat
   git clone https://github.com/aryandas2009-cmd/ISH-Investopedia.git
   cd ISH-Investopedia
   ```
2. Start locally:
   ```bat
   py -m http.server 8002
   ```
3. Open http://localhost:8002/ISH-Investopedia/

## Project Structure
```
ISH-Investopedia/
├─ index.html
├─ styles.css
├─ app.js
└─ README.md
```

## Usage
- Learn types: click a Quick Option or ask “What are investment types?”
- Deep dive a type: “Tell me about bonds” or “Pros and cons of stocks”
- Factors: “Factors to consider for ETFs”
- Risks: “Risks with cryptocurrency”
- Trend: header prompt → “MSFT” or “Bitcoin”, then Analyze
- Predictive trend: in chat → “Predictive trend for MSFT” (shows compact forecast chart and configurable scenario weights)
- Give feedback: use 👍 or 👎 under the right pane’s result

## Verify Your Setup
- Left pane shows inputs without page scrolling
- Right pane scrolls; charts and feedback remain usable
- Sample prompts work; predictive outlook produces a compact chart and weighted target

## Troubleshooting
- If the page doesn’t load:
  - Confirm the URL includes “/ISH-Investopedia/”
  - Try port 8000 instead of 8002:
    ```bash
    python3 -m http.server 8000
    # then open http://localhost:8000/ISH-Investopedia/
    ```
- If Python isn’t found: install Python 3 from python.org
- If Git isn’t found: install Git from git-scm.com

## Repeatability Tips
- Keep everything inside the ISH‑Investopedia folder; do not move files
- Always open via a local web server (file:// URLs may break charts)
- Use this README as your checklist; it includes URL and usage examples

## Design Notes
- Left pane: inputs only (chat + samples + options); no duplicate search fields
- Right pane: results and analysis only, with scroll for long content
- Clear, beginner‑friendly wording; avoid jargon unless explained

## Notes
- Educational content only; not financial advice
- Static app; no backend; feedback is stored locally only
