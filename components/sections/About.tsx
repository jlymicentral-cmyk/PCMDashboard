"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ArrowRight, Heart, Users, Globe } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "BIBLICAL TRUTH",
    desc: "Uncompromising theological depth",
  },
  {
    icon: Users,
    title: "GLOBAL MISSION",
    desc: "Training international students",
  },
  {
    icon: Globe,
    title: "EXCELLENCE",
    desc: "Military-grade spiritual discipline",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="about" className="py-24 bg-navy-900 relative overflow-hidden" aria-labelledby="about-heading">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-crimson-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" aria-hidden="true" />

      <div className="container-section">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1585503418537-88331351ad99?w=800&q=80"
                alt="Jesus Loves You City Church building exterior"
                className="w-full h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />

              {/* Badge overlay */}
              <div className="absolute bottom-6 left-6 bg-navy-900/90 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4">
                <div className="text-3xl font-heading font-black text-crimson-400">1983</div>
                <div className="text-white/80 text-sm font-semibold">Established</div>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              className="absolute -top-6 -right-6 bg-crimson-500 rounded-2xl px-5 py-4 shadow-xl shadow-crimson-500/30"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              <div className="text-xl font-heading font-black text-white">NON-PROFIT MINISTRY</div>
              <div className="text-crimson-100 text-sm font-semibold">SEC Registered No. 0000110444</div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span className="section-label">About The Ministry</span>
            <div className="section-divider" />
            <h2 id="about-heading" className="section-title text-white mb-6">
              A Legacy of{" "}
              <span className="text-crimson-400">Spiritual Authority</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Jesus Loves You Ministries, Inc. is a registered non-stock, non-profit Christian Corporation dedicated to religious Christian activities. Since our founding on February 23, 1983, we have been committed to building a legacy of spiritual authority and leadership training for kingdom impact.
            </p>
            <p className="text-white/70 leading-relaxed mb-10">
              We emphasize rigorous spiritual formation combined with practical leadership. We don't just educate; we forge nation influencers and spiritual generals equipped to take on the darkest territories.
            </p>

            {/* Feature List */}
            <ul className="space-y-5 mb-10">
              {features.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-crimson-500/15 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-crimson-500/25 transition-colors">
                    <Icon size={18} className="text-crimson-400" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white text-sm">{title}</div>
                    <div className="text-white/60 text-sm mt-0.5">{desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <a href="#pillars" className="btn-primary group" aria-label="Explore our mission">
              EXPLORE MISSION
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
