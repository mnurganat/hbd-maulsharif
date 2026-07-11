"use client";

import { useEffect, useRef } from "react";

export default function Stars() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const count = 120;
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2.5 + 0.5;
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        --dur: ${Math.random() * 3 + 2}s;
        --delay: ${Math.random() * 4}s;
      `;
      container.appendChild(star);
    }
    return () => { container.innerHTML = ""; };
  }, []);

  return <div ref={containerRef} className="stars" aria-hidden />;
}
