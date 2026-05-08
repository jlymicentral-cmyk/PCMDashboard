"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Youtube, Facebook, Instagram, Podcast, ExternalLink, ArrowRight } from "lucide-react";

const platforms = [
  {
    icon: Facebook,
    name: "JLYCC",
    handle: "JLYCC",
    desc: "Join our main Sunday service! Stay updated through our Facebook page.",
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/30 hover:border-blue-400/60",
    cta: "Facebook",
    href: "https://www.facebook.com/jlymiph/",
    followers: "Stay Updated",
  },
  {
    icon: Facebook,
    name: "KINGDOM KIDS",
    handle: "Ages 4–13",
    desc: "A fun environment for children to learn about God's love. Stay updated through our Facebook page.",
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/30 hover:border-blue-400/60",
    cta: "Facebook",
    href: "https://www.facebook.com/JLYCCKingdomKids",
    followers: "Stay Updated",
  },
  {
    icon: Facebook,
    name: "LEADTAKERS YOUTH",
    handle: "Ages 14–21",
    desc: "Join our vibrant youth community! Stay updated through our Facebook page.",
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/30 hover:border-blue-400/60",
    cta: "Facebook",
    href: "https://www.facebook.com/leadtakersmain",
    followers: "Stay Updated",
  },
  {
    icon: Facebook,
    name: "LEADTAKERS PRO",
    handle: "Ages 22+",
    desc: "Leadership training for young adults. Stay updated through our Facebook page.",
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/30 hover:border-blue-400/60",
    cta: "Facebook",
    href: "https://www.facebook.com/LeadtakersWC",
    followers: "Stay Updated",
  },
];


export default function Community() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="community"
      className="py-24 bg-navy-950 relative overflow-hidden"
      aria-labelledby="community-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-navy-800/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />
      </div>

      <div className="container-section" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="section-label">Stay Connected</span>
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h2 id="community-heading" className="section-title text-white mt-2">
            Community &{" "}
            <span className="text-crimson-400">Outreach</span>
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            Follow us on our platforms and stay plugged into the life of the church — from
            anywhere in the world.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {platforms.map((platform, i) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group card-glass rounded-2xl border ${platform.border} p-6 flex items-start gap-5 hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
              >
                {/* Icon Avatar */}
                <div className={`w-14 h-14 ${platform.bg} rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}>
                  <Icon size={26} className={platform.color} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h3 className="font-heading font-bold text-white">{platform.name}</h3>
                      <p className={`text-sm font-semibold ${platform.color}`}>{platform.handle}</p>
                    </div>
                    <span className="text-xs text-white/40 font-semibold whitespace-nowrap bg-white/5 px-2.5 py-1 rounded-full">
                      {platform.followers}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{platform.desc}</p>
                  <a
                    href={platform.href}
                    className={`inline-flex items-center gap-2 text-sm font-bold ${platform.color} hover:opacity-80 transition-opacity`}
                    aria-label={`${platform.cta} on ${platform.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platform.cta}
                    <ExternalLink size={13} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
