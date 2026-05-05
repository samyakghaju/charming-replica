## "Will you go on a date with me?" page

A playful single-page site that asks her out and lets her pick a date/time.

### Page flow (single route: `/`)

**Step 1 — The Ask**
- Cute romantic GIF / heart illustration centered
- Heading: "Will you go on a date with me?"
- Two buttons:
  - **Yes** (green) → advances to Step 2
  - **No** (red) → runs away from cursor on hover so it can never be clicked (classic gag). Each dodge subtly grows the Yes button.

**Step 2 — Pick a date**
- Heading: "Yay! 💖 When are you free?"
- Shadcn date picker (Popover + Calendar, `mode="single"`, future dates only)
- Time selector (simple `<Select>` with slots like 6:00 PM, 7:00 PM, 8:00 PM, 9:00 PM)
- Optional location input ("Where should we go?")
- **Confirm** button → advances to Step 3

**Step 3 — Confirmation**
- Big celebratory heading: "It's a date! 🥰"
- Shows chosen date + time + location formatted nicely (e.g. "Saturday, May 9, 2026 at 7:00 PM")
- Subtle confetti / floating hearts animation
- "Change details" link to go back to Step 2

### Style
- Soft pink/rose background, white card, rounded buttons, generous spacing
- Romantic but tasteful — no over-the-top kitsch
- Fully responsive

### Files to change
- `src/routes/index.tsx` — implement the 3-step flow with local state
- `src/routes/__root.tsx` — page title "Will you date me?"
- Reuse existing shadcn components: `button`, `calendar`, `popover`, `select`, `input`, `card`

No backend / database needed — state is local to the session.
