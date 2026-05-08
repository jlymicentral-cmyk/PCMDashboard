"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Search, Globe, Flag } from "lucide-react";

const internationalRegions = [
  {
    name: "Asia", count: 7, flag: "🌏",
    churches: [
      { name: "Hong Kong", pastor: "Pastor: Zoe Ulit", address: "Rm 22 Kwan Yick Building Phase 2, 343 Des Voeux Road West, Hong Kong", flag: "🇭🇰" },
      { name: "Kota Kinabalu", pastor: "Pastor: Anthony Gernale", address: "Lot 2.3, 2nd Floor, Komplek Asia City, Jalan Asia City, 88000 Kota Kinabalu, Sabah, Malaysia", flag: "🇲🇾" },
      { name: "Abu Dhabi (UAE)", pastor: "", address: "", flag: "🇦🇪" },
      { name: "Dubai (UAE)", pastor: "", address: "", flag: "🇦🇪" },
      { name: "Seoul (South Korea)", pastor: "", address: "", flag: "🇰🇷" },
      { name: "Singapore", pastor: "", address: "", flag: "🇸🇬" },
      { name: "Tokyo (Japan)", pastor: "", address: "", flag: "🇯🇵" },
    ],
  },
  {
    name: "Australia & Oceania", count: 3, flag: "🌏",
    churches: [
      { name: "Australia", pastor: "Pastor: Ronnie Gilua", address: "Unit 1/123 Dixon Road, East Rockingham, Western Australia", flag: "🇦🇺" },
      { name: "Melbourne (Australia)", pastor: "", address: "", flag: "🇦🇺" },
      { name: "Sydney (Australia)", pastor: "", address: "", flag: "🇦🇺" },
    ],
  },
  {
    name: "Europe", count: 6, flag: "🌍",
    churches: [
      { name: "Italy", pastor: "Pastor: Arturo Bermudez", address: "Via Luigi Abbiati 18/A, Brescia, Italy", flag: "🇮🇹" },
      { name: "Barcelona (Spain)", pastor: "", address: "", flag: "🇪🇸" },
      { name: "London (UK)", pastor: "", address: "", flag: "🇬🇧" },
      { name: "Madrid (Spain)", pastor: "", address: "", flag: "🇪🇸" },
      { name: "Milan (Italy)", pastor: "", address: "", flag: "🇮🇹" },
      { name: "Rome (Italy)", pastor: "", address: "", flag: "🇮🇹" },
    ],
  },
  {
    name: "North America", count: 5, flag: "🌎",
    churches: [
      { name: "USA / HWM", pastor: "Pastor: Philip Bautista", address: "5600 Orangethorpe Unit 2701, La Palma, California 90623", flag: "🇺🇸" },
      { name: "Los Angeles (USA)", pastor: "", address: "", flag: "🇺🇸" },
      { name: "New York (USA)", pastor: "", address: "", flag: "🇺🇸" },
      { name: "Toronto (Canada)", pastor: "", address: "", flag: "🇨🇦" },
      { name: "Vancouver (Canada)", pastor: "", address: "", flag: "🇨🇦" },
    ],
  },
];

const nationalRegions = [
  { name: "NCRST", count: 8, churches: [] },
  { name: "Region 1, 3 & CAR", count: 8, churches: [] },
  { name: "Visayas", count: 7, churches: [] },
  { name: "Reg. 9–12", count: 5, churches: [] },
  { name: "Caraga Region", count: 10, churches: [] },
  { name: "Region 2", count: 12, churches: [] },
  { name: "Pioneering", count: 8, churches: [] },
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

        {/* International */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Globe size={18} className="text-blue-400" />
            </div>
            <h3 className="font-heading font-black text-white text-lg">International Churches</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {internationalRegions.map((region, i) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="card-glass rounded-xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setActiveIntl(activeIntl === region.name ? null : region.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 transition-all duration-200 text-left ${
                    activeIntl === region.name ? "bg-teal-500/20" : "hover:bg-white/5"
                  }`}
                  aria-expanded={activeIntl === region.name}
                >
                  <span className="font-semibold text-white text-sm flex items-center gap-2">
                    <span>{region.flag}</span> {region.name}
                  </span>
                  <span className="text-xs font-black text-teal-400 bg-teal-500/15 px-2 py-0.5 rounded-full ml-2 shrink-0">
                    {region.count}
                  </span>
                </button>
                {activeIntl === region.name && (
                  <div className="border-t border-white/10">
                    {region.churches.map((church) => (
                      <div key={church.name} className="px-4 py-3 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-2 font-semibold text-white text-sm">
                          <span>{church.flag}</span> {church.name}
                        </div>
                        {church.pastor && <p className="text-teal-400 text-xs mt-0.5 pl-5">{church.pastor}</p>}
                        {church.address && <p className="text-white/40 text-xs mt-0.5 pl-5 leading-snug">{church.address}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* National */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-crimson-500/20 rounded-xl flex items-center justify-center">
              <Flag size={18} className="text-crimson-400" />
            </div>
            <h3 className="font-heading font-black text-white text-lg">
              National Churches <span className="text-white/40 text-sm font-normal ml-1">🇵🇭 Philippines</span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {nationalRegions.map((region, i) => (
              <motion.button
                key={region.name}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.06 }}
                onClick={() => setActiveNat(activeNat === region.name ? null : region.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold transition-all duration-200 ${
                  activeNat === region.name
                    ? "bg-teal-500 border-teal-500 text-white"
                    : "card-glass border-white/15 text-white/80 hover:border-white/30"
                }`}
              >
                <MapPin size={13} />
                {region.name}
                <span className={`text-xs font-black px-1.5 py-0.5 rounded-full ${activeNat === region.name ? "bg-white/20" : "bg-crimson-500/20 text-crimson-400"}`}>
                  {region.count}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

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
