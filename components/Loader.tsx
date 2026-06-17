// components/Loader.tsx
export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-7">

        {/* Spinning ring + A lettermark */}
        <div className="relative w-14 h-14">
          <svg className="absolute inset-0 animate-spin"
            style={{ animationDuration: '1.6s', animationTimingFunction: 'linear' }}
            width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
            <circle cx="28" cy="28" r="25" stroke="#E8E4DD" strokeWidth="2"/>
            <path d="M28 3 A25 25 0 0 1 51 28" stroke="#B71E52" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-[22px] text-[#B71E52]">
            A
          </div>
        </div>

        {/* Shimmer skeleton lines */}
        <div className="flex flex-col items-center gap-2.5 w-48">
          <div className="h-3 bg-[#E8E4DD] rounded-full w-40 animate-pulse" />
          <div className="h-2.5 bg-[#E8E4DD] rounded-full w-28 animate-pulse [animation-delay:150ms]" />
          <div className="h-2.5 bg-[#E8E4DD] rounded-full w-36 animate-pulse [animation-delay:300ms]" />
        </div>

        {/* Label */}
        <p className="font-mono-dm text-[11px] tracking-[0.12em] uppercase text-stone-400 animate-pulse">
          Loading
        </p>
      </div>
    </div>
  )
}