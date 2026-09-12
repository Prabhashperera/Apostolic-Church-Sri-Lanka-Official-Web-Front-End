import React from "react";
import RegionCard from "../components/Usables/RegionCard";
import { churchRegions } from "../data/ChurchRegionData";

function Regions() {
  return (
    <section className="w-full bg-white px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-20 lg:py-24">

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1d4ed8]">
              Our Church Network
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#0c1322] sm:text-4xl md:text-5xl">
              Churches Across Sri Lanka
            </h2>

            <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-gray-500 sm:text-base">
              A growing family of believers serving communities across
              different regions of Sri Lanka.
            </p>
          </div>

          {/* Total */}
          <div className="flex items-center gap-4 md:text-right">
            <div>
              <p className="text-4xl font-extrabold leading-none text-[#0c1322] sm:text-5xl">
                86
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-400">
                Churches
              </p>
            </div>
          </div>

        </div>

        {/* Cards */}
        <div className="mt-10 flex gap-5 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">

          {churchRegions.map((region) => (
            <RegionCard
              key={region.name}
              name={region.name}
              churches={region.churches}
              image={region.image}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default Regions;