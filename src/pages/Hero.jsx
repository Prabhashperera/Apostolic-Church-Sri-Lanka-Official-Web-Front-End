import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { slides } from "../data/HomePageData";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const slide = slides[currentSlide];

  return (
    <section className="w-full overflow-hidden">

      {/* ================================================= */}
      {/* DESKTOP HERO                                      */}
      {/* ================================================= */}

      <div className="relative hidden h-[calc(100vh-5rem)] min-h-[600px] w-full lg:block">

        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >

            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
              <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">

                <div className="flex min-h-[360px] max-w-5xl flex-col justify-center text-white">

                  {/* Small heading */}
                  <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#88c5cc]">
                    Apostolic Church Sri Lanka
                  </p>

                  {/* Main heading */}
                  <h1 className="whitespace-nowrap text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-200 sm:text-lg md:text-xl">
                    {slide.description}
                  </p>

                  {/* Button */}
                  <div className="mt-8">
                    <Link
                      to={slide.buttonLink}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#13233b] transition hover:bg-[#88c5cc]"
                    >
                      {slide.buttonText}

                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                </div>

              </div>
            </div>
          </div>
        ))}

        {/* Desktop Previous */}
        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/40"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Desktop Next */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/40"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        {/* Desktop Dots */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>

      </div>


      {/* ================================================= */}
      {/* MOBILE HERO                                       */}
      {/* ================================================= */}

      <div className="block bg-white lg:hidden">

        {/* Image */}
        <div className="relative h-[280px] w-full overflow-hidden sm:h-[360px]">

          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Mobile Previous */}
          <button
            onClick={previousSlide}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          {/* Mobile Next */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

        </div>


        {/* Mobile Content */}
        <div className="px-6 py-8">

          {/* Small heading */}
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2a7384]">
            Apostolic Church Sri Lanka
          </p>

          {/* Mobile title */}
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#13233b] sm:text-4xl">
            {slide.title}
          </h1>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-gray-600 sm:text-base">
            {slide.description}
          </p>

          {/* Button */}
          <Link
            to={slide.buttonLink}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#13233b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d3557]"
          >
            {slide.buttonText}

            <ArrowRight className="h-4 w-4" />
          </Link>


          {/* Mobile Dots */}
          <div className="mt-7 flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-[#13233b]"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;