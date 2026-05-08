"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, ArrowRight } from "lucide-react";

const leaders = [
  {
    name: "BHP. REY PE BENITO",
    title: "Senior Pastor / Founder",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "",
  },
  {
    name: "PS. JOY PE BENITO",
    title: "Co-Founder",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "",
  },
  {
    name: "DR. EDNA BALURAN",
    title: "Co-Founder",
    img: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "",
  },
];

export default function Leadership() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="leadership"
      className="py-24 bg-navy-900 relative overflow-hidden"
      aria-labelledby="leadership-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-crimson-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-section" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Board of Directors</span>
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h2 id="leadership-heading" className="section-title text-white mt-2">
            Leadership{" "}
            <span className="text-crimson-400">Credibility</span>
          </h2>
          <p className="text-white/60 text-lg mt-5 max-w-2xl mx-auto">
            Guided by seasoned ministers and professionals who embody the pioneer spirit and unwavering commitment to the Great Commission.
          </p>
        </motion.div>

        {/* Leaders Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.map((leader, i) => (
            <motion.article
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group card-glass rounded-2xl p-7 text-center hover:-translate-y-2 transition-all duration-400 cursor-pointer"
              aria-label={`${leader.name}, ${leader.title}`}
            >
              {/* Avatar */}
              <div className="relative mx-auto mb-5 w-fit">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-navy-800 group-hover:ring-crimson-500/60 transition-all duration-300 mx-auto">
                  <img
                    src={leader.img}
                    alt={`Portrait of ${leader.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                {/* Status dot */}
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-navy-900" aria-hidden="true" />
              </div>

              {/* Info */}
              <h3 className="font-heading font-bold text-white text-lg leading-tight mb-1">
                {leader.name}
              </h3>
              <p className="text-crimson-400 text-sm font-semibold mb-3">{leader.title}</p>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{leader.bio}</p>

              {/* Connect */}
              <button
                className="inline-flex items-center gap-2 text-xs font-bold text-white/50 hover:text-crimson-400 transition-colors"
                aria-label={`Connect with ${leader.name}`}
              >
                <Mail size={13} />
                Connect
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
