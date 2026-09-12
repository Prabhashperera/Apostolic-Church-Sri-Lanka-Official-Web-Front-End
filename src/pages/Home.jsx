import Hero from "./Hero";
import Introduction from "./Introdcution";
import Leader from "./Leader";
import Regions from "./Regions";

export default function Home() {
  return (
    <div className="bg-white">

      <div className="">
        <Hero />
        <Introduction />
        <Regions />
        <Leader />
      </div>
    </div>
  );
}