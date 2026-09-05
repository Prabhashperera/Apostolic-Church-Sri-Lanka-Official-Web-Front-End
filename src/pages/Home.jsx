import Hero from "./Hero";
import Introduction from "./Introdcution";

export default function Home() {
  return (
    <div className="bg-white">

      <div className="">
        <Hero />
        <Introduction />
      </div>
    </div>
  );
}