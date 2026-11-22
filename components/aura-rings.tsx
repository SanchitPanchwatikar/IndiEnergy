export function AuraRings() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div
        aria-hidden="true"
        className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_38%_32%,rgba(232,163,61,0.32),transparent_62%)] blur-2xl"
      />

      <svg
        viewBox="0 0 400 400"
        role="img"
        aria-label="Abstract illustration of layered signal rings and a waveform"
        className="relative h-auto w-full"
      >
        <defs>
          <linearGradient id="ring-fade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--clay)" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="wave-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="var(--amber)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--clay)" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="var(--cream)"
          strokeOpacity="0.12"
        />
        <circle
          cx="200"
          cy="200"
          r="118"
          fill="none"
          stroke="var(--sage)"
          strokeOpacity="0.4"
          strokeDasharray="3 10"
          className="slow-spin"
        />
        <circle
          cx="200"
          cy="200"
          r="84"
          fill="none"
          stroke="url(#ring-fade)"
          strokeWidth="1.2"
        />
        <circle
          cx="200"
          cy="200"
          r="54"
          fill="none"
          stroke="var(--cream)"
          strokeOpacity="0.14"
          strokeDasharray="1 7"
          className="slow-spin-reverse"
        />

        <path
          d="M70 200c22-34 42-34 64 0s42 34 64 0 42-34 64 0 42 34 68 0"
          fill="none"
          stroke="url(#wave-fade)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M70 224c22-18 42-18 64 0s42 18 64 0 42-18 64 0 42 18 68 0"
          fill="none"
          stroke="var(--sage)"
          strokeOpacity="0.22"
          strokeWidth="1"
          strokeLinecap="round"
        />

        <circle cx="200" cy="200" r="4" fill="var(--amber)" />
        <circle cx="134" cy="200" r="2.5" fill="var(--clay)" />
        <circle cx="266" cy="200" r="2.5" fill="var(--sage)" />
      </svg>
    </div>
  );
}
