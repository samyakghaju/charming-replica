import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon, Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Will you go on a date with me? 💌" },
      { name: "description", content: "A little question, just for you." },
    ],
  }),
  component: Index,
});

const TIME_SLOTS = ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];

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

  const yesScale = Math.min(1 + step * 0.25, 3.5);
  const label = NO_LABELS[Math.min(step, NO_LABELS.length - 1)];

  return (
    <div className="relative w-full max-w-xl">
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

          <div className="relative mt-16 flex min-h-40 w-full items-center justify-center">
            <Button
              size="lg"
              type="button"
              onClick={onYes}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-romantic origin-center"
              style={{
                transform: `scale(${yesScale})`,
                transition: "transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              Yes 💖
            </Button>
          </div>
        </div>
      </Card>

      {/* No button fixed to bottom-right of the screen, always visible */}
      <Button
        size="lg"
        variant="outline"
        type="button"
        onClick={() => setStep((s) => Math.min(s + 1, NO_LABELS.length - 1))}
        className="fixed bottom-8 right-8 z-50 border-destructive/40 bg-card text-destructive hover:bg-destructive/10 whitespace-normal max-w-[280px] shadow-romantic"
      >
        {label}
      </Button>
    </div>
  );
}

function StepPick({
  onConfirm,
}: {
  onConfirm: (d: { date: Date; time: string; place: string }) => void;
}) {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const [place, setPlace] = useState<string>("");

  const ready = date && time;

  return (
    <Card className="w-full max-w-lg border-primary/20 bg-card/80 p-8 backdrop-blur-sm shadow-romantic">
      <div className="text-center">
        <Sparkles className="mx-auto h-10 w-10 text-primary" />
        <h2 className="mt-3 font-display text-3xl font-bold">Yay! When are you free?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Pick a day, a time, and where you'd like to go.</p>
      </div>

      <div className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Time</label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger>
              <SelectValue placeholder="Pick a time" />
            </SelectTrigger>
            <SelectContent>
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Where? (optional)</label>
          <Input
            placeholder="That little café you love…"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>

        <Button
          size="lg"
          disabled={!ready}
          onClick={() => onConfirm({ date: date!, time, place })}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-romantic"
        >
          It's a date 💕
        </Button>
      </div>
    </Card>
  );
}

function StepDone({
  details,
  onBack,
}: {
  details: { date: Date; time: string; place: string };
  onBack: () => void;
}) {
  return (
    <Card className="w-full max-w-lg border-primary/20 bg-card/80 p-10 text-center backdrop-blur-sm shadow-romantic">
      <div className="relative mx-auto mb-4 inline-block">
        <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/40 blur-2xl" />
        <Heart className="relative h-16 w-16 text-primary animate-heartbeat" fill="currentColor" />
      </div>
      <h2 className="font-display text-4xl font-bold">It's a date!</h2>
      <p className="mt-2 text-muted-foreground">I can't wait. Counting the minutes already.</p>

      <div className="mt-8 space-y-2 rounded-xl border border-primary/20 bg-secondary/40 p-6 text-left">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">When</p>
        <p className="text-lg font-semibold">
          {format(details.date, "EEEE, MMMM d, yyyy")} at {details.time}
        </p>
        {details.place && (
          <>
            <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Where</p>
            <p className="text-lg font-semibold">{details.place}</p>
          </>
        )}
      </div>

      <button
        onClick={onBack}
        className="mt-6 text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
      >
        Change details
      </button>
    </Card>
  );
}

function Index() {
  const [step, setStep] = useState<"ask" | "pick" | "done">("ask");
  const [details, setDetails] = useState<{ date: Date; time: string; place: string } | null>(null);

  useEffect(() => {
    if (step === "done") {
      // tiny celebration: nothing fancy, hearts already float
    }
  }, [step]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-romantic px-4 py-12">
      <FloatingHearts />
      <div className="relative z-10 flex w-full justify-center">
        {step === "ask" && <StepAsk onYes={() => setStep("pick")} />}
        {step === "pick" && (
          <StepPick
            onConfirm={(d) => {
              setDetails(d);
              setStep("done");
            }}
          />
        )}
        {step === "done" && details && (
          <StepDone details={details} onBack={() => setStep("pick")} />
        )}
      </div>
    </main>
  );
}
