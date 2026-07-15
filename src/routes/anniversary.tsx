import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  Lock,
  Star,
  Sparkles,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";

export const Route = createFileRoute("/anniversary")({
  head: () => ({
    meta: [
      { title: "30 days of us 💕" },
      { name: "description", content: "A little scrapbook for our 30-day anniversary." },
    ],
  }),
  component: AnniversaryPage,
});

// 📸 Swap these with your own photo URLs later.
const IMG = {
  cover: "https://i.imgur.com/LkB4b2N.jpeg",
  angel1: "https://i.imgur.com/Mec54yj.jpeg",
  angel2: "https://i.imgur.com/ZDZy60F.jpeg",
  angel3: "https://i.imgur.com/sxL8EXT.jpeg",
  angel4: "https://i.imgur.com/5Eu32hi.png",
};

// 🎵 Swap these 5 slots with DIRECT audio file links (.mp3/.m4a/.wav).
// Spotify/YouTube links will NOT work here — see the chat for hosting options.
const AUDIO: { title: string; artist: string; src: string }[] = [
  { title: "Song One", artist: "Samyak", src: "https://github.com/samyakghaju/charming-replica/raw/refs/heads/main/Mac%20Miller%20-%20Cinderella%20(feat.%20Ty%20Dolla%20$ign).mp3" },
  { title: "Song Two", artist: "Samyak", src: "https://github.com/samyakghaju/charming-replica/raw/refs/heads/main/Mac%20Miller%20-%20Cinderella%20(feat.%20Ty%20Dolla%20$ign).mp3" },
  { title: "Song Three", artist: "Samyak", src: "https://github.com/samyakghaju/charming-replica/raw/refs/heads/main/Mac%20Miller%20-%20Cinderella%20(feat.%20Ty%20Dolla%20$ign).mp3" },
  { title: "Song Four", artist: "Samyak", src: "https://github.com/samyakghaju/charming-replica/raw/refs/heads/main/Mac%20Miller%20-%20Cinderella%20(feat.%20Ty%20Dolla%20$ign).mp3" },
  { title: "Song Five", artist: "Samyak", src: "https://github.com/samyakghaju/charming-replica/raw/refs/heads/main/Mac%20Miller%20-%20Cinderella%20(feat.%20Ty%20Dolla%20$ign).mp3" },
];

type Sticker = { text: string; rotate?: number; tone?: "pink" | "red" | "yellow" };
type PhotoSticker = { src: string; caption?: string; rotate?: number; hearts?: Sticker[] };
type Doodle = "hearts" | "stars" | "rainbow" | "girl" | "icecream" | "mix";

type ScrapPage = {
  paragraphs: string[];
  stickers?: Sticker[];
  photos?: PhotoSticker[];
  doodles?: Doodle[];
};

// ===== content =====
const PAGES: ScrapPage[] = [
  {
    paragraphs: [
      "Hi Angel, My beloved. Its been 30 days since we have commited to each other ani this might be the 30 days ever of my life where there wasn't a single day that went by where i felt low, your just the bestest girlfriend and i hope that i can be the bestest boyfriend to you too. I love you baby, im in love with you and i always will.",
      "i feel your love. from the moment i felt your heart and soul which was when we didn't even meet in real life, something inside of me recognized you. i know you felt it too. it wasn't just attraction, it was like finding something familiar as if i have been knowing you angel for a long long time in another time, another life. you felt like home to me.",
    ],
    stickers: [{ text: "you feel like home 🏡", rotate: -4 }],
    photos: [
      {
        src: IMG.cover,
        caption: "my angel 🌹",
        rotate: -4,
        hearts: [
          { text: "you are the reason i'm smiling", rotate: -6 },
          { text: "mine 💗", rotate: 4, tone: "red" },
        ],
      },
    ],
    doodles: ["hearts", "girl"],
  },
  {
    paragraphs: [
      "your voice is my favourite sound in this whole world. i love hearing your voice even when i dont have anything to say. your voice brings calmness to me. not only calmness tho it raises smth else too, thats a topic for smth other time.",
      "j hos js know i love your voice and the way you tease me with your voice when you say mhmm, AHHHHHH ydkkk how much i love your voice, its js i cant say, its the bestesttt sound for me to hear.",
    ],
    stickers: [
      { text: "mhmm 🫶", rotate: 6, tone: "red" },
      { text: "my favourite sound", rotate: -3 },
    ],
    doodles: ["stars", "hearts"],
  },
  {
    paragraphs: [
      "you show me what real love feels like, instead of em short term relationships and shits, you acc do show me whats a real love, not toxic, no pressure, no nothing, its jus you being real, i love how real you are tho, omg i js love everything about you my beloved angel.",
      "every word you spoke, every silence we shared has left a mark on me. your the first thing that has ever made me feel like completely at peace. i think thats why i fell in love with you,",
    ],
    photos: [
      {
        src: IMG.angel1,
        caption: "peace looks like you",
        rotate: 5,
        hearts: [{ text: "real love ♡", rotate: -8 }],
      },
    ],
    doodles: ["rainbow"],
  },
  {
    paragraphs: [
      "with others silence feels boring and i get my avoidant tendencies up making me leave em, but with you it doesn't matter, even in calls, the silence doesn't bore me, i think thats why i fell in love with you cause of how your presence calms me, it didn't matter what else was going on in my life. with you, i just felt... i felt at home. i felt at peace. i was like \"yoooo so eso po hudo raicha maya pirati vaneko omg\". so this is what a soulmate actually feels like.",
    ],
    stickers: [{ text: "soulmate 💫", rotate: -5, tone: "pink" }],
    doodles: ["stars", "icecream"],
  },
  {
    paragraphs: [
      "you acc dont jus live in my heart, youve built a home there. youve filled spaces i didn't even know were empty cause i never wanted any relationships. youve softened my walls i built for a fear of my career and taught me that love doesn't have to hurt to be real.",
      "i don look at you and see a chapter. i look at you and see the whole story. your loud laughters, the soft touch, the way you play with my hairs, the way your hands move in my back, the kind of love that gives me hope and warmth.",
    ],
    stickers: [{ text: "the whole story 📖", rotate: 3, tone: "yellow" }],
    photos: [
      {
        src: IMG.angel2,
        caption: "the whole story ♡",
        rotate: -6,
        hearts: [{ text: "home", rotate: 6, tone: "red" }],
      },
    ],
    doodles: ["hearts", "rainbow"],
  },
  {
    paragraphs: [
      "with you, love is not about grand moments. its in the little things. the way you check on me, the way you never miss to say joksjoks after teasing me i love how fast you reassure me, i love how you never want me to overthink in anything, the way your presence alone makes everything feels okay.",
      "and sometimes i wonder how i ever lived before i knew you, because now, even an hour without your voice feels incomplete. even the best moments feel like theyre missing something if your not in them, so i try to record or call or text you when anything interesting or fun happens let it be when im in my college and there is an event, let it be when im in gaming zone and want to show you a fun game, let it be in office when there is something fun going on.",
      "youve become the rhythm of my life, the heartbeat beneath everything i do. and loving you, its the one thing thats never felt confusing. so if your ever unsure, if you ever doubt how much you mean to me, just remember this: you are everything i never knew i was waiting for, and im never letting go.",
    ],
    stickers: [{ text: "never letting go 💌", rotate: -4, tone: "pink" }],
    doodles: ["hearts", "stars"],
  },

  // ==== ch2 ====
  {
    paragraphs: [
      "this is how i fell in love with you, i knew i loved you when i caught myself rechecking your reposts thinking if there is anything about me, i fell in love with you when i started to listening to romantic songs, i fell in love with you when i started loving to be in calls instead of ghosting peoples, i fell in love with you when i actually wanted to have a conversation with someone so interesting in life,",
      "i knew i fell in love with you when i caught myself recording videos so that i could show and tell you bout them later.",
    ],
    stickers: [{ text: "in love w/ u 💗", rotate: 5, tone: "red" }],
    photos: [{ src: IMG.angel3, caption: "the one 💫", rotate: 4 }],
    doodles: ["hearts", "stars"],
  },
  {
    paragraphs: [
      "i love the way you look for my hand when they are not with you, i love the way you say my name, i love when you ask for a call, i love the way you get excited when giving to each others like when making surprises for me, i love the way you say you love me, i love the way you write me letters and make things for me, i love the way you put efforts in our relationship.",
      "you have this way of laughing so cutely and loudly at anything like you cant help it, and i dont think you know how much i love it.",
    ],
    stickers: [
      { text: "your laugh > everything", rotate: -6 },
      { text: "hehehe 🎀", rotate: 4, tone: "pink" },
    ],
    doodles: ["girl", "hearts"],
  },
  {
    paragraphs: [
      "you dont see the way your face changes when your listening to me, like nothing else in the whole world matters for those few seconds. you reassure too much, for small things that wouldn't have made me sad, and i love that too, i love how you never feel to make reassured,",
      "and i wish you could see yourself the way i do: someone who is so strong, carrying things quietly that most people would let everyone know about. i dont think you know how kind you are in the small moments, the ones you dont think count. but i count them. all of them.",
    ],
    stickers: [{ text: "i count all of them ✨", rotate: -3, tone: "yellow" }],
    doodles: ["stars", "icecream"],
  },

  // ==== ch3 ====
  {
    paragraphs: [
      "before you, i didn't know how much of myself i kept sealed myself and put away, saved for no one in particular. i was so used to bracing for things like for disappointment, for being misunderstood, for having to explain myself twice, that i didn't know how tired that made me until i stopped needing to do it around you.",
      "you didn't ask me to be softer or easier or less, you just made space for whoever i actually was that day, and somehow that made me want to be better anyways.",
    ],
    photos: [
      {
        src: IMG.angel4,
        caption: "who i became with you",
        rotate: -5,
        hearts: [{ text: "you saw me", rotate: -6, tone: "red" }],
      },
    ],
    doodles: ["rainbow", "hearts"],
  },
  {
    paragraphs: [
      "i used to think that patience was something you performed for people you were trying to impress, but watching you be patient with me, even when i dont deserve it, taught me its actually something you choose over and over, because youve decided someone is worth it.",
      "i laugh more now. i forgive myself faster. i say what i mean instead of circling it. i dont know exactly what happened but there wasn't one moment where i can pint to somewhere between the otrdinary days, you rearranged something in me, quielty the way you do everything and im not who i was before i knew you.",
      "im someone steadier, someone kinder to himself, someone who finally understands what it means to be loved without conditions attached. that's what you gave me. not by trying to change me, but just by staying.",
    ],
    stickers: [{ text: "thank you for staying 💐", rotate: -4, tone: "pink" }],
    doodles: ["stars", "hearts"],
  },

  // ==== ch4 (reasons) ====
  {
    paragraphs: ["and here is some reasons why i love you"],
    stickers: [
      { text: "there's a million more", rotate: -5, tone: "pink" },
      { text: "but here's a few 🎀", rotate: 4, tone: "yellow" },
    ],
    doodles: ["mix"],
  },
  {
    paragraphs: buildReasons([
      "because your beautiful, inside and out.",
      "because your smart, emotionally and logically.",
      "because your interested in everything i say.",
      "because your laugh is my favorite sound.",
      "because you actually listen when i talk.",
      "because you're working so hard for your acca and i get to watch you grow.",
      "because you apologize too much and it gets me every time.",
      "because you make hard days feel okay.",
      "because you remember the little things i say.",
      "because you're stronger than you think you are.",
    ]),
    doodles: ["hearts"],
  },
  {
    paragraphs: buildReasons([
      "because you make me want to be better.",
      "because you never ask me to be someone else.",
      "because you're patient with me, even when i don't deserve it.",
      "because you light up when you talk about things you love.",
      "because you're honest, even when it's hard.",
      "because you care about people without making a show of it.",
      "because you make me laugh on my worst days.",
      "because you never make me feel small.",
      "because you show up, even when it's hard for you.",
      "because your hugs feel like home.",
    ]),
    doodles: ["stars"],
  },
  {
    paragraphs: buildReasons([
      "because you take your goals seriously.",
      "because you're kind to people who can't do anything for you.",
      "because you notice when something's wrong with me.",
      "because you let yourself be soft with me.",
      "because you make me feel safe.",
      "because you never gave up on me.",
      "because your voice changes when you're excited about something.",
      "because you make me think about our future.",
      "because you forgive easily.",
      "because you make my chaos feel manageable.",
    ]),
    doodles: ["rainbow"],
  },
  {
    paragraphs: buildReasons([
      "because you study hard even when you're tired.",
      "because you take care of people quietly, without needing credit.",
      "because you're the calm when i'm not.",
      "because you believe in me more than i believe in myself.",
      "because you tell me when i'm wrong.",
      "because you're the first person i want to talk to.",
      "because your bad days make me want to stay closer, not run.",
      "because you're gentle with people who are hurting.",
      "because you make me feel like enough.",
      "because you're funny without even trying.",
    ]),
    doodles: ["icecream", "hearts"],
  },
  {
    paragraphs: buildReasons([
      "because you take pride in your work.",
      "because you're endlessly curious.",
      "because you make time for me.",
      "because you're loyal.",
      "because you make me want to grow.",
      "because your love is quiet but constant.",
      "because you're brave, even when you don't feel it.",
      "because you're still soft after everything life's thrown at you.",
      "because you're the person i trust most.",
      "because you take responsibility when you mess up.",
    ]),
    doodles: ["stars", "hearts"],
  },
  {
    paragraphs: buildReasons([
      "because your ambition inspires me instead of scaring me.",
      "because you're thoughtful in ways people don't notice.",
      "because you make ordinary days feel like something.",
      "because you let yourself be vulnerable with me.",
      "because you never stop trying.",
      "because you make me want to be honest.",
      "because your love doesn't come with conditions.",
      "because you let me be fully myself.",
      "because you make my worst days lighter.",
      "because you follow through on what you say.",
    ]),
    doodles: ["girl", "hearts"],
  },
  {
    paragraphs: buildReasons([
      "because you say i love you first, without fear.",
      "because your dreams matter to you, and that matters to me.",
      "because you make me proud all the time.",
      "because i want to celebrate every win with you.",
      "because you never stop believing things get better.",
      "because you're kind to yourself, even when it's hard.",
      "because you make me slow down and notice things.",
      "because you stay graceful under pressure.",
      "because you make sacrifices i don't even see.",
      "because you taught me what real love feels like.",
      "because you make me feel lucky just by choosing me.",
      "because distance never changes how you feel.",
      "because you make me want to fight for us.",
      "because your heart is bigger than you know.",
      "because you make me better without even trying.",
      "because loving you is the easiest thing i've ever done.",
    ]),
    stickers: [{ text: "i love you, angel 💌", rotate: -3, tone: "pink" }],
    doodles: ["mix"],
  },
];

function buildReasons(lines: string[]): string[] {
  return lines;
}

// ===== components =====
function AnniversaryPage() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-8"
      style={{
        backgroundColor: "#fce7f0",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), radial-gradient(rgba(244,114,182,0.25) 1px, transparent 1px)",
        backgroundSize: "22px 22px, 22px 22px",
        backgroundPosition: "0 0, 11px 11px",
      }}
    >
      <Link
        to="/"
        className="absolute left-4 top-4 z-20 inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold text-rose-600 shadow-romantic backdrop-blur hover:bg-white"
      >
        <ChevronLeft className="h-3.5 w-3.5" /> home
      </Link>

      <div className="relative z-10 flex min-h-screen items-center justify-center pb-24">
        {unlocked ? <Scrapbook /> : <PasscodeGate onUnlock={() => setUnlocked(true)} />}
      </div>

      {unlocked && <MusicPlayer />}
    </main>
  );
}

function PasscodeGate({ onUnlock }: { onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === "30") onUnlock();
    else {
      setError(true);
      setCode("");
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative rounded-3xl border-4 border-white bg-gradient-to-b from-rose-100 to-pink-200 p-8 shadow-romantic">
        <div className="absolute -top-3 left-1/2 h-6 w-28 -translate-x-1/2 rotate-[-4deg] bg-yellow-200/80 shadow-sm" />
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="absolute inset-0 animate-pulse-glow rounded-full bg-rose-400/40 blur-2xl" />
            <div className="relative rounded-full bg-white p-4 shadow-romantic">
              <Lock className="h-8 w-8 text-rose-500" />
            </div>
          </div>
          <h1 className="font-hand text-5xl font-bold text-rose-700">psst… locked 🔒</h1>
          <p className="mt-2 font-hand text-2xl text-rose-500">
            hint: how many days has it been?
          </p>

          <form onSubmit={submit} className="mt-6 w-full">
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(false);
              }}
              inputMode="numeric"
              placeholder="••"
              className="w-full rounded-2xl border-2 border-rose-200 bg-white/90 px-6 py-4 text-center font-hand text-4xl tracking-widest text-rose-700 outline-none focus:border-rose-400"
            />
            {error && <p className="mt-2 font-hand text-xl text-red-500">nope, try again 🥲</p>}
            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-rose-500 px-6 py-3 font-hand text-2xl font-bold text-white shadow-romantic transition hover:bg-rose-600"
            >
              open <Heart className="h-5 w-5" fill="currentColor" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Scrapbook() {
  const [page, setPage] = useState(0);
  const current = PAGES[page];
  const isLast = page === PAGES.length - 1;
  const isFirst = page === 0;

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-3 flex items-center justify-between px-2">
        <span className="font-hand text-2xl text-rose-600">our little scrapbook 🎀</span>
        <span className="font-hand text-xl text-rose-400">
          page {page + 1} / {PAGES.length}
        </span>
      </div>

      <ScrapPageView key={page} page={current} />

      <div className="mt-5 flex items-center justify-between px-2">
        <button
          disabled={isFirst}
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="inline-flex items-center gap-1 rounded-full bg-white/80 px-4 py-2 font-hand text-xl text-rose-600 shadow-romantic backdrop-blur transition hover:bg-white disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" /> back
        </button>
        <div className="flex flex-wrap justify-center gap-1.5">
          {PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === page ? "bg-rose-500 scale-125" : "bg-rose-200 hover:bg-rose-300"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
        <button
          disabled={isLast}
          onClick={() => setPage((p) => Math.min(PAGES.length - 1, p + 1))}
          className="inline-flex items-center gap-1 rounded-full bg-rose-500 px-4 py-2 font-hand text-xl text-white shadow-romantic transition hover:bg-rose-600 disabled:opacity-40"
        >
          next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ScrapPageView({ page }: { page: ScrapPage }) {
  return (
    <div
      className="relative overflow-hidden rounded-[28px] border-4 border-white bg-[#fffdf7] shadow-romantic animate-page-flip"
      style={{
        backgroundImage:
          "repeating-linear-gradient(transparent 0 34px, rgba(244,114,182,0.28) 34px 35px)",
      }}
    >
      {/* left red margin line */}
      <div className="pointer-events-none absolute inset-y-0 left-14 w-px bg-rose-400/70" />
      {/* spiral binding */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex w-8 flex-col items-center justify-around bg-white/60 py-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="h-3 w-3 rounded-full border-2 border-rose-300 bg-white" />
        ))}
      </div>
      {/* washi tapes */}
      <div className="absolute -top-3 left-20 h-6 w-24 rotate-[-6deg] bg-yellow-200/80 shadow-sm" />
      <div className="absolute -top-3 right-8 h-6 w-20 rotate-[4deg] bg-rose-300/70 shadow-sm" />

      <Doodles kinds={page.doodles} />

      <div className="relative px-8 pl-20 pt-10 pb-8 md:px-12 md:pl-24">
        {/* photos float to the right on md+ */}
        {page.photos && page.photos.length > 0 && (
          <div className="mt-2 grid gap-6 md:grid-cols-5">
            <div className="space-y-5 md:col-span-3">
              {page.paragraphs.map((p, i) => (
                <p key={i} className="font-hand text-2xl leading-[34px] text-rose-950/85 md:text-[26px]">
                  {p}
                </p>
              ))}
              {page.stickers?.map((s, i) => (
                <StickerNote key={i} sticker={s} />
              ))}
            </div>
            <div className="flex flex-col items-center justify-center gap-6 md:col-span-2">
              {page.photos.map((im, i) => (
                <Polaroid key={i} photo={im} />
              ))}
            </div>
          </div>
        )}

        {!page.photos && (
          <div className="mt-2 space-y-4">
            {page.paragraphs.map((p, i) => (
              <p key={i} className="font-hand text-2xl leading-[34px] text-rose-950/85 md:text-[26px]">
                {p}
              </p>
            ))}
            {page.stickers && page.stickers.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4">
                {page.stickers.map((s, i) => (
                  <StickerNote key={i} sticker={s} />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-dashed border-rose-200 pt-4">
          <span className="font-hand text-xl text-rose-400">xo, samyak 💌</span>
          <span className="inline-flex items-center gap-1 font-hand text-xl text-rose-400">
            <Sparkles className="h-4 w-4" /> day 30
          </span>
        </div>
      </div>
    </div>
  );
}

function Polaroid({ photo }: { photo: PhotoSticker }) {
  return (
    <div className="relative bg-white p-3 pb-8 shadow-romantic" style={{ transform: `rotate(${photo.rotate ?? 0}deg)` }}>
      <img src={photo.src} alt="" className="h-52 w-56 object-cover" />
      {photo.caption && <p className="mt-2 text-center font-hand text-xl text-rose-600">{photo.caption}</p>}
      {photo.hearts?.map((h, i) => (
        <div
          key={i}
          className={`absolute z-10 flex items-center justify-center px-2 py-1 font-marker text-[13px] font-bold leading-tight text-white shadow ${
            h.tone === "yellow" ? "bg-yellow-400" : h.tone === "pink" ? "bg-rose-400" : "bg-rose-500"
          }`}
          style={{
            top: i === 0 ? "-14px" : "auto",
            bottom: i === 1 ? "40px" : "auto",
            left: i % 2 === 0 ? "-16px" : "auto",
            right: i % 2 === 1 ? "-14px" : "auto",
            transform: `rotate(${h.rotate ?? 0}deg)`,
            clipPath:
              "path('M20 6 C20 2 14 -2 10 4 C6 -2 0 2 0 6 C0 12 10 20 10 20 C10 20 20 12 20 6 Z')",
            width: "90px",
            height: "80px",
            padding: "22px 8px 8px",
            textAlign: "center",
          }}
        >
          {h.text}
        </div>
      ))}
    </div>
  );
}

function StickerNote({ sticker }: { sticker: Sticker }) {
  const bg =
    sticker.tone === "yellow"
      ? "bg-yellow-200 text-rose-700"
      : sticker.tone === "red"
        ? "bg-rose-400 text-white"
        : "bg-rose-100 text-rose-600";
  return (
    <span
      className={`inline-block ${bg} px-4 py-2 font-marker text-xl shadow-sm`}
      style={{
        transform: `rotate(${sticker.rotate ?? 0}deg)`,
        borderRadius: "14px 22px 16px 20px / 20px 14px 22px 16px",
      }}
    >
      {sticker.text}
    </span>
  );
}

function Doodles({ kinds }: { kinds?: Doodle[] }) {
  if (!kinds || kinds.length === 0) return null;
  const set = new Set(kinds);
  return (
    <>
      {set.has("hearts") && (
        <>
          <Heart className="absolute right-10 top-14 h-6 w-6 text-rose-400" fill="currentColor" />
          <Heart className="absolute bottom-16 left-24 h-4 w-4 text-rose-300" fill="currentColor" />
          <Heart className="absolute right-24 bottom-24 h-5 w-5 text-rose-400" fill="currentColor" />
        </>
      )}
      {set.has("stars") && (
        <>
          <Star className="absolute right-16 top-24 h-6 w-6 text-yellow-400" fill="currentColor" />
          <span className="absolute bottom-14 right-28 text-3xl">⭐</span>
          <span className="absolute left-24 bottom-24 text-2xl">✨</span>
        </>
      )}
      {set.has("rainbow") && (
        <>
          <span className="absolute right-12 top-16 text-5xl select-none">🌈</span>
          <span className="absolute bottom-16 left-24 text-2xl">☁️</span>
        </>
      )}
      {set.has("girl") && <span className="absolute right-20 top-8 text-4xl select-none">💐</span>}
      {set.has("icecream") && <span className="absolute bottom-14 left-24 text-3xl select-none">🍨</span>}
      {set.has("mix") && (
        <>
          <span className="absolute right-10 top-10 text-4xl">🌈</span>
          <span className="absolute left-24 bottom-16 text-3xl">🍨</span>
          <span className="absolute right-24 bottom-20 text-3xl">✨</span>
          <Heart className="absolute right-40 top-24 h-5 w-5 text-rose-400" fill="currentColor" />
        </>
      )}
    </>
  );
}

// ===== music player =====
function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const track = AUDIO[index];
  const hasTracks = AUDIO.some((t) => t.src.trim() !== "");

  // Try to autoplay once the scrapbook unlocks (this counts as a user gesture,
  // since it happens right after the passcode form submit).
  useEffect(() => {
    if (!hasTracks) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false)); // browser blocked it — user can hit play manually
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [index]);

  if (!hasTracks) return null;

  const togglePlay = () => setIsPlaying((p) => !p);
  const next = () => setIndex((i) => (i + 1) % AUDIO.length);
  const prev = () => setIndex((i) => (i - 1 + AUDIO.length) % AUDIO.length);
  const toggleMute = () => {
    if (audioRef.current) audioRef.current.muted = !muted;
    setMuted((m) => !m);
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-30 w-[92%] max-w-sm -translate-x-1/2">
      <audio
        ref={audioRef}
        src={track.src}
        onEnded={next}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="flex items-center gap-3 rounded-full border-2 border-white bg-white/90 px-4 py-2.5 shadow-romantic backdrop-blur">
        <button
          onClick={prev}
          className="text-rose-500 transition hover:text-rose-700"
          aria-label="Previous song"
        >
          <SkipBack className="h-4 w-4" fill="currentColor" />
        </button>

        <button
          onClick={togglePlay}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm transition hover:bg-rose-600"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="ml-0.5 h-4 w-4" fill="currentColor" />}
        </button>

        <button
          onClick={next}
          className="text-rose-500 transition hover:text-rose-700"
          aria-label="Next song"
        >
          <SkipForward className="h-4 w-4" fill="currentColor" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="truncate font-hand text-lg leading-tight text-rose-700">{track.title}</p>
          <p className="truncate font-hand text-sm leading-tight text-rose-400">{track.artist}</p>
        </div>

        <button
          onClick={toggleMute}
          className="text-rose-400 transition hover:text-rose-600"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
