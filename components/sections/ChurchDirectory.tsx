"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Search, Globe, Flag, ChevronDown } from "lucide-react";

const internationalRegions = [
  {
    name: "Asia", count: 7, flag: "🌏",
    churches: [
      { name: "Hong Kong", pastor: "Pastor Zoe Ulit", address: "Rm 22 Kwan Yick Building Phase 2, 343 Des Voeux Road West, Hong Kong", flag: "🇭🇰" },
      { name: "Kota Kinabalu", pastor: "Pastor Anthony Gernale", address: "Lot 2.3, 2nd Floor, Komplek Asia City, Jalan Asia City, 88000 Kota Kinabalu, Sabah, Malaysia", flag: "🇲🇾" },
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
      { name: "Australia", pastor: "Pastor Ronnie Gilua", address: "Unit 1/123 Dixon Road, East Rockingham, Western Australia", flag: "🇦🇺" },
      { name: "Melbourne (Australia)", pastor: "", address: "", flag: "🇦🇺" },
      { name: "Sydney (Australia)", pastor: "", address: "", flag: "🇦🇺" },
    ],
  },
  {
    name: "Europe", count: 6, flag: "🌍",
    churches: [
      { name: "Italy", pastor: "Pastor Arturo Bermudez", address: "Via Luigi Abbiati 18/A, Brescia, Italy", flag: "🇮🇹" },
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
      { name: "USA / HWM", pastor: "Pastor Philip Bautista", address: "5600 Orangethorpe Unit 2701, La Palma, California 90623", flag: "🇺🇸" },
      { name: "Los Angeles (USA)", pastor: "", address: "", flag: "🇺🇸" },
      { name: "New York (USA)", pastor: "", address: "", flag: "🇺🇸" },
      { name: "Toronto (Canada)", pastor: "", address: "", flag: "🇨🇦" },
      { name: "Vancouver (Canada)", pastor: "", address: "", flag: "🇨🇦" },
    ],
  },
];

const nationalRegions = [
  {
    name: "NCRST", count: 8, flag: "🇵🇭",
    churches: [
      { name: "JLYCC Dasmariñas", pastor: "Pastor Vivian O. Adarle", address: "B106 L008 Brgy. Sta. Lucia, Dasmariñas City, Cavite" },
      { name: "JLYCC Marikina", pastor: "Pastor Elmer R. Gaurano", address: "274 General Ordoñez Avenue, Marikina Heights, Marikina City" },
      { name: "JLYCC Commonwealth", pastor: "Pastor Nanette B. Gaurano", address: "17 Villongco St., Commonwealth, Quezon City" },
      { name: "JLYCC Imus", pastor: "Pastor Gerundio A. Medrano Jr.", address: "175 Daang Hari Blvd., Brgy. Pasong Buaya 1, Imus, Cavite" },
      { name: "JLYCC Jala-Jala", pastor: "Pastor Melquisedec D. Aguirre", address: "161 Sitio Dalig 3rd St. District, Jala-Jala" },
      { name: "JLYCC GMA", pastor: "Pastor Victor D. Eguia", address: "Luzon Avenue, Brgy. Maderan, GMA, Cavite" },
      { name: "JLYCC San Pedro", pastor: "Pastor Victor D. Eguia", address: "#2 San Jose St., Ph. 2 Pacita 1, San Pedro, Laguna" },
      { name: "JLYCC Antipolo", pastor: "Pastor Paul S. Ramos", address: "#94 Marcos Highway, Brgy. Bagong Nayon, Antipolo, Rizal" },
    ],
  },
  {
    name: "Region 1, 3 & CAR", count: 8, flag: "🇵🇭",
    churches: [
      { name: "JLYCC Olongapo", pastor: "Pastor Antonio Ariola Jr.", address: "99 Gordon Avenue, New Kalalake, Olongapo City" },
      { name: "JLYCC Bataan", pastor: "Pastor Josephine M. Ariola", address: "Roosevelt, Dinalupihan, Bataan" },
      { name: "JLYCC San Fernando", pastor: "Pastor Antonio Ariola Jr.", address: "3rd Floor CTH Bldg., Brgy. Dolores, San Fernando, Pampanga" },
      { name: "JLYCC Urdaneta", pastor: "Pastor Ryan Madrona", address: "Alonzo St., Poblacion, Urdaneta City" },
      { name: "JLYCC Cabanatuan", pastor: "Pastor Roberto Apan", address: "Menrium Mabini Homesite, Cabanatuan City, Nueva Ecija" },
      { name: "JLYCC San Jose", pastor: "Pastor Ricardo A. Fugaban Jr.", address: "1851 Maharlika Highway, Abar 1st, San Jose City" },
      { name: "JLYCC Castillejos", pastor: "Pastor Ferdinand T. Bermudez", address: "St. Martin Subd., Purok 1, Brgy. Del Pilar, Castillejos, Zambales" },
      { name: "JLYCC Baguio", pastor: "Pastor Dave Keneth S. Cachola", address: "#19 Aspiras-Palispis Highway, Baguio City 2600" },
    ],
  },
  {
    name: "Visayas", count: 7, flag: "🇵🇭",
    churches: [
      { name: "JLYCC Iloilo", pastor: "Pastor Reymar C. Macavinta", address: "3rd Floor JEA 2 Bldg., E. Lopez St., Brgy. Our Lady of Fatima, Jaro, Iloilo City" },
      { name: "JLYCC Leyte", pastor: "Pastor Amorlina L. Elviña", address: "Nahaong, Libagon, Southern Leyte" },
      { name: "JLYCC Pres Roxas Capiz", pastor: "Pastor Elizabeth S. Dinglasan", address: "Swa D, Poblacion Elizalde, Pres. Roxas, Capiz" },
      { name: "JLYCC Talisay", pastor: "Pastor Lilibeth C. Leoligao", address: "Reycar Bldg., Lower Mohon, Talisay City, Cebu" },
      { name: "JLYCC Lapu-Lapu - Cebu", pastor: "Pastor Katherine M. Jayoma", address: "3rd Floor CEP Building, Osmeña St., Gun-Ob, Lapu-Lapu City" },
      { name: "JLYCC Naga - Cebu", pastor: "Pastor Germaine Tejada", address: "Relocation Street, Brgy. Tinaan, Naga City, Cebu" },
      { name: "JLYCC Cebu", pastor: "Pastor Maria Luisa G. Martinez", address: "No. 9 V. Rama St., Brgy. Calamba, Cebu City" },
    ],
  },
  {
    name: "Reg. 9–12", count: 5, flag: "🇵🇭",
    churches: [
      { name: "JLYCC CDO", pastor: "Pastor Haidee G. Ponce", address: "Enchanted Kingdom Road, Upper Canitoan, Cagayan de Oro City" },
      { name: "JLYCC Davao", pastor: "Pastor Christopher James Daway", address: "#16 Hilldrive, Bajada, Davao City" },
      { name: "JLYCC General Santos City", pastor: "Pastor Romeo A. Bermudez", address: "Blk 20 Lot 23 Phase IIB, Doña Soledad Subd., Labangal, Gen. Santos City" },
      { name: "JLYCC Iligan", pastor: "Pastor Adonijah V. Ligtas", address: "Rosal A, Brgy. Villaverde, Iligan City" },
      { name: "JLYCC Sto. Tomas", pastor: "Pastor Roselyn Rillera", address: "Fd. Rd 1, Sto. Tomas, Davao del Norte" },
    ],
  },
  {
    name: "Caraga Region", count: 10, flag: "🇵🇭",
    churches: [
      { name: "JLYCC Butuan City", pastor: "Pastor Ronnell C. Giray", address: "3rd Floor Gloria Bldg., R. Calo St., San Ignacio, Butuan City, Agusan del Norte" },
      { name: "JLYCC Cantilan", pastor: "Pastor Cerina L. Plaza", address: "Magosilom, Cantilan, Surigao del Sur" },
      { name: "JLYCC Gamut", pastor: "Pastor Charrie D. Bataluna", address: "Purok Bombils, Gamut, Tago, Surigao del Sur 8302" },
      { name: "JLYCC Gingoog City", pastor: "Pastor Estela V. Basadre", address: "Tuto St., Brgy. 17, Gingoog City" },
      { name: "JLYCC Lindoy", pastor: "Pastor Joey Emboy", address: "Purok African Daisy, Brgy. Lindoy, Tago, Surigao del Sur" },
      { name: "JLYCC Nasipit", pastor: "Pastor Jocelyn E. Padre", address: "602 Fuertes Street, Purok Bougainvilla, Barangay 3, Nasipit, Agusan del Norte" },
      { name: "JLYCC Panaosawon", pastor: "Pastor Frejoy Bataluna", address: "Purok 2, Brgy. Panasawon, Bayabas, Surigao del Sur" },
      { name: "JLYCC Sta. Ana", pastor: "Pastor Roselyn Sumalylo", address: "District Lahi, Sta. Ana, Agusan del Norte" },
      { name: "JLYCC Tandag", pastor: "Pastor Dionesio Antivo", address: "Brgy. Victoria, Crossing, Tandag City" },
      { name: "JLYCC Kibungsod", pastor: "Pastor Juluis Verterra", address: "Prk. Paghiusa, Kibungsod, Magsaysay, Misamis Oriental" },
    ],
  },
  {
    name: "Region 2", count: 12, flag: "🇵🇭",
    churches: [
      { name: "JLYCC Bagabag", pastor: "Pastor Kim C. Eviota", address: "Purok 3 Amethyst Subdivision, Bagabag, Nueva Vizcaya" },
      { name: "JLYCC Bambang", pastor: "Pastor Nathaniel Flores", address: "24 Fe St., Banggot Poblacion, Bambang, Nueva Vizcaya" },
      { name: "JLYCC Cauayan", pastor: "Pastor Joseph S. Gamal", address: "ESTC Building, 2nd Floor, Door 7, Burgos Street, District 2, Cauayan City, Isabela" },
      { name: "JLYCC Curifang", pastor: "Pastor Roy Q. Salazar", address: "Blk. 7, Perez Village, Curifang, Solano, Nueva Vizcaya" },
      { name: "JLYCC Diffun", pastor: "Pastor Josefa Gallon", address: "Barangay Aurora West, Diffun, Quirino" },
      { name: "JLYCC Echague", pastor: "Pastor Lanie C. Vera Cruz", address: "Purok 1, Libertad, Echague, Isabela" },
      { name: "JLYCC Lamut", pastor: "Pastor Joemar S. Mercado", address: "Sozimo Paredes Ave., Hapid Road, Poblacion East, Lamut, Ifugao" },
      { name: "JLYCC Roxas", pastor: "Pastor Joselito Mendoza", address: "2nd Floor Grelinda Bldg., Taganas St., Brgy. Vira, Roxas, Isabela" },
      { name: "JLYCC Santiago", pastor: "Pastor Desiderio R. Gallon Jr.", address: "Ancheta Extension, Purok 4, Mabini, Santiago City" },
      { name: "JLYCC Solano", pastor: "Pastor Roy Q. Salazar", address: "National Highway, Purok 1, Bascaran, Solano, Nueva Vizcaya" },
      { name: "JLYCC Tucal", pastor: "Pastor Roy Q. Salazar", address: "Blk. 4, Tucal, Solano, Nueva Vizcaya" },
      { name: "JLYCC Villaverde N.V.", pastor: "Pastor Samuel Tamtamoy", address: "Brgy. Ibung, Villaverde, Nueva Vizcaya" },
    ],
  },
  {
    name: "Pioneering", count: 8, flag: "🇵🇭",
    churches: [
      { name: "JLYCC Manila (Baseco)", pastor: "Pastor Junlie Lozada", address: "1-2 Blk 5 Unilever Village, Gawad Kalinga" },
      { name: "Bayumbong N.V.", pastor: "Pastor Lorelie Fabro", address: "4th Floor Mondiguing Bldg., Cabarroguis St., Brgy. Don Mariano Marcos, Bayombong, Nueva Vizcaya" },
      { name: "JLYCC Camalaniugan", pastor: "Pastor Gideon Gamal", address: "Zone 7, Brgy. Catotoran Norte, Camalaniugan, Cagayan" },
      { name: "JLYCC Quezon N.V.", pastor: "Pastor Roy Salazar", address: "Brgy. Boliwao, Quezon, Nueva Vizcaya" },
      { name: "JLYCC Roxas Capiz", pastor: "Pastor Adrian Dale Fufunan", address: "Lakandula St., Roxas City, Capiz" },
      { name: "JLYCC Cabadbaran City", pastor: "Pastor Carlito Ducena", address: "Ojeda Ave., Purok 5, Brgy. 9, Cabadbaran City" },
      { name: "JLYCC Bugsukan", pastor: "Pastor Delvin G. Oraiz", address: "Brgy. Bugsukan, Butuan City, Agusan del Norte" },
      { name: "JLYCC New Dapitan", pastor: "Pastor Rio T. Atil", address: "Purok 1, Brgy. New Dapitan, Tampilisan, Zamboanga del Norte" },
    ],
  },
];

type Church = { name: string; pastor: string; address: string; flag?: string };
type Region = { name: string; count: number; flag: string; churches: Church[] };

function RegionAccordion({ region, isOpen, onToggle, color }: { region: Region; isOpen: boolean; onToggle: () => void; color: "teal" | "crimson" }) {
  const teal = color === "teal";
  return (
    <div className={`card-glass rounded-xl border overflow-hidden transition-all duration-200 ${isOpen ? (teal ? "border-teal-500/50" : "border-crimson-500/50") : "border-white/10"}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${isOpen ? (teal ? "bg-teal-500/15" : "bg-crimson-500/10") : "hover:bg-white/5"}`}
        aria-expanded={isOpen}
      >
        <span className="font-heading font-bold text-white text-sm flex items-center gap-2">
          <span>{region.flag}</span> {region.name}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${teal ? "bg-teal-500/20 text-teal-400" : "bg-crimson-500/20 text-crimson-400"}`}>
            {region.count}
          </span>
          <ChevronDown size={15} className={`text-white/40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10"
          >
            {region.churches.map((church, i) => (
              <div key={church.name} className={`px-5 py-3 ${i !== region.churches.length - 1 ? "border-b border-white/5" : ""}`}>
                <div className="flex items-center gap-2 font-semibold text-white text-sm">
                  {church.flag && <span>{church.flag}</span>}
                  {church.name}
                </div>
                {church.pastor && <p className={`text-xs mt-0.5 ${teal ? "text-teal-400" : "text-crimson-400"}`}>{church.pastor}</p>}
                {church.address && <p className="text-white/40 text-xs mt-0.5 leading-snug">{church.address}</p>}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ChurchDirectory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [activeIntl, setActiveIntl] = useState<string | null>(null);
  const [activeNat, setActiveNat] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredIntl = search
    ? internationalRegions.map(r => ({ ...r, churches: r.churches.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.pastor?.toLowerCase().includes(search.toLowerCase())) })).filter(r => r.churches.length)
    : internationalRegions;

  const filteredNat = search
    ? nationalRegions.map(r => ({ ...r, churches: r.churches.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.pastor?.toLowerCase().includes(search.toLowerCase()) || c.address?.toLowerCase().includes(search.toLowerCase())) })).filter(r => r.churches.length)
    : nationalRegions;

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

        {/* Search */}
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
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by city, region, or pastor name..."
              className="w-full bg-white/5 border border-white/15 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/30 text-sm focus:outline-none focus:border-crimson-500 transition-colors"
              aria-label="Search church locations"
            />
          </div>
          <div className="flex justify-center mt-3">
            <a href="/find-a-church" className="inline-flex items-center gap-2 text-sm font-semibold text-crimson-400 hover:text-crimson-300 transition-colors">
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
            {filteredIntl.map((region) => (
              <RegionAccordion
                key={region.name}
                region={region}
                isOpen={activeIntl === region.name}
                onToggle={() => setActiveIntl(activeIntl === region.name ? null : region.name)}
                color="teal"
              />
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
              National Churches <span className="ml-2">🇵🇭</span>
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredNat.map((region) => (
              <RegionAccordion
                key={region.name}
                region={region}
                isOpen={activeNat === region.name}
                onToggle={() => setActiveNat(activeNat === region.name ? null : region.name)}
                color="crimson"
              />
            ))}
          </div>
        </motion.div>

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
