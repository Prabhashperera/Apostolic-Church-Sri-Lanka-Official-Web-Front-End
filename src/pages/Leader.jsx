import React, { useEffect, useRef, useState } from "react";
import pastorImage from "../assets/images/pas-shehan.jpg";
import leaderData from "../data/LeaderData";

function Leader() {
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
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const reveal = (delay = "") =>
    `transition-all duration-700 ease-out ${delay} motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#fcfcfc] to-[#dcecfd] px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-20 lg:py-28"
    >
      <style>{`
        .leader-blob {
          border-radius: 62% 38% 53% 47% / 42% 47% 53% 58%;
          transition: border-radius 0.8s ease, transform 0.6s ease;
        }
        .leader-blob:hover {
          border-radius: 46% 54% 60% 40% / 55% 40% 60% 45%;
          transform: scale(1.02);
        }
        @media (prefers-reduced-motion: reduce) {
          .leader-blob { transition: none; }
        }
        @keyframes leaderDrift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(14px, -18px); }
        }
      `}</style>

      {/* Ambient background — one slow, quiet gesture, not a scattered effect */}
      <div className="pointer-events-none absolute -top-16 right-[-4rem] h-72 w-72 rounded-full bg-[#1d4ed8]/10 blur-3xl motion-safe:animate-[leaderDrift_14s_ease-in-out_infinite] motion-reduce:animate-none" />
      <div className="pointer-events-none absolute bottom-[-5rem] left-[-3rem] h-64 w-64 rounded-full bg-[#93c5fd]/20 blur-3xl motion-safe:animate-[leaderDrift_18s_ease-in-out_infinite] motion-reduce:animate-none" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

        {/* Portrait panel — order-first on mobile, right column on desktop */}
        <div className="order-1 lg:order-2">
          <div className={`relative mx-auto max-w-md pb-6 pr-6 pt-4 sm:pr-8 lg:max-w-none ${reveal()}`}>

            {/* Dashed accent ring, offset behind the blob */}
            <div className="leader-blob pointer-events-none absolute -inset-4 z-0 border-2 border-dashed border-[#1d4ed8]/30 sm:-inset-6" />

            {/* Photo, masked into an organic blob, true natural color, responds gently on hover */}
            <div className="leader-blob relative z-10 aspect-[4/5] cursor-default overflow-hidden shadow-[0_25px_60px_-20px_rgba(29,78,216,0.45)]">
              <img
                src={pastorImage}
                alt={leaderData.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Content — name, position, and a single long-form paragraph */}
        <div className="order-2 lg:order-1">
          <h2 className={`text-3xl font-extrabold leading-tight tracking-tight text-[#0c1322] sm:text-4xl md:text-5xl ${reveal()}`}>
            {leaderData.name}
          </h2>

          <div className={`mt-4 flex items-center gap-3 ${reveal("delay-150")}`}>
            <span
              className={`h-px bg-[#1d4ed8] transition-all delay-300 duration-700 ease-out motion-reduce:w-9 motion-reduce:transition-none ${
                isVisible ? "w-9" : "w-0"
              }`}
            />
            <p className="text-base font-medium text-[#1d4ed8]">{leaderData.position}</p>
          </div>

          <p
            className={`mt-8 max-w-xl text-[15px] leading-[1.9] text-gray-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-[#1d4ed8] sm:text-base ${reveal(
              "delay-300"
            )}`}
          >
            {leaderData.description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Leader;