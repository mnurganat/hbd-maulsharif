import { EVENT } from "@/config/event";

export default function EventTimeline() {
  return (
    <section id="program" className="relative z-10 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-[#9d7cc8] text-xs tracking-[0.3em] uppercase mb-3">программа вечера</p>
          <h2 className="font-display font-black text-3xl md:text-4xl glow-pink text-[#ff2d78]">
            24 июля 🗓️
          </h2>
          <p className="mt-3 text-[#9d7cc8] text-sm">
            Дресс-код: <span className="text-[#f0e6ff]">{EVENT.dresscode}</span>
          </p>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-6">
          {EVENT.venues.map((venue, i) => (
            <div key={venue.id} className="flex flex-col items-center">
              {/* Connector line above (except first) */}
              {i > 0 && (
                <div className="timeline-line w-0.5 h-8 rounded-full mb-0" />
              )}

              {/* Emoji badge */}
              <div className="w-14 h-14 rounded-full neon-card flex items-center justify-center text-2xl mb-4">
                {venue.emoji}
              </div>

              {/* Card — centered */}
              <div className="neon-card rounded-2xl p-6 w-full text-center hover:scale-[1.01] transition-transform">
                {/* Time */}
                <div className="flex items-center justify-center gap-3 flex-wrap mb-3">
                  <span className="font-display font-bold text-[#ffd700] text-2xl glow-gold">
                    {venue.time}
                  </span>
                  {venue.until && (
                    <>
                      <span className="text-[#9d7cc8]">→</span>
                      <span className="text-[#9d7cc8]">{venue.until}</span>
                    </>
                  )}
                  {!venue.until && (
                    <span className="text-[#9d7cc8] text-sm">и далее ночь 🌙</span>
                  )}
                </div>

                {/* Venue name */}
                <h3 className="font-display font-bold text-[#f0e6ff] text-xl mb-1">
                  {venue.name}
                </h3>

                {/* Role */}
                <p className="text-[#bf00ff] text-sm mb-4">{venue.role}</p>

                {/* Address + maps */}
                <p className="text-[#9d7cc8] text-sm mb-3">{venue.address}</p>
                <a
                  href={venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#00e5ff] text-xs border border-[#00e5ff40] rounded-full px-4 py-1.5 hover:border-[#00e5ff] hover:glow-cyan transition-colors"
                >
                  📍 Google Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
