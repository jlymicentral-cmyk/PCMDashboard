"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Search, Globe, Flag } from "lucide-react";

const internationalRegions = [
  { name: "Asia", count: 7 },
  { name: "Australia & Oceania", count: 3 },
  { name: "Europe", count: 6 },
  { name: "North America", count: 5 },
];

const nationalRegions = [
  { name: "NCRST", count: 8 },
  { name: "Region 1, 3 & CAR", count: 8 },
  { name: "Visayas", count: 7 },
  { name: "Reg. 9–12", count: 5 },
  { name: "Caraga Region", count: 10 },
  { name: "Region 2", count: 12 },
  { name: "Pioneering", count: 8 },
];

export default function ChurchDirectory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeIntl, setActiveIntl] = useState<string | null>(null);
  const [activeNat, setActiveNat] = useState<string | null>(null);

  return (
    <section
      id="directories"
      className="py-24 bg-navy-900 relative overflow-hidden"
      aria-labelledby="directory-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-crimson-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-section" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="section-label">Our Locations</span>
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h2 id="directory-heading" className="section-title text-white mt-2">
            Church <span className="text-crimson-400">Directory</span>
          </h2>
          <p className="text-white/60 text-lg mt-5 max-w-2xl mx-auto">
            Join a JLYCC family near you. We are a growing community with satellite churches across the Philippines and around the world.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto mb-12"
        >
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search by city, region, or pastor name..."
              className="w-full bg-white/5 border border-white/15 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-crimson-500 transition-colors"
              aria-label="Search church locations"
            />
          </div>
          <div className="flex justify-center mt-3">
            <a
              href="/find-a-church"
              className="inline-flex items-center gap-2 text-sm font-semibold text-crimson-400 hover:text-crimson-300 transition-colors"
            >
              <MapPin size={14} />
              Find churches near me
            </a>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* International */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Globe size={18} className="text-blue-400" />
              </div>
              <h3 className="font-heading font-black text-white text-lg">International Churches</h3>
            </div>
            <div className="space-y-3">
              {internationalRegions.map((region, i) => (
                <motion.button
                  key={region.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  onClick={() => setActiveIntl(activeIntl === region.name ? null : region.name)}
                  className={`w-full flex items-center justify-between card-glass rounded-xl px-5 py-4 border transition-all duration-200 text-left group ${
                    activeIntl === region.name
                      ? "border-crimson-500/60 bg-crimson-500/10"
                      : "border-white/10 hover:border-white/25"
                  }`}
                  aria-expanded={activeIntl === region.name}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="font-semibold text-white text-sm">{region.name}</span>
                  </div>
                  <span className="text-xs font-black text-crimson-400 bg-crimson-500/15 px-3 py-1 rounded-full">
                    {region.count} churches
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* National */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-crimson-500/20 rounded-xl flex items-center justify-center">
                <Flag size={18} className="text-crimson-400" />
              </div>
              <h3 className="font-heading font-black text-white text-lg">
                National Churches <span className="text-white/40 text-sm font-normal ml-1">🇵🇭 Philippines</span>
              </h3>
            </div>
            <div className="space-y-3">
              {nationalRegions.map((region, i) => (
                <motion.button
                  key={region.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  onClick={() => setActiveNat(activeNat === region.name ? null : region.name)}
                  className={`w-full flex items-center justify-between card-glass rounded-xl px-5 py-4 border transition-all duration-200 text-left group ${
                    activeNat === region.name
                      ? "border-crimson-500/60 bg-crimson-500/10"
                      : "border-white/10 hover:border-white/25"
                  }`}
                  aria-expanded={activeNat === region.name}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-crimson-400" />
                    <span className="font-semibold text-white text-sm">{region.name}</span>
                  </div>
                  <span className="text-xs font-black text-crimson-400 bg-crimson-500/15 px-3 py-1 rounded-full">
                    {region.count} churches
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-10"
        >
          <a href="/find-a-church" className="btn-primary group">
            View Full Church Directory
            <MapPin size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
