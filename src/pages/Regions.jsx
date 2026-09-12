import React from "react";
import { motion } from "framer-motion";
import RegionCard from "../components/Usables/RegionCard";
import { churchRegions } from "../data/ChurchRegionData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function Regions() {
  return (
    <section className="w-full bg-[#f4ff8f] px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1d4ed8]"
          >
            Our Church Network
          </motion.p>

          <motion.h2
            custom={1}
            variants={fadeUp}
            className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-[#0c1322] sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Churches Across Sri Lanka
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-gray-500 sm:text-base md:text-lg"
          >
            A growing family of believers, united in faith, worship, and
            service across communities throughout Sri Lanka.
          </motion.p>
        </motion.div>

        {/* Total Churches */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-4 rounded-full border border-gray-200 bg-white px-6 py-3 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0c1322]">
              <span className="text-sm font-bold text-white">86</span>
            </div>

            <div className="text-left">
              <p className="text-sm font-bold leading-none text-[#0c1322]">
                Churches
              </p>
              <p className="mt-1 text-xs font-light text-gray-400">
                Across our regions
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Region Cards */}
        <div className="mt-14">
          <motion.div
            className="flex gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
          >
            {churchRegions.map((region) => (
              <motion.div
                key={region.name}
                variants={cardVariant}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                whileTap={{ scale: 0.97 }}
                className="w-[82vw] shrink-0 snap-center sm:w-[60vw] md:w-auto cursor-pointer"
              >
                <RegionCard
                  name={region.name}
                  churches={region.churches}
                  image={region.image}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default Regions;