"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Clock, MapPin, Bell, ChevronRight, Wifi } from "lucide-react";

const schedule = [
  { name: "JLYCC Main Service", desc: "Our main worship gathering", times: "10:00 AM – 12:00 PM", note: "Main" },
  { name: "KingdomKids", desc: "Fun and faith for children · Age: 4–13", times: "10:00 AM – 12:00 PM", note: "Kids" },
  { name: "Leadtakers Youth", desc: "Vibrant community for youth · Age: 14–21", times: "2:00 PM – 4:00 PM", note: "Youth" },
  { name: "Leadtakers Pro", desc: "Leadership and growth for young adults · Age: 22+", times: "2:00 PM – 4:00 PM", note: "Pro" },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="services"
      className="py-24 bg-navy-900 relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-0 w-[600px] h-[300px] bg-crimson-500/5 blur-3xl" />
      </div>

      <div className="container-section" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Join Us Live</span>
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h2 id="services-heading" className="section-title text-white mt-2">
            SUNDAY <span className="text-crimson-400">SERVICE</span>
          </h2>
          <p className="text-white/60 text-lg mt-5 max-w-xl mx-auto">
            Experience our latest message and join us every Sunday for live worship and teaching.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-navy-950 shadow-2xl aspect-video group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&q=80"
                alt="Sunday worship service at Jesus Loves You City Church"
                className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-navy-950/40" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-crimson-500 rounded-full flex items-center justify-center shadow-2xl shadow-crimson-500/50 transition-shadow hover:shadow-crimson-500/70"
                  aria-label="Play latest service recording"
                >
                  <Play size={30} fill="white" className="ml-1.5" />
                </motion.button>
              </div>

              {/* Live Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-crimson-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <Wifi size={12} />
                LIVE SUNDAYS
              </div>

              {/* Video title */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-navy-950 to-transparent">
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">Latest Message</p>
                <h3 className="text-white font-heading font-bold text-lg leading-tight mt-1">
                  "Flourish: Rooted in God's Purpose"
                </h3>
              </div>
            </div>

            {/* Watch CTA */}
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.youtube.com/@jlymicentral233/streams"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 justify-center text-sm"
                aria-label="Watch live streams on YouTube"
              >
                <Bell size={15} /> Watch Live Streams
              </a>
              <a
                href="/sermon-archive"
                className="btn-outline flex-1 justify-center text-sm"
                aria-label="View sermon archive"
              >
                Sermon Archive
              </a>
            </div>
          </motion.div>

          {/* Schedule Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            {/* Location Info */}
            <div className="card-glass p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-crimson-500/20 rounded-xl flex items-center justify-center">
                  <MapPin size={18} className="text-crimson-400" />
                </div>
                <div>
                  <div className="text-white font-heading font-bold">Main Campus</div>
                  <div className="text-white/50 text-sm">40 Mayon St, Mandaluyong City, Metro Manila</div>
                </div>
              </div>
              <a
                href="#contact"
                className="text-crimson-400 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              >
                Get Directions <ChevronRight size={14} />
              </a>
            </div>

            {/* Service Schedule */}
            {schedule.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="card-glass p-5 rounded-2xl group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-crimson-500/20 rounded-lg flex items-center justify-center">
                      <Clock size={14} className="text-crimson-400" />
                    </div>
                    <span className="font-heading font-black text-white text-sm">{item.name}</span>
                  </div>
                  <span className="text-xs text-crimson-400 font-semibold bg-crimson-500/10 px-2.5 py-1 rounded-full">
                    {item.note}
                  </span>
                </div>
                <p className="text-white/50 text-xs pl-10 mb-1">{item.desc}</p>
                <p className="text-white/70 text-sm pl-10 font-semibold">{item.times}</p>
              </motion.div>
            ))}

            {/* Plan Visit CTA */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="btn-primary w-full justify-center text-sm"
              aria-label="Plan your first visit to our church"
            >
              Plan My First Visit
              <ChevronRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
