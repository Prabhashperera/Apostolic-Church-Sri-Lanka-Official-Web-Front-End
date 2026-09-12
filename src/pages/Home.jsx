import Hero from "./Hero";
import Introduction from "./Introdcution";
import Regions from "./Regions";

export default function Home() {
  return (
    <div className="bg-white">

      <div className="">
        <Hero />
        <Introduction />
        <Regions />
      </div>
    </div>
  );
}