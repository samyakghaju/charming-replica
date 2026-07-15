import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ChevronLeft, ChevronRight, Lock, Sparkles } from "lucide-react";

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
  p1a: "https://i.imgur.com/m4WDrCj.jpeg",
  p1b: "https://i.imgur.com/Mec54yj.jpeg",
  p2a: "https://i.imgur.com/1yh9Igs.jpeg",
  p3a: "https://i.imgur.com/94I7lHB.jpeg",
  p3b: "https://i.imgur.com/SUPO06i.jpeg",
  p4a: "https://i.imgur.com/m4WDrCj.jpeg",
  p5a: "https://i.imgur.com/Mec54yj.jpeg",
};

// ✏️  Placeholder text — replace with your ~3000-word letter.
// Each entry is one scrapbook page. Add more objects for more pages.
type ScrapPage = {
  title?: string;
  body: string;
  images?: { src: string; caption?: string; rotate?: number }[];
  theme?: "pink" | "blue" | "cream";
  doodle?: "hearts" | "stars" | "rainbow";
};

const PAGES: ScrapPage[] = [
  {
    title: "30 days of us",
    body:
      "baby… i can’t believe it’s been thirty whole days. thirty days of good mornings, random ‘i miss you’s and calls that go way past midnight. i wanted to make you a little something you could keep — a scrapbook for the tiny universe we’ve been building together. (placeholder text — paste your real words here.)",
    images: [
      { src: IMG.p1a, caption: "us. day one 🌹", rotate: -4 },
      { src: IMG.p1b, caption: "silly little you", rotate: 5 },
    ],
    theme: "pink",
    doodle: "hearts",
  },
  {
    title: "the little things",
    body:
      "the way you laugh at your own jokes before you finish them. the way you send me a photo of literally every meal. the way you say ‘okayyyy’ when you’re half asleep. i keep a whole museum of tiny things about you in my head. (placeholder — replace with your text.)",
    images: [{ src: IMG.p2a, caption: "my favorite person", rotate: 3 }],
    theme: "cream",
    doodle: "stars",
  },
  {
    title: "our first everything",
    body:
      "our first call. our first fight. our first ‘i love you’. our first ‘i’m sorry’. every first with you has felt like something worth writing down. (placeholder — this is where the story goes.)",
    images: [
      { src: IMG.p3a, caption: "day 12 ✨", rotate: -6 },
      { src: IMG.p3b, caption: "day 21 💌", rotate: 4 },
    ],
    theme: "blue",
    doodle: "rainbow",
  },
  {
    title: "a not-so-love-letter",
    body:
      "i adore you so much. i don’t think i’ve ever said that to anyone the way i mean it with you. thank you for being warm-hearted, for being full of love, for being patient with me when i’m being… me. (placeholder text.)",
    images: [{ src: IMG.p4a, caption: "you are the reason i’m smiling", rotate: -3 }],
    theme: "pink",
    doodle: "hearts",
  },
  {
    title: "here’s to more",
    body:
      "thirty down. a whole lifetime of these to go, if you’ll have me. i can’t wait to close the distance, hold your hand, and finally say all of this out loud. happy 30 days, angel. i love you — more than i ever say out loud. (placeholder — end with whatever you want.)",
    images: [{ src: IMG.p5a, caption: "us. officially. still.", rotate: 4 }],
    theme: "cream",
    doodle: "stars",
  },
];

function AnniversaryPage() {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <main
      className="relative min-h-screen overflow-hidden px-4 py-10"
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

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        {unlocked ? <Scrapbook /> : <PasscodeGate onUnlock={() => setUnlocked(true)} />}
      </div>
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
            {error && (
              <p className="mt-2 font-hand text-xl text-red-500">nope, try again 🥲</p>
            )}
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
    <div className="w-full max-w-4xl">
      <div className="mb-3 flex items-center justify-between px-2">
        <span className="font-hand text-2xl text-rose-600">
          our little scrapbook 🎀
        </span>
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
        <div className="flex gap-1.5">
          {PAGES.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i === page ? "bg-rose-500" : "bg-rose-200"}`}
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
  const theme = page.theme ?? "pink";
  const paper =
    theme === "blue"
      ? "bg-[#eef3ff]"
      : theme === "cream"
        ? "bg-[#fffaf0]"
        : "bg-[#fff6f9]";
  const lineColor =
    theme === "blue"
      ? "rgba(147,197,253,0.35)"
      : theme === "cream"
        ? "rgba(234,179,8,0.18)"
        : "rgba(244,114,182,0.22)";

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border-4 border-white ${paper} shadow-romantic animate-page-flip`}
      style={{
        backgroundImage: `repeating-linear-gradient(transparent 0 30px, ${lineColor} 30px 31px)`,
      }}
    >
      {/* spiral binding */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex w-8 flex-col items-center justify-around bg-white/50 py-6">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="h-3 w-3 rounded-full border-2 border-rose-300 bg-white" />
        ))}
      </div>
      {/* washi tapes */}
      <div className="absolute -top-3 left-16 h-6 w-24 rotate-[-6deg] bg-yellow-200/80 shadow-sm" />
      <div className="absolute -top-3 right-8 h-6 w-20 rotate-[4deg] bg-rose-300/70 shadow-sm" />

      {/* doodles */}
      <Doodles kind={page.doodle} />

      <div className="grid gap-6 px-10 py-12 pl-16 md:grid-cols-5 md:px-14 md:pl-20">
        <div className="md:col-span-3">
          {page.title && (
            <h2 className="mb-4 font-hand text-5xl font-bold leading-tight text-rose-700 md:text-6xl">
              {page.title}
            </h2>
          )}
          <p className="whitespace-pre-wrap font-hand text-2xl leading-snug text-rose-950/85 md:text-3xl">
            {page.body}
          </p>
        </div>

        {page.images && page.images.length > 0 && (
          <div className="flex flex-col items-center justify-center gap-6 md:col-span-2">
            {page.images.map((im, i) => (
              <div
                key={i}
                className="bg-white p-3 pb-8 shadow-romantic"
                style={{ transform: `rotate(${im.rotate ?? 0}deg)` }}
              >
                <img
                  src={im.src}
                  alt=""
                  className="h-48 w-56 object-cover"
                />
                {im.caption && (
                  <p className="mt-2 text-center font-hand text-xl text-rose-600">
                    {im.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-14 pb-6">
        <span className="font-hand text-xl text-rose-400">— samyak 💌</span>
        <span className="inline-flex items-center gap-1 font-hand text-xl text-rose-400">
          <Sparkles className="h-4 w-4" /> day 30
        </span>
      </div>
    </div>
  );
}

function Doodles({ kind }: { kind?: ScrapPage["doodle"] }) {
  if (kind === "stars") {
    return (
      <>
        <span className="absolute right-10 top-16 text-3xl">✨</span>
        <span className="absolute bottom-16 left-16 text-2xl">⭐</span>
        <span className="absolute right-24 bottom-24 text-3xl">🌟</span>
      </>
    );
  }
  if (kind === "rainbow") {
    return (
      <>
        <span className="absolute right-12 top-14 text-4xl">🌈</span>
        <span className="absolute bottom-14 left-20 text-2xl">☁️</span>
      </>
    );
  }
  return (
    <>
      <Heart className="absolute right-10 top-14 h-6 w-6 text-rose-400" fill="currentColor" />
      <Heart className="absolute bottom-16 left-20 h-4 w-4 text-rose-300" fill="currentColor" />
      <Heart className="absolute right-24 bottom-24 h-5 w-5 text-rose-400" fill="currentColor" />
    </>
  );
}
