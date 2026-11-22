import Link from "next/link";

type WordmarkProps = {
  tone?: "dark" | "light";
};

export function Wordmark({ tone = "dark" }: WordmarkProps) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      aria-label="AuraSync home"
      className="inline-flex items-center gap-2.5"
    >
      <span
        aria-hidden="true"
        className={[
          "grid size-9 place-items-center rounded-full border",
          isLight ? "border-cream/25" : "border-ink/15",
        ].join(" ")}
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none">
          <circle
            cx="12"
            cy="12"
            r="8.25"
            stroke={isLight ? "var(--cream)" : "var(--ink)"}
            strokeOpacity="0.35"
            strokeWidth="1"
          />
          <path
            d="M4.5 12c1.9-3.2 4-3.2 7 0s5.1 3.2 7 0"
            stroke={isLight ? "var(--amber)" : "var(--clay)"}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span
        className={[
          "font-display text-lg tracking-[0.16em]",
          isLight ? "text-cream" : "text-ink",
        ].join(" ")}
      >
        AURASYNC
      </span>
    </Link>
  );
}
