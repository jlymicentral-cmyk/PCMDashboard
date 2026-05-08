"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Users, Globe } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    color: "blue",
    label: "WIND NETWORK",
    title: "WORSHIP",
    desc: '"Loving God causes us to WORSHIP Him". Worship is not a destination but a journey—deepening as we grow in our knowledge and experience of God.',
    gradient: "from-blue-600/20 to-blue-900/10",
    border: "border-blue-500/30 hover:border-blue-400/60",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    glow: "hover:shadow-blue-500/20",
    features: ["Ministerial service in the temple"],
  },
  {
    icon: Users,
    color: "crimson",
    label: "EAGLES NETWORK",
    title: "DISCIPLESHIP",
    desc: '"Loving the brethren causes us to DISCIPLE". Generational Discipleship. Focused on raising up the next generation of leaders.',
    gradient: "from-crimson-600/20 to-crimson-900/10",
    border: "border-crimson-500/30 hover:border-crimson-400/60",
    iconBg: "bg-crimson-500/20",
    iconColor: "text-crimson-400",
    glow: "hover:shadow-crimson-500/20",
    features: ["HeartLink", "ISU", "Children's ministries"],
  },
  {
    icon: Globe,
    color: "amber",
    label: "AMEN / LEADTAKERS",
    title: "MISSION",
    desc: '"Loving the world causes us to do MISSIONS". Evangelism & Missions. Expanding our territory globally.',
    gradient: "from-amber-600/20 to-amber-900/10",
    border: "border-amber-500/30 hover:border-amber-400/60",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    glow: "hover:shadow-amber-500/20",
    features: ["Reaching the 7 Mountains of Society"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function Pillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="pillars"
      className="py-24 bg-navy-950 relative overflow-hidden"
      aria-labelledby="pillars-heading"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-navy-800/30 to-transparent rounded-full" />
      </div>

      <div className="container-section relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label">Vision Summary</span>
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h2 id="pillars-heading" className="section-title text-white mt-2">
            Our <span className="text-crimson-400">Three Pillars</span>
          </h2>
          <p className="text-white/60 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            The Jesus Loves You City Church exists to provide a place to come before God in worship; committed to disciples who demonstrate our faith; and establish churches all over the world.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                key={pillar.label}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={`relative group rounded-2xl border ${pillar.border} bg-gradient-to-br ${pillar.gradient} p-8 cursor-default transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl ${pillar.glow}`}
                aria-label={`${pillar.label}: ${pillar.title}`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 ${pillar.iconBg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <Icon size={26} className={pillar.iconColor} />
                </div>

                {/* Label */}
                <span className={`text-xs font-black tracking-widest uppercase ${pillar.iconColor} opacity-80 mb-2 block`}>
                  {pillar.label}
                </span>

                {/* Title */}
                <h3 className="font-heading text-2xl font-black text-white mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed text-sm mb-6">{pillar.desc}</p>

                {/* Feature bullets */}
                <ul className="space-y-2">
                  {pillar.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-white/70">
                      <div className={`w-1.5 h-1.5 rounded-full ${pillar.iconBg} ring-1 ring-inset ${pillar.iconColor}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${pillar.gradient} blur-xl -z-10 scale-110`} aria-hidden="true" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
