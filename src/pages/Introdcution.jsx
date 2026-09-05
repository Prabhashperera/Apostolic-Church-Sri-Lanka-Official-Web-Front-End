import { introHeading, introParagraphs } from "../data/HomePageData";

export default function Introduction() {
  return (
    <section className="w-full px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-7xl text-center">
        <h2
          className="text-lg font-extrabold leading-tight tracking-tight text-[#0c1322] sm:text-xl md:text-3xl lg:text-4xl"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {introHeading.map((part, i) => (
            <span key={i} className={part.highlight ? "text-[#1d4ed8]" : ""}>
              {part.text}
            </span>
          ))}
        </h2>

        <div className="mx-auto mt-6 max-w-6xl space-y-5 text-sm font-light leading-relaxed text-gray-500 sm:mt-7 sm:text-base md:text-lg lg:text-xl">
          {introParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
