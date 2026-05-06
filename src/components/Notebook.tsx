import { useEffect, useRef, useState } from "react";
import { Heart, ChevronRight, Volume2, VolumeX } from "lucide-react";

// Drop your own .mp3 files into /public/music/ with these names to customize.
// Each page plays its own track; falls back silently if a file is missing.
const MUSIC: string[] = [
  "/music/page-1.mp3",
  "/music/page-2.mp3",
  "/music/page-3.mp3",
  "/music/page-4.mp3",
];

const PAGES: { title?: string; body: string; doodle?: string; photo?: boolean }[] = [
  {
    title: "hi simisimi 🐻",
    body: "open this. i wrote you something.\n(don't peek at the end yet.)",
  },
  {
    body: "okay so. i've been thinking. like, a lot. mostly about you. mostly at 2am. mostly about your laugh.",
    doodle: "/notebook/sticker-bear.png",
  },
  {
    body: "you know how some days are just gray? you make mine highlighter pink. unmissable.",
  },
  {
    body: "i practiced this in the mirror three times. then i forgot the words. then i practiced again.",
    doodle: "/notebook/sticker-heart.png",
  },
  {
    title: "a tiny confession from yumyum",
    body: "i like you. like, really like you. the kind where i save memes and think 'simi would lose it at this'.",
    photo: true,
  },
  {
    body: "so i drew you a tiny bear and a slightly broken heart. (it's just stage fright — the heart is fine.)",
    doodle: "/notebook/sticker-heart.png",
  },
  {
    body: "okay. turn the page. i'm going to ask you something a little brave on the next one.",
  },
];

const TYPE_SPEED = 28;

export function Notebook({ onDone }: { onDone: () => void }) {
  const [page, setPage] = useState(0);
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const timer = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const current = PAGES[page];

  useEffect(() => {
    if (!started) return;
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
    }
    const a = audioRef.current;
    a.src = MUSIC[page % MUSIC.length];
    a.muted = muted;
    a.play().catch(() => {});
    return () => {
      a.pause();
    };
  }, [page, started]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    setShown("");
    setDone(false);
    let i = 0;
    timer.current = window.setInterval(() => {
      i++;
      setShown(current.body.slice(0, i));
      if (i >= current.body.length) {
        setDone(true);
        if (timer.current) window.clearInterval(timer.current);
      }
    }, TYPE_SPEED);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [page, current.body]);

  const skipOrNext = () => {
    if (!started) setStarted(true);
    if (!done) {
      setShown(current.body);
      setDone(true);
      if (timer.current) window.clearInterval(timer.current);
      return;
    }
    if (page < PAGES.length - 1) setPage((p) => p + 1);
    else onDone();
  };

  return (
    <div className="relative w-full max-w-2xl">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (!started) setStarted(true);
          setMuted((m) => !m);
        }}
        className="absolute -top-2 right-2 z-20 rounded-full bg-white/80 p-2 text-rose-600 shadow-romantic backdrop-blur hover:bg-white"
        aria-label={muted ? "Unmute music" : "Mute music"}
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
      <div className="relative">
        {/* Stack illusion */}
        <div className="absolute inset-0 -rotate-2 translate-y-3 rounded-2xl bg-rose-200/60 shadow-romantic" />
        <div className="absolute inset-0 rotate-1 translate-y-1.5 rounded-2xl bg-rose-100/80 shadow-romantic" />

        <div
          key={page}
          className="relative overflow-hidden rounded-2xl border border-rose-200 bg-[#fffaf5] shadow-romantic animate-page-flip"
          style={{
            backgroundImage:
              "repeating-linear-gradient(transparent 0 30px, rgba(244,114,182,0.18) 30px 31px)",
          }}
        >
          {/* Red margin line */}
          <div className="pointer-events-none absolute inset-y-0 left-12 w-px bg-rose-300/70" />
          {/* Binding holes */}
          <div className="pointer-events-none absolute inset-y-0 left-3 flex flex-col justify-around py-10">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-2.5 w-2.5 rounded-full bg-rose-200 ring-2 ring-rose-300/50" />
            ))}
          </div>
          {/* Tape */}
          <div className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-3deg] bg-yellow-200/70 shadow-sm" />

          <div className="px-16 py-14 min-h-[440px] font-display">
            {current.title && (
              <h2 className="mb-6 text-3xl font-bold italic text-rose-700">{current.title}</h2>
            )}

            <div className="flex items-start gap-6">
              <p className="flex-1 whitespace-pre-wrap text-2xl italic leading-relaxed text-rose-950/85">
                {shown}
                {!done && (
                  <span className="ml-0.5 inline-block h-6 w-0.5 -translate-y-0.5 animate-pulse bg-rose-700 align-middle" />
                )}
              </p>

              {current.doodle && done && (
                <img
                  src={current.doodle}
                  alt=""
                  className="h-24 w-24 shrink-0 rotate-6 animate-fade-in object-contain"
                />
              )}
            </div>

            {current.photo && done && (
              <div className="mt-8 flex justify-center animate-fade-in">
                <div className="rotate-[-4deg] rounded-sm bg-white p-3 pb-10 shadow-romantic">
                  <img
                    src="/notebook/polaroid.png"
                    alt="for simi"
                    className="h-48 w-48 object-cover"
                  />
                  <p className="mt-2 text-center font-display italic text-rose-700">
                    for simi 🌹
                  </p>
                </div>
              </div>
            )}

            <div className="mt-10 flex items-center justify-between text-sm text-rose-400">
              <span className="italic">— yumyum</span>
              <span>{page + 1} / {PAGES.length}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={skipOrNext}
            className="absolute inset-0 cursor-pointer focus:outline-none"
            aria-label={done ? "Next page" : "Skip typing"}
          />
        </div>
      </div>

      <div className="mt-6 flex animate-pulse items-center justify-center gap-2 text-rose-500/80">
        <Heart className="h-4 w-4" fill="currentColor" />
        <span className="text-sm">
          {done
            ? page === PAGES.length - 1
              ? "tap to open the question"
              : "tap to turn the page"
            : "tap to skip"}
        </span>
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
}
