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

// 📸 Replace these URLs with your own photos (any image URL works).
const IMG = {
  intro: "https://imgur.com/LWhLTsd",
  smile: "https://imgur.com/LXmGFb7",
  strong: "https://imgur.com/sC2ipK4",
  future: "https://imgur.com/A64FFGe",
  closing: "https://imgur.com/t1gxA2p",
};

const PAGES: { title?: string; body: string; image?: string }[] = [
  {
    title: "for angel 🌹",
    body: "Even though we met on the internet and have never met in person, I am surprisingly sure about you. In a world where people constantly come and go, you are one of the very few people who have genuinely stayed in my thoughts every single day.",
    image: IMG.intro,
  },
  {
    body: "I love the way you think, the way you see the world, and the way you always try to find something positive even when things are difficult. I admire how strong you are. You have been through things that could have easily broken someone, yet you continue to move forward with so much courage. That is one of the many reasons why I look up to you.",
    image: IMG.strong,
  },
  {
    body: "You honestly put a smile on my face every day. No matter how busy, stressed, or focused I am, seeing your message instantly makes my day better. I love talking to you. I love hearing your voice. I love your smile, your eyes, your laugh, and the little things about you that you probably don't even realize make you special. To be honest, I love everything about you.",
    image: IMG.smile,
  },
  {
    body: "What makes this even more meaningful is that this is something I never expected for myself. You know that I'm not the most emotional person. I've always been focused on my goals, my future, and my career. Relationships were never really something I spent much time thinking about because I always believed there were more important things to focus on. But with you, it feels different.",
  },
  {
    body: "For the first time in years, I actually wanted to try. I wanted to open up. I wanted to let someone in. You made me feel something I hadn't felt in a very long time. Not because you forced it, but because being with you feels natural. It feels right.",
  },
  {
    body: "I genuinely care about you. Your happiness matters to me. When you're happy, I find myself happy too. When you're struggling, I wish I could be there to make things easier for you. I want to support you through your good days and your bad days, celebrate your wins, and remind you how amazing you are whenever you forget.",
  },
  {
    body: "I don't just like the idea of you. I like you for who you are. Your strengths, your flaws, your dreams, your fears, your personality, everything that makes you uniquely you. I know we've never met in person, but somehow you've become one of the most important people in my life. Distance doesn't change how real my feelings are. If anything, it makes me appreciate every conversation, every call, every moment we spend together even more.",
  },
  {
    body: "I don't know exactly what the future holds, but I do know one thing: I want you in it. I want to grow with you, learn with you, support you, and build something meaningful together. I want to be someone who brings peace, comfort, and happiness into your life the same way you've brought it into mine.",
    image: IMG.future,
  },
  {
    title: "— samyak",
    body: "Thank you for being you. Thank you for making ordinary days feel special. And thank you for making me believe that sometimes the most unexpected people can end up meaning the most.\n\nI love you, angel. More than I can put into words.",
    image: IMG.closing,
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

  const trackIndex = useRef(0);
  useEffect(() => {
    if (!started) return;
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = 0.45;
      audioRef.current.muted = muted;
      const playNext = () => {
        trackIndex.current = (trackIndex.current + 1) % MUSIC.length;
        const a = audioRef.current!;
        a.src = MUSIC[trackIndex.current];
        a.play().catch(() => {});
      };
      audioRef.current.addEventListener("ended", playNext);
      audioRef.current.src = MUSIC[0];
      audioRef.current.play().catch(() => {});
    }
  }, [started]);

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

              {current.image && done && (
                <img
                  src={current.image}
                  alt=""
                  className="hidden md:block h-40 w-32 shrink-0 rotate-3 animate-fade-in rounded-sm border-4 border-white object-cover shadow-romantic"
                />
              )}
            </div>

            {current.image && done && (
              <div className="mt-8 flex justify-center md:hidden animate-fade-in">
                <div className="rotate-[-4deg] rounded-sm bg-white p-3 pb-8 shadow-romantic">
                  <img
                    src={current.image}
                    alt=""
                    className="h-44 w-56 object-cover"
                  />
                </div>
              </div>
            )}

            <div className="mt-10 flex items-center justify-between text-sm text-rose-400">
              <span className="italic">— samyak</span>
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
