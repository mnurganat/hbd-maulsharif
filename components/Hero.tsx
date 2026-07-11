"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/config/event";

function calcCountdown(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  const days    = Math.floor(diff / 86_400_000);
  const hours   = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000)  / 60_000);
  const seconds = Math.floor((diff % 60_000)     / 1_000);
  return { days, hours, minutes, seconds, passed: false };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="countdown-digit rounded-xl px-4 py-3 min-w-[72px] text-center">
        <span className="font-display font-black text-4xl md:text-5xl glow-gold text-[#ffd700] tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-[#9d7cc8] uppercase tracking-widest">{label}</span>
    </div>
  );
}

const CONFETTI = [
  { emoji: "✨", left: 3,  dur: 6.0,  delay: 0.0, size: 1.0 },
  { emoji: "🌟", left: 15, dur: 6.7,  delay: 0.5, size: 1.5 },
  { emoji: "💫", left: 27, dur: 7.4,  delay: 1.0, size: 2.0 },
  { emoji: "🎉", left: 40, dur: 8.1,  delay: 1.5, size: 1.0 },
  { emoji: "🎊", left: 54, dur: 8.8,  delay: 2.0, size: 1.5 },
  { emoji: "⭐", left: 66, dur: 9.5,  delay: 2.5, size: 2.0 },
  { emoji: "🥳", left: 78, dur: 10.2, delay: 3.0, size: 1.0 },
  { emoji: "🎈", left: 91, dur: 10.9, delay: 3.5, size: 1.5 },
];

export default function Hero() {
  const [countdown, setCountdown] = useState<ReturnType<typeof calcCountdown> | null>(null);

  useEffect(() => {
    setCountdown(calcCountdown(EVENT.banquetDate));
    const id = setInterval(() => setCountdown(calcCountdown(EVENT.banquetDate)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 z-10">
      {/* Floating confetti */}
      <div aria-hidden>
        {CONFETTI.map((c, i) => (
          <span
            key={i}
            className="confetti-piece select-none"
            style={{
              left: `${c.left}%`,
              "--dur": `${c.dur}s`,
              "--delay": `${c.delay}s`,
              "--size": `${c.size}rem`,
            } as React.CSSProperties}
          >
            {c.emoji}
          </span>
        ))}
      </div>

      {/* Top label */}
      <p className="text-[#9d7cc8] text-sm tracking-[0.3em] uppercase mb-6 glow-purple">
        ты приглашён
      </p>

      {/* Main title */}
      <h1 className="glitch font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-4">
        <span className="rainbow-text">С Днём</span>
        <br />
        <span className="rainbow-text">Рождения,</span>
        <br />
        <span className="text-white glow-pink" style={{ WebkitTextFillColor: "white" }}>
          {EVENT.name}!
        </span>
      </h1>

      {/* Birthday date */}
      <p className="mt-6 text-[#bf00ff] glow-purple font-display font-bold text-xl md:text-2xl">
        🎂 {EVENT.birthday}
      </p>

      {/* Divider */}
      <div className="mt-10 mb-8 w-px h-12 mx-auto bg-gradient-to-b from-transparent via-[#bf00ff] to-transparent" />

      {/* Countdown label */}
      <p className="text-[#9d7cc8] text-sm tracking-widest uppercase mb-6">
        {countdown?.passed ? "Праздник начался!" : "До начала банкета"}
      </p>

      {/* Countdown */}
      {countdown && !countdown.passed && (
        <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
          <Digit value={countdown.days}    label="дней" />
          <Digit value={countdown.hours}   label="часов" />
          <Digit value={countdown.minutes} label="минут" />
          <Digit value={countdown.seconds} label="секунд" />
        </div>
      )}
      {!countdown && (
        <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
          {["дней","часов","минут","секунд"].map((l) => (
            <div key={l} className="flex flex-col items-center gap-2">
              <div className="countdown-digit rounded-xl px-4 py-3 min-w-[72px] text-center">
                <span className="font-display font-black text-4xl md:text-5xl text-[#ffd700] tabular-nums opacity-30">--</span>
              </div>
              <span className="text-xs text-[#9d7cc8] uppercase tracking-widest">{l}</span>
            </div>
          ))}
        </div>
      )}

      {/* Banquet info */}
      <div className="mt-10 neon-card rounded-2xl px-8 py-4 inline-block">
        <p className="text-[#f0e6ff] text-base">
          <span className="text-[#ffd700]">24 июля 2026</span>
          <span className="text-[#9d7cc8] mx-3">·</span>
          <span className="text-[#00e5ff]">18:30</span>
          <span className="text-[#9d7cc8] mx-3">·</span>
          <span className="text-[#bf00ff]">Алматы</span>
        </p>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#9d7cc8]">
        <span className="text-xs tracking-widest uppercase">листай вниз</span>
        <span className="animate-bounce text-[#bf00ff]">↓</span>
      </div>
    </section>
  );
}
