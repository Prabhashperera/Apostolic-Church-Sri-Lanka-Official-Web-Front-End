import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { slides } from "../data/HomePageData";

const SLIDE_DURATION = 6000; // ms — also drives the progress bar fill

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  const previousSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const goToSlide = (index) => setCurrentSlide(index);

  // Swipe support for touch devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta > 0 ? previousSlide() : nextSlide();
    }
    touchStartX.current = null;
  };

  const active = slides[currentSlide];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0d1b2f]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&display=swap');
        .hero-serif { font-family: 'Fraunces', serif; }

        @keyframes heroFill { from { width: 0%; } to { width: 100%; } }
        .hero-progress-fill { animation: heroFill ${SLIDE_DURATION}ms linear forwards; }

        @keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
        .hero-zoom { animation: heroZoom ${SLIDE_DURATION + 1500}ms ease-out forwards; }

        @keyframes heroRise {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-rise { animation: heroRise 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @media (prefers-reduced-motion: reduce) {
          .hero-zoom, .hero-rise, .hero-progress-fill { animation: none !important; }
        }
      `}</style>

      <div className="relative flex h-[92vh] min-h-[560px] w-full items-center justify-center sm:h-[86vh] lg:h-[calc(100vh-5rem)]">

        {/* Slides — all rendered, crossfaded via opacity */}
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.image}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`h-full w-full object-cover ${isActive ? "hero-zoom" : ""}`}
                />
              </div>
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
            </div>
          );
        })}

        {/* Centered content — the "big words" moment, re-triggered per slide via key */}
        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center text-white lg:px-8">
          <p
            key={`eyebrow-${currentSlide}`}
            className="hero-rise text-xs font-semibold uppercase tracking-[0.35em] text-[#7dd0d9] sm:text-sm"
          >
            Apostolic Church Sri Lanka
          </p>

          <h1
            key={`title-${currentSlide}`}
            className="hero-serif hero-rise mt-5 font-semibold leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.75rem, 9vw, 7rem)", animationDelay: "0.12s" }}
          >
            {active.title}
          </h1>

          <p
            key={`desc-${currentSlide}`}
            className="hero-rise mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            style={{ animationDelay: "0.24s" }}
          >
            {active.description}
          </p>

          <div key={`btn-${currentSlide}`} className="hero-rise mt-9" style={{ animationDelay: "0.36s" }}>
            <Link
              to={active.buttonLink}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0d1b2f] transition-colors duration-300 hover:bg-[#7dd0d9]"
            >
              {active.buttonText}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Arrows — desktop / pointer devices; mobile relies on swipe */}
        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white backdrop-blur transition hover:border-white/60 hover:bg-white/10 sm:flex lg:left-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white backdrop-blur transition hover:border-white/60 hover:bg-white/10 sm:flex lg:right-8"
        >
          <ArrowRight className="h-4 w-4" />
        </button>

        {/* Progress bars — replace plain dots, and drive autoplay via onAnimationEnd */}
        <div className="absolute bottom-6 left-1/2 z-20 flex w-full max-w-xs -translate-x-1/2 gap-2 px-6 sm:bottom-8 sm:max-w-sm">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/25"
            >
              {index === currentSlide && (
                <span
                  key={`fill-${currentSlide}`}
                  onAnimationEnd={nextSlide}
                  className={`hero-progress-fill absolute inset-y-0 left-0 block h-full bg-white ${
                    isPaused ? "[animation-play-state:paused]" : ""
                  }`}
                />
              )}
              {index < currentSlide && (
                <span className="absolute inset-0 block h-full bg-white/70" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;