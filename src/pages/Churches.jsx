import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  MapPin,
  Phone,
  Smartphone,
  Users,
  ChevronDown,
  Church as ChurchIcon,
  X,
} from "lucide-react";
import { regions, areas, churches } from "../data/ChurchesData";
// ^ adjust this path to wherever ChurchesData.js actually lives in your project
//   (it mirrors the "../../data/HomePageData" pattern already used in Navbar.jsx)

// Presentation-only metadata: colour + an approximate point on the stylised
// island map for each region. Position is illustrative (north-to-south order
// is accurate; exact coastline is not) since the source data has no
// coordinates to plot from.
const REGION_META = {
  "Colombo Region": { color: "#13233B", tint: "#EEF1F6", hub: { x: 68, y: 318 } },
  "Wennappuwa Region": { color: "#0F7A6B", tint: "#EAF5F2", hub: { x: 76, y: 182 } },
  "Jaffna Region": { color: "#B15E33", tint: "#FBEEE6", hub: { x: 100, y: 55 } },
};
const BEACON = "#E8A33D";

const QUICK_CITIES = ["Colombo", "Negombo", "Kandy", "Jaffna", "Trincomalee", "Vavuniya"];

function telHref(number) {
  return `tel:${number.replace(/[^\d+]/g, "")}`;
}
function mapsHref(query) {
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}
function hubRadius(count) {
  return 8 + Math.sqrt(count) * 1.7;
}

export default function Churches() {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [openRegions, setOpenRegions] = useState(() => new Set([regions[0]?.name]));
  const [docked, setDocked] = useState(false);
  const [activeHub, setActiveHub] = useState(null);
  const heroRef = useRef(null);
  const regionRefs = useRef({});
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setDocked(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const isFiltering = query.trim().length > 0 || selectedRegion !== "all";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return churches.filter((c) => {
      if (selectedRegion !== "all" && c.region !== selectedRegion) return false;
      if (!q) return true;
      const haystack = [c.name, c.area, c.region, c.division, c.ministerInCharge, c.address]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, selectedRegion]);

  const grouped = useMemo(() => {
    return regions
      .map((region) => {
        const regionAreas = areas
          .filter((a) => a.region === region.name)
          .map((area) => {
            const areaChurches = filtered
              .filter((c) => c.area === area.name && c.region === region.name)
              .sort((a, b) => a.no - b.no);
            if (areaChurches.length === 0) return null;

            const divisionsSeen = [];
            const byDivision = {};
            areaChurches.forEach((c) => {
              const key = c.division || "__none__";
              if (!byDivision[key]) {
                byDivision[key] = [];
                divisionsSeen.push(key);
              }
              byDivision[key].push(c);
            });

            return {
              ...area,
              divisions: divisionsSeen.map((key) => ({
                name: key === "__none__" ? null : key,
                churches: byDivision[key],
              })),
              count: areaChurches.length,
            };
          })
          .filter(Boolean);

        if (regionAreas.length === 0) return null;
        return {
          ...region,
          areas: regionAreas,
          count: regionAreas.reduce((n, a) => n + a.count, 0),
        };
      })
      .filter(Boolean);
  }, [filtered]);

  const toggleRegion = (name) => {
    setOpenRegions((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const jumpToRegion = (name) => {
    setSelectedRegion(name);
    setActiveHub(name);
    requestAnimationFrame(() => {
      regionRefs.current[name]?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* ================= HERO ================= */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#0E1B2E]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-8 lg:py-20">
          {/* Copy + search */}
          <div>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-lg text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.6rem]"
            >
              Wherever you are on the island, there's a church nearby.
            </motion.h1>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mt-4 max-w-md text-sm text-white/60 sm:text-base"
            >
              Search 86 congregations across three regions, or pick a beacon on the map to see
              who leads there.
            </motion.p>

            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="mt-8 flex items-center gap-2 rounded-full bg-white p-2 shadow-xl shadow-black/20 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-[#E8A33D]"
            >
              <Search className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city, town, or church..."
                className="w-full bg-transparent px-1 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="mr-1 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {QUICK_CITIES.map((city) => (
                <motion.button
                  key={city}
                  whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                  onClick={() => setQuery(city)}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/75 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                >
                  {city}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Beacon map */}
          <div className="relative mx-auto w-full max-w-[280px] lg:max-w-none">
            <svg viewBox="0 0 200 440" className="mx-auto h-[320px] w-auto lg:h-[380px]" aria-hidden="true">
              <path
                d="M100,10 C150,10 175,70 178,140 C182,230 170,320 145,390 C130,425 115,435 100,435 C85,435 70,425 55,390 C30,320 18,230 22,140 C25,70 50,10 100,10 Z"
                fill="#16273F"
                stroke="#2C4468"
                strokeWidth="1.5"
              />
              {regions.map((region) => {
                const meta = REGION_META[region.name];
                if (!meta) return null;
                const r = hubRadius(region.churchCount);
                const isActive = activeHub === region.name;
                return (
                  <g
                    key={region.name}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveHub(region.name)}
                    onMouseLeave={() => setActiveHub(null)}
                    onClick={() => jumpToRegion(region.name)}
                  >
                    {!reduceMotion && (
                      <motion.circle
                        cx={meta.hub.x}
                        cy={meta.hub.y}
                        r={r}
                        fill={BEACON}
                        initial={{ opacity: 0.45, scale: 1 }}
                        animate={{ opacity: [0.4, 0], scale: [1, 1.9] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                        style={{ transformOrigin: `${meta.hub.x}px ${meta.hub.y}px` }}
                      />
                    )}
                    <circle
                      cx={meta.hub.x}
                      cy={meta.hub.y}
                      r={r}
                      fill={BEACON}
                      opacity={isActive ? 1 : 0.9}
                    />
                    <circle cx={meta.hub.x} cy={meta.hub.y} r={r * 0.4} fill="#0E1B2E" opacity={0.85} />
                  </g>
                );
              })}
            </svg>

            <AnimatePresence>
              {activeHub && REGION_META[activeHub] && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-2 w-56 -translate-x-1/2 rounded-xl bg-white p-3 text-left shadow-2xl lg:left-auto lg:right-0 lg:translate-x-0"
                >
                  <p className="text-sm font-bold text-[#13233B]">{activeHub}</p>
                  {regions.find((r) => r.name === activeHub)?.regionalPastor && (
                    <p className="mt-0.5 text-xs text-gray-500">
                      {regions.find((r) => r.name === activeHub).regionalPastor}
                    </p>
                  )}
                  <p className="mt-1 text-xs font-medium" style={{ color: REGION_META[activeHub].color }}>
                    {regions.find((r) => r.name === activeHub)?.churchCount} churches · tap to view
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-2 text-center text-[11px] text-white/35 lg:text-left">
              Stylised map for orientation, not to scale.
            </p>
          </div>
        </div>
      </section>

      {/* ================= DOCKED SEARCH BAR ================= */}
      <AnimatePresence>
        {docked && (
          <motion.div
            initial={{ y: -56, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -56, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 px-4 py-2.5 backdrop-blur"
          >
            <div className="mx-auto flex max-w-6xl items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5">
              <Search className="h-4 w-4 flex-shrink-0 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by city, town, or church..."
                className="w-full bg-transparent py-1 text-sm text-gray-800 outline-none placeholder:text-gray-400"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search" className="text-gray-400 hover:text-gray-600">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FILTERS + RESULTS ================= */}
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRegion("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedRegion === "all"
                  ? "bg-[#13233B] text-white"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:text-[#13233B]"
              }`}
            >
              All regions
            </button>
            {regions.map((r) => {
              const meta = REGION_META[r.name];
              const active = selectedRegion === r.name;
              return (
                <button
                  key={r.name}
                  onClick={() => setSelectedRegion(active ? "all" : r.name)}
                  className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium ring-1 transition"
                  style={
                    active
                      ? { backgroundColor: meta?.color, color: "white", borderColor: meta?.color }
                      : { backgroundColor: "white", color: "#4B5563", borderColor: "#E5E7EB" }
                  }
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: active ? "white" : meta?.color }}
                  />
                  {r.name}
                </button>
              );
            })}
          </div>

          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-[#13233B]">{filtered.length}</span> of{" "}
            {churches.length} churches
          </p>
        </div>

        <div className="mt-8 space-y-5">
          {grouped.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
              <ChurchIcon className="mx-auto h-8 w-8 text-gray-300" />
              <p className="mt-3 text-sm font-medium text-gray-600">No churches match "{query}"</p>
              <p className="mt-1 text-sm text-gray-400">
                Try a nearby town name, or clear the search to browse by region.
              </p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {grouped.map((region) => {
              const meta = REGION_META[region.name] || { color: "#13233B", tint: "#F1F2F4" };
              const isOpen = isFiltering || openRegions.has(region.name);
              return (
                <motion.div
                  key={region.name}
                  ref={(el) => (regionRefs.current[region.name] = el)}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="scroll-mt-20 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"
                >
                  <button
                    onClick={() => !isFiltering && toggleRegion(region.name)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-9 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: meta.color }} />
                      <div>
                        <p className="text-base font-bold text-[#13233B]">{region.name}</p>
                        {region.regionalPastor && (
                          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                            <Users className="h-3.5 w-3.5" />
                            Regional Pastor: {region.regionalPastor}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-3">
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{ backgroundColor: meta.tint, color: meta.color }}
                      >
                        {region.count} {region.count === 1 ? "church" : "churches"}
                      </span>
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </motion.span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="border-t border-gray-100"
                      >
                        <div className="space-y-6 px-5 pb-5 pt-5 sm:px-6">
                          {region.areas.map((area) => (
                            <div key={area.name}>
                              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                <p className="text-sm font-semibold text-gray-800">{area.name}</p>
                                {area.areaPastor && (
                                  <p className="text-xs text-gray-500">
                                    Area Pastor: {area.areaPastor}
                                    {area.areaPastorMobile && (
                                      <>
                                        {" "}
                                        ·{" "}
                                        <a href={telHref(area.areaPastorMobile)} className="hover:text-[#13233B]">
                                          {area.areaPastorMobile}
                                        </a>
                                      </>
                                    )}
                                  </p>
                                )}
                              </div>

                              {area.divisions.map((division) => (
                                <div key={division.name || "none"} className="mt-2">
                                  {division.name && (
                                    <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">
                                      {division.name}
                                    </p>
                                  )}
                                  <motion.div
                                    initial="hidden"
                                    animate="show"
                                    variants={{
                                      hidden: {},
                                      show: { transition: { staggerChildren: reduceMotion ? 0 : 0.025 } },
                                    }}
                                    className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-100"
                                  >
                                    {division.churches.map((church) => (
                                      <ChurchRow key={church.id} church={church} color={meta.color} reduceMotion={reduceMotion} />
                                    ))}
                                  </motion.div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ChurchRow({ church, color, reduceMotion }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: reduceMotion ? 0 : 6 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-2 bg-white px-4 py-3 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: color }} />
        <div>
          <p className="text-sm font-semibold text-[#13233B]">{church.name}</p>
          {church.ministerInCharge && <p className="text-xs text-gray-600">{church.ministerInCharge}</p>}
          {church.associateMinisters.length > 0 && (
            <p className="text-xs text-gray-400">
              with {church.associateMinisters.map((m) => m.name).join(", ")}
            </p>
          )}
          {church.address && (
            <a
              href={mapsHref(church.address)}
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex items-start gap-1 text-xs text-gray-500 hover:text-[#13233B]"
            >
              <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span>{church.address}</span>
            </a>
          )}
        </div>
      </div>

      {(church.churchPhone || church.mobile) && (
        <div className="flex flex-shrink-0 flex-wrap gap-x-4 gap-y-1 pl-4 sm:pl-0">
          {church.churchPhone && (
            <a href={telHref(church.churchPhone)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#13233B]">
              <Phone className="h-3.5 w-3.5" />
              {church.churchPhone}
            </a>
          )}
          {church.mobile && (
            <a href={telHref(church.mobile)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#13233B]">
              <Smartphone className="h-3.5 w-3.5" />
              {church.mobile}
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}