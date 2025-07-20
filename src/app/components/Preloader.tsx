import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Preloader() {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let start: number | null = null;
    let req: number;
    const duration = 1200; // ms for one full loop

    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const circumference = 2 * Math.PI * 120; // r=120
      if (circleRef.current) {
        circleRef.current.style.strokeDasharray = `${circumference}`;
        circleRef.current.style.strokeDashoffset = `${circumference * (1 - progress)}`;
      }
      if (progress < 1) {
        req = requestAnimationFrame(animate);
      } else {
        // Loop
        start = null;
        req = requestAnimationFrame(animate);
      }
    }
    req = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(req);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ background: "#c7a256" }}>
      <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>
        {/* Animated SVG Circle */}
        <svg width={260} height={260} className="absolute top-0 left-0" style={{ transform: "rotate(-90deg)" }}>
          <circle
            ref={circleRef}
            cx={130}
            cy={130}
            r={120}
            fill="none"
            stroke="#fff"
            strokeWidth={3}
            strokeLinecap="round"
          />
        </svg>
        {/* Logo in the center */}
        <div className="flex items-center ml-15 justify-center w-[160px] h-[60px] z-10">
          <Image src="/images/preloader.svg" alt="Toux Properties Logo" width={160} height={60} />
        </div>
      </div>
      <div className="mt-6 text-white text-base font-normal text-center">Loading</div>
    </div>
  );
}
