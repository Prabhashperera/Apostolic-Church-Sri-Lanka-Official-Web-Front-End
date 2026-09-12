import React from "react";
import RegionCard from "../components/Usables/RegionCard";
import { churchRegions } from "../data/ChurchRegionData";

function Regions() {
  return (
    <section className="w-full bg-[#f4ff8f] px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1d4ed8]">
            Our Church Network
          </p>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0c1322] sm:text-4xl md:text-5xl lg:text-6xl">
            Churches Across Sri Lanka
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-gray-500 sm:text-base md:text-lg">
            A growing family of believers, united in faith, worship, and
            service across communities throughout Sri Lanka.
          </p>

        </div>

        {/* Total Churches */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-4 rounded-full border border-gray-200 bg-white px-6 py-3 shadow-sm">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0c1322]">
              <span className="text-sm font-bold text-white">
                86
              </span>
            </div>

            <div className="text-left">
              <p className="text-sm font-bold leading-none text-[#0c1322]">
                Churches
              </p>

              <p className="mt-1 text-xs font-light text-gray-400">
                Across our regions
              </p>
            </div>

          </div>
        </div>

        {/* Region Cards */}
        <div className="mt-14">

          <div className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">

            {churchRegions.map((region) => (
              <div
                key={region.name}
                className="w-[82vw] shrink-0 snap-center sm:w-[60vw] md:w-auto"
              >
                <RegionCard
                  name={region.name}
                  churches={region.churches}
                  image={region.image}
                />
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Regions;