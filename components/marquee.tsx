/** Infinite scrolling band of words. Pauses on hover; static with reduced motion. */
export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-display text-[clamp(2rem,1.4rem+3vw,4.5rem)] leading-none whitespace-nowrap italic md:px-10">{t}</span>
          <svg width="22" height="18" viewBox="0 0 16 16" className="shrink-0 text-accent" aria-hidden="true">
            <path d="M1 2 L8 13 L15 2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee overflow-hidden py-8 md:py-12 ${className}`}>
      <p className="sr-only">{items.join(", ")}</p>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
