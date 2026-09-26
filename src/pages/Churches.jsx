import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoMercator } from "d3-geo";
// ^ `d3-geo` is already a dependency of react-simple-maps, but add it to your
//   own package.json too (`npm install d3-geo`) so it doesn't rely on npm's
//   hoisting to be resolvable here.
import {
  Search,
  MapPin,
  Phone,
  Smartphone,
  Users,
  ChevronDown,
  ChevronLeft,
  Landmark,
  Waves,
  Compass,
  ArrowRight,
  X,
} from "lucide-react";
import { regions, areas, churches } from "../data/ChurchesData";
// ^ adjust this path to wherever ChurchesData.js actually lives in your project
import sriLankaGeo from "../data/sriLanka.geo.json";
// ^ save the sriLanka.geo.json file next to ChurchesData.js (or wherever you
//   keep static data) and adjust this path to match. This is Sri Lanka's own
//   feature pulled out of the `world-atlas` dataset, bundled with the app —
//   no runtime fetch to a CDN, so it can't fail silently on a blocked or
//   offline network the way a live `fetch()` to a CDN can.
//
// Dependency: `npm install react-simple-maps`
// (it wraps d3-geo; no separate d3 install is needed)

// Presentation-only metadata: colour, icon, a short label, and the real
// [longitude, latitude] of a representative town for each region, so the
// marker sits on its actual place on the map rather than an eyeballed point.
const REGION_META = {
  "Colombo Region": {
    color: "#13233B",
    tint: "#EEF1F6",
    icon: Landmark,
    shortName: "Colombo",
    coordinates: [79.8612, 6.9271], // Colombo
  },
  "Wennappuwa Region": {
    color: "#0F7A6B",
    tint: "#EAF5F2",
    icon: Waves,
    shortName: "Wennappuwa",
    coordinates: [79.8833, 7.3667], // Wennappuwa
  },
  "Jaffna Region": {
    color: "#B15E33",
    tint: "#FBEEE6",
    icon: Compass,
    shortName: "Jaffna",
    coordinates: [80.0255, 9.6615], // Jaffna
  },
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
  return 5 + Math.sqrt(count) * 1.1;
}

// The map's own coordinate space — must match the width/height passed to
// ComposableMap below.
const MAP_WIDTH = 280;
const MAP_HEIGHT = 420;
const MAP_SIDE_PADDING = 14;
// Jaffna's marker sits near the top of the island, and its label is drawn
// above the marker (like the others). With even padding on all sides, that
// label's top edge landed above y=0 — outside the visible viewBox — so it
// got clipped in half. Extra padding here on the top edge only pushes the
// whole island down just enough to leave clearance for that label.
const MAP_TOP_PADDING = 46;

// Rather than guessing a `scale`/`center` for geoMercator (easy to get
// wrong by 2-3x, which pushes the whole island outside the visible
// viewBox), fit the projection to Sri Lanka's actual bounding geometry so
// it reliably lands inside the frame.
//
// Important: this must be the *built* d3 projection object itself, computed
// once here — not a function that builds and returns one when called.
// react-simple-maps checks `typeof projection === "function"` and, if so,
// uses that value directly as the projection (calling it with [lng, lat] to
// get back [x, y]). A factory function is itself a function, so it passes
// that check and gets called with coordinates instead of being invoked to
// produce a projection — which returns the wrong kind of value entirely and
// crashes when <Marker> tries to destructure the result as [x, y].
const sriLankaProjection = geoMercator().fitExtent(
  [
    [MAP_SIDE_PADDING, MAP_TOP_PADDING],
    [MAP_WIDTH - MAP_SIDE_PADDING, MAP_HEIGHT - MAP_SIDE_PADDING],
  ],
  sriLankaGeo
);

// Hover doesn't exist on a touchscreen, so a tooltip that only appears on
// mouseenter is simply invisible on phones. This detects a coarse/no-hover
// pointer so the map can show its labels up front there instead of gating
// them behind a hover that will never fire.
function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsCoarse(mq.matches);
    const handler = (e) => setIsCoarse(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return isCoarse;
}

function buildGrouped(list) {
  return regions
    .map((region) => {
      const regionAreas = areas
        .filter((a) => a.region === region.name)
        .map((area) => {
          const areaChurches = list
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
}

export default function Churches() {
  const [query, setQuery] = useState("");
  const [selectedRegionName, setSelectedRegionName] = useState(null);
  const [browseAll, setBrowseAll] = useState(false);
  const [activeHub, setActiveHub] = useState(null);
  const reduceMotion = useReducedMotion();

  const view = query.trim() ? "search" : selectedRegionName ? "region" : browseAll ? "all" : "home";

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  const goHome = () => {
    setQuery("");
    setSelectedRegionName(null);
    setBrowseAll(false);
    setActiveHub(null);
    scrollTop();
  };

  const selectRegion = (name) => {
    setQuery("");
    setBrowseAll(false);
    setSelectedRegionName(name);
    setActiveHub(name);
    scrollTop();
  };

  const openBrowseAll = () => {
    setQuery("");
    setSelectedRegionName(null);
    setBrowseAll(true);
    scrollTop();
  };

  const filteredChurches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return churches.filter((c) => {
      if (selectedRegionName && c.region !== selectedRegionName) return false;
      if (!q) return true;
      const haystack = [c.name, c.area, c.region, c.division, c.ministerInCharge, c.address]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, selectedRegionName]);

  // Guaranteed to be non-empty whenever a real region name is passed in,
  // since it's derived straight from the same `regions`/`areas`/`churches`
  // arrays the picker itself was built from.
  const grouped = useMemo(() => buildGrouped(filteredChurches), [filteredChurches]);

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {view === "home" ? (
        <HomeHero
          query={query}
          setQuery={setQuery}
          activeHub={activeHub}
          setActiveHub={setActiveHub}
          onSelectRegion={selectRegion}
          reduceMotion={reduceMotion}
        />
      ) : (
        <CompactHeader
          query={query}
          setQuery={setQuery}
          view={view}
          selectedRegionName={selectedRegionName}
          onBack={goHome}
          resultCount={filteredChurches.length}
        />
      )}

      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        {view === "home" && (
          <>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-bold text-[#13233B]">Browse by region</h2>
              <button
                onClick={openBrowseAll}
                className="text-sm font-medium text-gray-500 underline-offset-2 hover:text-[#13233B] hover:underline"
              >
                Or see all {churches.length} churches
              </button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {regions.map((region) => (
                <RegionCard
                  key={region.name}
                  region={region}
                  meta={REGION_META[region.name]}
                  onClick={() => selectRegion(region.name)}
                />
              ))}
            </div>
          </>
        )}

        {view !== "home" && <ResultsPanel grouped={grouped} reduceMotion={reduceMotion} query={query} />}
      </div>
    </div>
  );
}

function HomeHero({ query, setQuery, activeHub, setActiveHub, onSelectRegion, reduceMotion }) {
  const isTouch = useIsCoarsePointer();
  return (
    <section className="relative overflow-hidden bg-[#0E1B2E]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-8 lg:py-20">
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
            86 congregations across three regions. Search a town, or pick a region to see who
            leads there.
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

        {/* Beacon map — a real Sri Lanka outline, not a drawn approximation */}
        <div className="relative mx-auto w-full max-w-[280px] lg:max-w-none">
          <ComposableMap
            projection={sriLankaProjection}
            width={MAP_WIDTH}
            height={MAP_HEIGHT}
            style={{ width: "100%", height: "auto" }}
            className="mx-auto lg:h-[400px]"
          >
            <Geographies geography={sriLankaGeo}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#16273F"
                    stroke="#2C4468"
                    strokeWidth={0.7}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#1B2E4A" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {regions.map((region) => {
              const meta = REGION_META[region.name];
              if (!meta) return null;
              const r = hubRadius(region.churchCount);
              const isActive = activeHub === region.name;
              // On a phone there is no hover, so the label is always shown
              // instead of waiting for a mouseenter that will never come.
              const showLabel = isTouch || isActive;
              return (
                <Marker
                  key={region.name}
                  coordinates={meta.coordinates}
                  onClick={() => onSelectRegion(region.name)}
                  onMouseEnter={() => !isTouch && setActiveHub(region.name)}
                  onMouseLeave={() => !isTouch && setActiveHub((h) => (h === region.name ? null : h))}
                  style={{ default: { cursor: "pointer" } }}
                >
                  {!reduceMotion && (
                    <motion.circle
                      r={r}
                      fill={BEACON}
                      initial={{ opacity: 0.45, scale: 1 }}
                      animate={{ opacity: [0.4, 0], scale: [1, 2.1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <circle r={r} fill={BEACON} opacity={isActive || isTouch ? 1 : 0.9} />
                  <circle r={r * 0.4} fill="#0E1B2E" opacity={0.85} />

                  {showLabel && (
                    <g transform={`translate(0, ${-(r + 19)})`}>
                      <rect x={-40} y={-14} width={80} height={28} rx={7} fill="white" fillOpacity={0.97} />
                      <text x={0} y={-2} textAnchor="middle" fontSize={9} fontWeight={700} fill={meta.color}>
                        {meta.shortName}
                      </text>
                      <text x={0} y={9} textAnchor="middle" fontSize={7} fill="#6b7280">
                        {region.churchCount} churches
                      </text>
                    </g>
                  )}
                </Marker>
              );
            })}
          </ComposableMap>

          <p className="mt-2 text-center text-[11px] text-white/35 lg:text-left">
            {isTouch ? "Tap a beacon to view that region." : "Hover or tap a beacon to view that region."}
          </p>
        </div>
      </div>
    </section>
  );
}

function CompactHeader({ query, setQuery, view, selectedRegionName, onBack, resultCount }) {
  const meta = selectedRegionName ? REGION_META[selectedRegionName] : null;
  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
        <button
          onClick={onBack}
          className="flex flex-shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-[#13233B]"
        >
          <ChevronLeft className="h-4 w-4" />
          All regions
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5">
          <Search className="h-4 w-4 flex-shrink-0 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              view === "region" ? `Search within ${selectedRegionName}...` : "Search by city, town, or church..."
            }
            className="w-full bg-transparent py-1 text-sm text-gray-800 outline-none placeholder:text-gray-400"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear search" className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <span
          className="flex-shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: meta ? meta.tint : "#EEF1F6",
            color: meta ? meta.color : "#13233B",
          }}
        >
          {resultCount} {resultCount === 1 ? "church" : "churches"}
        </span>
      </div>
    </div>
  );
}

function RegionCard({ region, meta, onClick }) {
  const Icon = meta?.icon || Landmark;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="group flex flex-col rounded-2xl bg-white p-5 text-left ring-1 ring-gray-100 transition-shadow hover:shadow-lg"
      style={{ boxShadow: "none" }}
    >
      <div className="flex items-center justify-between">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: meta.tint, color: meta.color }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <ArrowRight className="h-4 w-4 text-gray-300 transition group-hover:translate-x-1 group-hover:text-[#13233B]" />
      </div>
      <p className="mt-4 text-base font-bold text-[#13233B]">{region.name}</p>
      {region.regionalPastor && (
        <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
          <Users className="h-3.5 w-3.5 flex-shrink-0" />
          {region.regionalPastor}
        </p>
      )}
      <span
        className="mt-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold"
        style={{ backgroundColor: meta.tint, color: meta.color }}
      >
        {region.churchCount} churches
      </span>
    </motion.button>
  );
}

function ResultsPanel({ grouped, reduceMotion, query }) {
  if (grouped.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
        <Search className="mx-auto h-8 w-8 text-gray-300" />
        <p className="mt-3 text-sm font-medium text-gray-600">No churches match "{query}"</p>
        <p className="mt-1 text-sm text-gray-400">Try a nearby town name, or clear the search.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {grouped.map((region) => {
        const meta = REGION_META[region.name] || { color: "#13233B", tint: "#F1F2F4" };
        return (
          <div key={region.name}>
            {grouped.length > 1 && (
              <div className="mb-3 flex items-center gap-2">
                <span className="h-6 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: meta.color }} />
                <p className="text-sm font-bold text-[#13233B]">{region.name}</p>
                <span className="text-xs text-gray-400">
                  {region.count} {region.count === 1 ? "church" : "churches"}
                </span>
              </div>
            )}
            <div className="space-y-6">
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
                      <div className="grid gap-2 sm:grid-cols-2">
                        {division.churches.map((church) => (
                          <ChurchCard key={church.id} church={church} color={meta.color} reduceMotion={reduceMotion} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ChurchCard({ church, color, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-2.5 rounded-xl border border-gray-100 bg-white p-4 transition-colors hover:border-gray-200"
      style={{ borderLeftWidth: 3, borderLeftColor: color }}
    >
      <div>
        <p className="text-sm font-bold text-[#13233B]">{church.name}</p>
        {church.ministerInCharge && (
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-600">
            <Users className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
            {church.ministerInCharge}
          </p>
        )}
        {church.associateMinisters.length > 0 && (
          <p className="mt-0.5 pl-5 text-xs text-gray-400">
            with {church.associateMinisters.map((m) => m.name).join(", ")}
          </p>
        )}
      </div>

      {church.address && (
        <a
          href={mapsHref(church.address)}
          target="_blank"
          rel="noreferrer"
          className="flex items-start gap-1.5 text-xs text-gray-500 hover:text-[#13233B]"
        >
          <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          <span>{church.address}</span>
        </a>
      )}

      {(church.churchPhone || church.mobile) && (
        <div className="flex flex-wrap gap-2 pt-1">
          {church.churchPhone && (
            <a
              href={telHref(church.churchPhone)}
              className="flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100 hover:text-[#13233B]"
            >
              <Phone className="h-3 w-3" />
              {church.churchPhone}
            </a>
          )}
          {church.mobile && (
            <a
              href={telHref(church.mobile)}
              className="flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-100 hover:text-[#13233B]"
            >
              <Smartphone className="h-3 w-3" />
              {church.mobile}
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}