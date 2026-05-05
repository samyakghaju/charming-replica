## Add a confession-notebook intro before the date question

A multi-page handwritten notebook from yumyum to simisimi that auto-types itself and turns pages with a click — leading into the existing "Will you go on a date with me?" flow.

### Flow

1. **Notebook intro (NEW)** — 7 short pages, typewriter reveal, click to skip typing or turn page
2. **The Ask** — existing Yes/No
3. **Pick date/time/place**
4. **Confirmation**

### Notebook pages (warm, playful, signed "yumyum")

1. "Hi simisimi 🐻 — open this. i wrote you something."
2. "i've been thinking. mostly about you. mostly at 2am. mostly about your laugh." + bear sticker
3. "you make my gray days highlighter pink."
4. "i practiced this in the mirror three times…" + heart sticker
5. **"a tiny confession from yumyum"** + polaroid photo of simi (placeholder, swap later)
6. "i drew you a tiny bear and a slightly broken heart. (it's just stage fright.)"
7. "turn the page — i'm going to ask you something brave."

### Visual design

- Looks like a real ruled notebook page: cream paper, faint pink horizontal lines, red margin line, six binding holes on the left, a strip of yellow washi tape on top
- Stack illusion: two faded pages peek behind the front one
- Page-flip animation between pages (subtle scale/rotate fade)
- Playfair Display italic for the body so it feels handwritten-ish (no extra font install needed — already loaded)
- Polaroid: white frame, slight rotation, tape feel; caption "for simi 🌹"
- Doodle stickers float in the corner once typing finishes

### Personal details

- Her name: **Simran**, nickname **simisimi**
- Signed by **yumyum**
- Three AI-generated illustrations saved to `/public/notebook/`:
  - `polaroid.png` — soft watercolor placeholder portrait (you can replace with her real photo later by overwriting the file)
  - `sticker-heart.png` — pink heart with bandaid doodle
  - `sticker-bear.png` — tiny teddy holding a heart

### Interaction

- Auto-typewriter at ~28ms/char
- Click anywhere on the page → skip typing if mid-type, otherwise turn to next page
- Last page → opens the existing "Will you go on a date with me?" flow
- Subtle hint at bottom: "tap to turn the page" with a heart + chevron

### Files

- **NEW** `src/components/Notebook.tsx` — the full notebook component
- **NEW** `public/notebook/polaroid.png`, `sticker-heart.png`, `sticker-bear.png` (already generated and in place)
- `src/styles.css` — add `@keyframes page-flip` and `--animate-page-flip`
- `src/routes/index.tsx` — add `"notebook"` as the first step (default), advances to `"ask"` when notebook ends
