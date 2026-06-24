import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Notebook } from "@/components/Notebook";
import { Envelope } from "@/components/Envelope";
import { Heart, Sparkles, PartyPopper } from "lucide-react";
import { Card } from "@/components/ui/card";

type Response = { answer: "yes" | "no"; at: string };

function recordResponse(answer: "yes" | "no") {
  try {
    const key = "angel-letter-responses";
    const log: Response[] = JSON.parse(localStorage.getItem(key) || "[]");
    log.push({ answer, at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(log));
    // Also log to console so you can see it in DevTools
    console.log("💌 Response recorded:", answer, "— all responses:", log);
  } catch (e) {
    console.warn("Could not record response", e);
  }
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Will you go on a date with me? 💌" },
      { name: "description", content: "A little question, just for you." },
    ],
  }),
  component: Index,
});



function FloatingHearts() {
  const hearts = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((_, i) => (
        <Heart
          key={i}
          className="absolute text-primary/60 animate-float"
          style={{
            left: `${(i * 7.3) % 100}%`,
            bottom: `-40px`,
            width: `${16 + (i % 4) * 8}px`,
            height: `${16 + (i % 4) * 8}px`,
            animationDelay: `${(i % 7) * 0.6}s`,
            animationDuration: `${6 + (i % 5)}s`,
          }}
          fill="currentColor"
        />
      ))}
    </div>
  );
}

const NO_LABELS = [
  "No",
  "Are you sure?",
  "What if I asked really nicely?",
  "Pretty please?",
  "With a chocolate rice on top?",
  "What about a matcha frostie?",
  "Please pookie 🥺",
  "But :(",
  "I'm going to die",
  "Yep, I'm dead 💀",
  "Ok, you're talking to Samyak's ghost",
  "Boo. The ghost is begging now",
  "From beyond the grave: please?",
  "Last wish: just say yes 🌹",
];

function StepAsk({ onYes }: { onYes: () => void }) {
  const [step, setStep] = useState(0);

  const yesFontSize = Math.min(1 + step * 0.4, 5); // rem
  const label = NO_LABELS[Math.min(step, NO_LABELS.length - 1)];

  return (
    <div className="relative w-full max-w-3xl">
      <Card className="relative overflow-visible border-primary/20 bg-card/80 p-10 backdrop-blur-sm shadow-romantic">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/30 blur-2xl" />
            <Heart className="relative h-20 w-20 text-primary animate-heartbeat" fill="currentColor" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Will you go on a date with me?
          </h1>
          <p className="mt-3 text-muted-foreground">No pressure. Well… maybe a little. 🌹</p>

          <div className="mt-12 flex w-full items-center justify-center gap-4">
            <button
              type="button"
              onClick={onYes}
              className="rounded-md bg-green-500 px-4 py-2 font-semibold text-white shadow-romantic transition-all hover:bg-green-600"
              style={{
                fontSize: `${yesFontSize}rem`,
                lineHeight: 1.1,
                transition: "font-size 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              Yes
            </button>

            <button
              type="button"
              onClick={() => setStep((s) => Math.min(s + 1, NO_LABELS.length - 1))}
              className="shrink-0 rounded-md bg-red-500 px-4 py-2 text-base font-semibold text-white whitespace-normal max-w-[240px] hover:bg-red-600"
            >
              {label}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function StepCongrats() {
  return (
    <Card className="w-full max-w-lg border-primary/20 bg-card/80 p-10 text-center backdrop-blur-sm shadow-romantic">
      <div className="relative mx-auto mb-4 inline-block">
        <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/40 blur-2xl" />
        <PartyPopper className="relative h-16 w-16 text-primary animate-heartbeat" />
      </div>
      <h2 className="font-display text-4xl font-bold">Congratulations to us! 🎉</h2>
      <p className="mt-3 text-muted-foreground">
        You said yes. I am the luckiest. Here's to us, angel — to every conversation,
        every laugh, and every moment still to come. 💕
      </p>

      <div className="mt-8 rounded-xl border border-primary/20 bg-secondary/40 p-6">
        <Sparkles className="mx-auto mb-2 h-6 w-6 text-primary" />
        <p className="font-display text-2xl italic text-rose-700">us. officially.</p>
        <p className="mt-2 text-sm text-muted-foreground">— samyak & angel</p>
      </div>
    </Card>
  );
}

function StepRejected({ onReset }: { onReset: () => void }) {
  return (
    <Card className="w-full max-w-lg border-primary/20 bg-card/80 p-10 text-center backdrop-blur-sm shadow-romantic">
      <p className="font-display text-3xl">okay… 🥲</p>
      <p className="mt-3 text-muted-foreground">
        I'll always be here, angel. No pressure, ever.
      </p>
      <button
        onClick={onReset}
        className="mt-6 text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
      >
        start over
      </button>
    </Card>
  );
}

function Index() {
  const [step, setStep] = useState<"envelope" | "notebook" | "ask" | "yes" | "no">("envelope");

  useEffect(() => {
    try {
      const log = JSON.parse(localStorage.getItem("angel-letter-responses") || "[]");
      if (log.length) console.log("💌 Past responses:", log);
    } catch {}
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-romantic px-4 py-12">
      <FloatingHearts />
      <div className="relative z-10 flex w-full justify-center">
        {step === "envelope" && <Envelope onOpen={() => setStep("notebook")} />}
        {step === "notebook" && <Notebook onDone={() => setStep("ask")} />}
        {step === "ask" && (
          <StepAsk
            onYes={() => {
              recordResponse("yes");
              setStep("yes");
            }}
          />
        )}
        {step === "yes" && <StepCongrats />}
        {step === "no" && <StepRejected onReset={() => setStep("ask")} />}
      </div>
    </main>
  );
}

