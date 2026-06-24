import { useState } from "react";
import { Heart } from "lucide-react";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1100);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative h-72 w-[28rem] max-w-[92vw] cursor-pointer select-none"
        onClick={handleOpen}
      >
        {/* Envelope body */}
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-rose-100 to-rose-200 shadow-romantic" />

        {/* Letter peeking out */}
        <div
          className={`absolute left-4 right-4 rounded-sm bg-[#fffaf5] px-6 py-4 font-display italic text-rose-700 shadow transition-all duration-1000 ${
            opening ? "-translate-y-40 opacity-100" : "top-6 opacity-90"
          }`}
          style={{ top: opening ? "1rem" : "1.5rem" }}
        >
          <p className="text-sm">to: angel 🌹</p>
          <p className="mt-1 text-xs text-rose-500">from: samyak</p>
        </div>

        {/* Bottom flap */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 rounded-b-md bg-gradient-to-br from-rose-200 to-rose-300"
          style={{ clipPath: "polygon(0 30%, 100% 30%, 100% 100%, 0 100%)" }}
        />

        {/* Side flaps */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 bg-rose-200/80"
          style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-rose-200/80"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
        />

        {/* Top flap (opens up) */}
        <div
          className="absolute inset-x-0 top-0 h-1/2 origin-top bg-gradient-to-b from-rose-300 to-rose-200 transition-transform duration-1000"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transform: opening ? "rotateX(180deg)" : "rotateX(0deg)",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Wax seal */}
        <div
          className={`absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-rose-700 shadow-lg transition-all duration-500 ${
            opening ? "scale-0 opacity-0 rotate-45" : "scale-100"
          }`}
          style={{
            boxShadow: "inset 0 -3px 6px rgba(0,0,0,0.3), 0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <Heart className="h-7 w-7 text-rose-100" fill="currentColor" />
        </div>
      </div>

      <p className="animate-pulse font-display italic text-rose-600">
        {opening ? "opening…" : "tap to open 💌"}
      </p>
    </div>
  );
}
