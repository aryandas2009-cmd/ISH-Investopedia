# ISH‑Investopedia

ISH‑Investopedia helps new investors learn different investment types and see simple, simulated trend analysis. Ask questions in plain English, pick from sample prompts, and view results clearly on the right pane with quick feedback.

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

## Run Locally
1. Clone the repo:
   ```bash
   git clone https://github.com/aryandas2009-cmd/ISH-Investopedia.git
   cd ISH-Investopedia
   ```
2. Start locally (Python):
   ```bash
   python3 -m http.server 8000
   ```
3. Open http://localhost:8000/

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
- Give feedback: use 👍 or 👎 under the right pane’s result

## Design Notes
- Left pane: inputs only (chat + samples + options); no duplicate search fields
- Right pane: results and analysis only, with scroll for long content
- Clear, beginner‑friendly wording; avoid jargon unless explained

## Notes
- Educational content only; not financial advice
- Static app; no backend; feedback is stored locally only
