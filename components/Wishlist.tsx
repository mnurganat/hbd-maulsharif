"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { WISHLIST_ITEMS } from "@/config/event";

type ClaimedMap = Record<string, { claimed: boolean; claimedAt: unknown }>;

const STORAGE_KEY = "hbd_claimed_items";

function getClaimedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function addClaimedId(id: string) {
  const ids = getClaimedIds();
  if (!ids.includes(id)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids, id]));
  }
}

function removeClaimedId(id: string) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(getClaimedIds().filter((i) => i !== id))
  );
}

function WishlistCard({
  item,
  claimed,
  isMine,
  onClaim,
  onUnclaim,
}: {
  item: (typeof WISHLIST_ITEMS)[number];
  claimed: boolean;
  isMine: boolean;
  onClaim: () => Promise<void>;
  onUnclaim: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  async function handle() {
    if (claimed && !isMine) return;
    if (claimed && isMine) {
      if (!confirm("Освободить эту позицию?")) return;
      setLoading(true);
      try { await onUnclaim(); } finally { setLoading(false); }
      return;
    }
    setLoading(true);
    try { await onClaim(); } finally { setLoading(false); }
  }

  return (
    <div className={`neon-card rounded-2xl p-5 flex flex-col gap-3 transition-opacity ${claimed && !isMine ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
          claimed
            ? "text-[#9d7cc8] border-[#3d0060] bg-[#1a002a]"
            : "text-[#39ff14] border-[#39ff1440] bg-[#39ff1408]"
        }`}>
          {claimed ? "занято ✓" : "свободно"}
        </span>
        {isMine && claimed && (
          <span className="text-[#ffd700] text-xs">это ты забронировал</span>
        )}
      </div>

      <h3 className="font-display font-bold text-[#f0e6ff] text-base leading-snug">
        {item.title}
      </h3>

      <p className="text-[#9d7cc8] text-sm leading-relaxed">{item.description}</p>

      <div className="flex items-center gap-3 mt-1 flex-wrap">
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00e5ff] text-xs border border-[#00e5ff40] rounded-full px-3 py-1 hover:border-[#00e5ff] transition-colors"
          >
            🔗 Посмотреть
          </a>
        )}

        {(!claimed || isMine) && (
          <button
            onClick={handle}
            disabled={loading}
            className={`ml-auto text-sm font-bold px-5 py-2 rounded-full transition-all disabled:opacity-50 ${
              claimed && isMine
                ? "border border-[#9d7cc8] text-[#9d7cc8] hover:border-[#ff2d78] hover:text-[#ff2d78]"
                : "bg-gradient-to-r from-[#ff2d78] to-[#bf00ff] text-white btn-glow hover:opacity-90"
            }`}
          >
            {loading ? "..." : claimed && isMine ? "Освободить" : "Забронировать 🎁"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Wishlist() {
  const [claimedMap, setClaimedMap] = useState<ClaimedMap>({});
  const [myIds, setMyIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMyIds(getClaimedIds());
    const unsub = onSnapshot(collection(db, "hbd_wishlist"), (snap) => {
      const map: ClaimedMap = {};
      snap.docs.forEach((d) => { map[d.id] = d.data() as ClaimedMap[string]; });
      setClaimedMap(map);
      setReady(true);
    });
    return () => unsub();
  }, []);

  async function claim(id: string) {
    await setDoc(doc(db, "hbd_wishlist", id), {
      claimed: true,
      claimedAt: serverTimestamp(),
    });
    addClaimedId(id);
    setMyIds(getClaimedIds());
  }

  async function unclaim(id: string) {
    await setDoc(doc(db, "hbd_wishlist", id), {
      claimed: false,
      claimedAt: null,
    });
    removeClaimedId(id);
    setMyIds(getClaimedIds());
  }

  const freeCount = WISHLIST_ITEMS.filter((i) => !claimedMap[i.id]?.claimed).length;

  // Sort: free first
  const sorted = [...WISHLIST_ITEMS].sort((a, b) =>
    Number(claimedMap[a.id]?.claimed ?? false) - Number(claimedMap[b.id]?.claimed ?? false)
  );

  return (
    <section id="wishlist" className="relative z-10 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#9d7cc8] text-xs tracking-[0.3em] uppercase mb-3">идеи подарков</p>
          <h2 className="font-display font-black text-3xl md:text-4xl glow-gold text-[#ffd700]">
            Вишлист 🎁
          </h2>
          {ready && (
            <p className="mt-3 text-[#9d7cc8] text-sm">
              {freeCount > 0 ? (
                <><span className="text-[#39ff14]">{freeCount}</span> позиций ещё свободно</>
              ) : (
                <span className="text-[#ff2d78]">Все позиции забронированы 🎉</span>
              )}
            </p>
          )}
        </div>

        <div className="neon-card rounded-xl px-4 py-3 mb-8 text-sm text-[#9d7cc8] text-center">
          Кликни «Забронировать» — и эта идея станет твоей. Имена не сохраняются.
        </div>

        {!ready ? (
          <div className="text-center text-[#9d7cc8] py-12">Загружаем список...</div>
        ) : (
          <div className="flex flex-col gap-4">
            {sorted.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                claimed={claimedMap[item.id]?.claimed ?? false}
                isMine={myIds.includes(item.id)}
                onClaim={() => claim(item.id)}
                onUnclaim={() => unclaim(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
