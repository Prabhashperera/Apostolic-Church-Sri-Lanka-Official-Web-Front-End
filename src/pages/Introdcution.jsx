import { useEffect, useRef, useState } from "react";
import { introHeading, introParagraphs } from "../data/HomePageData";

export default function Introduction() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden px-6 py-20 sm:px-8 sm:py-24 md:px-12 md:py-28 lg:px-20 lg:py-32 ${
        isVisible ? "intro-visible" : ""
      }`}
    >
      <style>{`
        @keyframes introRise {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .intro-rise {
          opacity: 0;
          animation: introRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-play-state: paused;
        }
        .intro-visible .intro-rise { animation-play-state: running; }

        @keyframes introMark { from { width: 0%; } to { width: 100%; } }
        .intro-mark { position: relative; }
        .intro-mark::before {
          content: "";
          position: absolute;
          left: -0.15em;
          right: -0.15em;
          bottom: 0.06em;
          height: 0.32em;
          background: rgba(29, 78, 216, 0.16);
          border-radius: 2px;
          z-index: -1;
          width: 0%;
          animation: introMark 0.7s ease-out forwards;
          animation-play-state: paused;
          animation-delay: 0.45s;
        }
        .intro-visible .intro-mark::before { animation-play-state: running; }

        @media (prefers-reduced-motion: reduce) {
          .intro-rise { animation: none !important; opacity: 1 !important; transform: none !important; }
          .intro-mark::before { animation: none !important; width: 100% !important; }
        }
      `}</style>

      {/* Giant decorative quotation mark — one quiet atmospheric flourish */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none font-serif text-[14rem] font-black leading-none text-[#0c1322]/[0.03] sm:text-[20rem] md:text-[24rem]"
      >
        “
      </span>

      <div className="relative mx-auto max-w-7xl text-center">

        {/* Kicker */}
        <div className="intro-rise mx-auto mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#1d4ed8]" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1d4ed8]">
            Who We Are
          </span>
          <span className="h-px w-8 bg-[#1d4ed8]" />
        </div>

        <h2
          className="text-3xl font-extrabold leading-tight tracking-tight text-[#0c1322] sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {introHeading.map((part, i) => (
            <span
              key={i}
              className={`intro-rise inline-block ${part.highlight ? "intro-mark text-[#1d4ed8]" : ""}`}
              style={{ animationDelay: `${120 + i * 90}ms` }}
            >
              {part.text}
            </span>
          ))}
        </h2>

        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-sm font-light leading-relaxed text-gray-500 sm:mt-9 sm:text-base md:text-lg">
          {introParagraphs.map((paragraph, i) => (
            <p
              key={i}
              className="intro-rise"
              style={{ animationDelay: `${380 + i * 140}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}