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
    body: "open this. i wrote you something.\n(don't peek at the end yet.)\n\nseriously. don't scroll. i'll know.",
  },
  {
    body: "okay so. i've been thinking. like, a lot. mostly about you. mostly at 2am. mostly about the way you type — the little things you say and how you say them. i don't know how someone can make a screen feel warm but you somehow do that.\n\nyou ever talk to someone online and it just feels different? like there's something on the other side that's actually, genuinely real? that's you. that's what talking to you feels like.",
    doodle: "/notebook/sticker-bear.png",
  },
  {
    body: "we've only talked through a screen. i know that. and maybe that sounds like 'not enough' to some people.\n\nbut pablo neruda once wrote — 'i want to do with you what spring does with the cherry trees.' and i read that and thought — yeah. that. i want to bring something out in you. i want to be something good in your life. even from here. even like this.\n\nyou already make my days better just by existing in them.",
  },
  {
    body: "i want to know more about you. and i mean that properly, not just your favorite color or whatever.\n\ni want to know what makes you laugh at 1am. what song you've had on repeat for three weeks. what you think about right before you fall asleep. what made you who you are.\n\nsocrates said that 'the unexamined life is not worth living' — and i think about that a lot. but also — i want to examine your life with you. slowly. over time. all of it.",
    doodle: "/notebook/sticker-heart.png",
  },
  {
    title: "a tiny confession from yumyum",
    body: "here's the part i practiced.\n\ni know you've been hurt before. i don't know the whole story and i won't pretend to. but i can see it — the way you hold back sometimes, the way you don't let things land too easy. and i get it. when someone breaks your trust, you rebuild walls. that makes sense.\n\nbut i want you to know something — and i mean this genuinely, not as a line — i know i can treat you better. not because i'm perfect. but because you deserve someone who actually tries. and i want to be that.",
    photo: true,
  },
  {
    body: "simone de beauvoir wrote — 'there is something in the nature of love that demands development, a searching out of the other.'\n\nand that's exactly it. i'm not saying i have you figured out. i'm saying i want to figure you out. every part. the loud parts, the quiet parts, the parts you don't show people right away.\n\ni want to know the version of you that exists at 3am. the version that's tired and real and not performing anything. i think that version is incredible.",
    doodle: "/notebook/sticker-bear.png",
  },
  {
    body: "here's what i want, honestly.\n\ni want the boring stuff. i want to be the person you send a random meme to at noon because you knew i'd get it. i want to be on the other side of a voice note that's way too long and not mind a single second of it. i want grocery list conversations and 'what should i eat' debates and falling asleep mid-call.\n\nthe little ordinary things. with you specifically. because ordinary things stop being ordinary when it's the right person.",
    doodle: "/notebook/sticker-heart.png",
  },
  {
    body: "rainer maria rilke wrote — 'once the realization is accepted that even between the closest human beings infinite distances continue, a wonderful living side by side can grow.'\n\ni think about that a lot when it comes to you. we don't have to have everything figured out. we don't have to rush or know where this goes. i just want to keep talking. keep knowing you. keep being someone you feel safe enough to be honest with.\n\nthat's all. no pressure in that. just — i like where this is going.",
  },
  {
    body: "and simi — you are so damn beautiful. inside and out. and i say that having only known you through a screen, which should tell you something.\n\nthe way you think, the way you phrase things, the way you respond — there's something so genuine about you. genuinely beautiful. not in a hollow compliment way. in a 'i notice it and i keep noticing it' way.\n\ni don't think you hear that enough. and i don't think the people before me said it the way it was supposed to be said.",
    doodle: "/notebook/sticker-heart.png",
  },
  {
    title: "okay. the brave page.",
    body: "maybe it's a little soon to say all of this. maybe i'm supposed to play it cool for longer and not let on that i think about our conversations way more than i probably should.\n\nbut albert camus wrote — 'the only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.' and okay that's not directly about feelings but — i think there's something brave about being honest. about saying the thing instead of sitting on it forever.\n\nso here it is: i really like you. i want to know more of you. and i think, if you let me, i could be really good to you.",
    photo: true,
  },
  {
    body: "no pressure. none at all. i'm not asking for anything big or scary.\n\njust — keep talking to me. tell me something i don't know about you. let me keep showing up in your notifications like a persistent little bear who genuinely means well.\n\nbecause the truth is — even just getting to talk to you is something. and i don't take that lightly.",
    doodle: "/notebook/sticker-bear.png",
  },
  {
    title: "— yumyum 🐻",
    body: "p.s. the tiny bear is a self portrait. he is nervous but sincere.\np.p.s. i really, really like you, simisimi.\np.p.p.s. okay closing the journal now before i write something even more embarrassing.",
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
