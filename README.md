# AASHAV — THE HOPE | Hackathon 2026

Production-quality national-level inter-college hybrid hackathon website for **AASHAV — THE HOPE** taking place on **22 August 2026** at **SIMATS School of Engineering**.

Aashav is designed as an industry-oriented hackathon experience and warm-up for **Smart India Hackathon (SIH) 2026**.

---

## Technical Stack

- **Framework**: Next.js 14+ (App Router, Server Components & Client Components)
- **Language**: TypeScript (Strict typing)
- **Styling**: Tailwind CSS (Custom dark theme tokens, glowing horizon motif, technical grid patterns)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Engine**: Custom server-side parser for `/data/problem-statements.txt`

---

## Quick Start & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Test Production Bundle
```bash
npm run build
npm run start
```

### 4. Run Lint Checks
```bash
npm run lint
```

---

## Central Configuration (`src/config/event.ts`)

All core organizer settings, dates, venue info, placeholders, and links are centralized in [`src/config/event.ts`](file:///c:/Users/strix/Desktop/Aashav/src/config/event.ts).

### 1. How to Add Google Maps Link
Open `src/config/event.ts` and replace `"PLACEHOLDER_GOOGLE_MAPS_URL"`:
```typescript
mapsUrl: "https://maps.google.com/?q=SIMATS+School+of+Engineering+Chennai",
```

### 2. How to Add Registration Link
Open `src/config/event.ts` and replace `"PLACEHOLDER_REGISTRATION_URL"`:
```typescript
registrationUrl: "https://forms.google.com/your-official-aashav-registration-form",
```

### 3. How to Edit Head Coordinator Details
Open `src/config/event.ts` and edit the `coordinator` object:
```typescript
coordinator: {
  name: "Alex Reynolds",
  role: "Head Coordinator",
  email: "alex.reynolds@simats.edu",
  phone: "+91 98765 43210",
  linkedin: "https://linkedin.com/in/alexreynolds",
}
```

---

## Problem Statements Data Management (`/data/problem-statements.txt`)

Problem statements are dynamically loaded from [`data/problem-statements.txt`](file:///c:/Users/strix/Desktop/Aashav/data/problem-statements.txt).

### File Format
Entries are separated by `---` blocks:

```txt
---
id: 01
title: AI-POWERED PUBLIC SERVICE ASSISTANT
domain: AI & Public Services
source: SIH Previous Year
complexity: Advanced
category: Software
---
Full description of the problem statement goes here.
```

To update problem statements:
1. Open `/data/problem-statements.txt`.
2. Edit or append entries adhering to the delimiter structure.
3. Save the file. The site will automatically parse and render the updated problem statements.

Refer to [`data/README.md`](file:///c:/Users/strix/Desktop/Aashav/data/README.md) for complete details.

---

## Event Timeline & Rules Summary

- **Registration Opens**: 07 August 2026
- **Registration Closes**: 20 August 2026 — 2:00 PM IST
- **Selected Teams Announced**: 21 August 2026 — Before 10:00 AM IST
- **Participation Confirmation Cutoff**: 21 August 2026 — Before 10:00 PM IST
- **Hackathon Day**: 22 August 2026
  - `08:30 AM`: Inauguration
  - `09:00 AM`: Hackathon Begins
  - `12:30 PM`: First Round Evaluation
  - `02:30 PM`: Hackathon Ends & Final Evaluation
  - `03:00 PM`: Valedictory Ceremony & Winner Announcements
- **Honored Winners**: Exactly 5 teams.

---

## Deployment Options

### Deploy to Vercel (Recommended)
1. Push project repository to GitHub / GitLab.
2. Import project on [Vercel](https://vercel.com).
3. Vercel automatically detects Next.js build settings (`npm run build`).
4. Deploy!

### Deploy via Docker / Static Hosting
Execute `npm run build` to output the production build artifact in `.next`.
