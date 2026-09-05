import Hero from "./Hero";

export default function Home() {
  return (
    <div className="bg-white">

      <div className="px-4 py-6 mx-auto space-y-12 md:space-y-16 md:px-8 md:py-10 max-w-7xl">
        <Hero />
      </div>
    </div>
  );
}