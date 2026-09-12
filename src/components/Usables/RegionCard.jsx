import { ArrowUpRight } from "lucide-react";

function RegionCard({ name, churches, image }) {
  return (
    <div className="group relative h-[380px] min-w-[280px] overflow-hidden rounded-[24px] sm:h-[420px] md:min-w-0">
      
      {/* Background Image */}
      <img
        src={image}
        alt={name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">

        {/* Region */}
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
          Region
        </p>

        <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {name}
        </h3>

        {/* Church Count */}
        <div className="mt-5 flex items-end gap-2">
          <span className="text-5xl font-extrabold leading-none text-white sm:text-6xl">
            {churches}
          </span>

          <span className="mb-1 text-sm font-light text-white/70">
            Churches
          </span>
        </div>

        {/* Button */}
        <button className="mt-6 flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#0c1322] transition-all duration-300 group-hover:bg-[#1d4ed8] group-hover:text-white">
          View Churches
          <ArrowUpRight size={15} />
        </button>

      </div>
    </div>
  );
}

export default RegionCard;