# ConciergeAI

Natural language hotel search powered by Claude AI. Describe your ideal stay in plain English and get a curated list of hotels with an AI-generated recommendation explaining the top pick.

**Live demo:** [conciergeai-app.vercel.app](https://conciergeai-app.vercel.app)

---

## What it does

Most booking platforms give you dropdowns and checkboxes. ConciergeAI lets you type something like *"5-star hotels in Tokyo with a pool, under $400"* and get real results back, ranked and explained.

There are three Claude-powered features under the hood:

**Query parsing** — converts a natural language query into structured search parameters (city, star rating, amenities, price cap, review threshold). Handles shorthand like "luxury," "excellent," and "4-star or better." If the query is too vague to act on, it asks one clarifying question before searching.

**Multi-turn refinement** — after seeing results, users can type follow-up instructions like "make it cheaper" or "near the beach" or "want something near Colorado." Claude refines the previous search parameters rather than starting from scratch.

**AI recommendation** — after results load, Claude generates a 2-3 sentence explanation of why the top hotel is the best match for the specific query.

---

## Evals

The AI query parser has a live eval suite with 16 test cases across two categories: query parsing and ambiguity detection. You can run them at `/evals` in the app. A few of the cases came directly from real failures during development, like the app returning inland cities when someone searched "hotels on the beach in India."

---

## Tech stack

| Layer | What |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Express (served via Vercel serverless) |
| AI | Claude Haiku (Anthropic) |
| Hotel data | SerpApi — Google Hotels engine |
| Auth | Firebase Authentication (Google Sign-In) |
| Database | Firestore (saved hotels, user preferences) |
| Hosting | Vercel |

---

## Running locally

**Prerequisites:** Node.js 18+

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root with the following:
   ```
   ANTHROPIC_API_KEY=your_anthropic_key
   SERPAPI_KEY=your_serpapi_key
   ```

3. Set up Firebase:
   - Create a project at [firebase.google.com](https://firebase.google.com)
   - Enable Google Sign-In under Authentication
   - Create a Firestore database
   - Copy your Firebase config into `firebase-applet-config.json`

4. Start the dev server:
   ```bash
   npm run dev
   ```

The app runs on `http://localhost:3000` by default.

---

## Key product decisions

**Soft sorting instead of hard filtering for amenities** — amenity data from the API is sparse. Hard-filtering on "pool" or "breakfast" silently excluded valid hotels. Soft-sorting bubbles matching hotels to the top without removing anything.

**SerpApi over RapidAPI/Booking.com** — the Booking.com API returned too few results per search (sometimes under 10). SerpApi consistently returns 30+ results from Google Hotels, which gives the ranker enough to work with.

**Vercel serverless with 60s timeout** — fetching multiple pages of results adds latency. The current architecture works at this scale but would need a queue-based approach at higher volume.
