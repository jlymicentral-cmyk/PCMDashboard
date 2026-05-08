"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Building2, Handshake, ArrowRight, Shield, CheckCircle } from "lucide-react";

const tiers = [
  {
    icon: Heart,
    title: "SCHOLARSHIP FUND",
    amount: "Any Amount",
    desc: "Sponsor a student's theological education and living expenses during their training.",
    features: [],
    color: "text-crimson-400",
    bg: "bg-crimson-500/15",
    border: "border-crimson-500/30 hover:border-crimson-400",
    highlight: false,
  },
  {
    icon: Building2,
    title: "GLOBAL MISSIONS",
    amount: "Global Giver",
    desc: "Fund church planting initiatives and missionary deployments across the globe.",
    features: [],
    color: "text-gold-400",
    bg: "bg-amber-500/15",
    border: "border-amber-500/50 hover:border-amber-400",
    highlight: true,
  },
  {
    icon: Handshake,
    title: "GENERAL MINISTRY",
    amount: "Any Amount",
    desc: "Support the day-to-day operations and expansion of Jesus Loves You Ministries.",
    features: [],
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    border: "border-blue-500/30 hover:border-blue-400",
    highlight: false,
  },
];


export default function Donate() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="donate"
      className="py-24 bg-navy-950 relative overflow-hidden"
      aria-labelledby="donate-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-crimson-500/5 rounded-full blur-3xl translate-x-1/4" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-navy-800/30 rounded-full blur-3xl -translate-x-1/4" />
      </div>

      <div className="container-section" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-5"
        >
          <span className="section-label">Partner With Us</span>
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h2 id="donate-heading" className="section-title text-white mt-2">
            Support Our{" "}
            <span className="text-crimson-400">Non-Profit Mission</span>
          </h2>
          <p className="text-white/60 text-lg mt-5 max-w-2xl mx-auto">
            Jesus Loves You Ministries, Inc. operates as a registered non-profit organization. We rely on the faithful partnership of believers to fund scholarships, expand our facilities, and send missionaries worldwide.
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-14"
        >
          {[
            { icon: Shield, label: "SEC Registered (No. 0000110444)" },
            { icon: CheckCircle, label: "100% Transparent" },
            { icon: Shield, label: "Secure Payments" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/50 text-sm font-semibold">
              <Icon size={15} className="text-crimson-400" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Donation Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                className={`relative group card-glass rounded-2xl border ${tier.border} p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl ${tier.highlight ? "ring-2 ring-amber-500/50" : ""}`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-navy-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest">
                    Most Popular
                  </div>
                )}

                <div className={`w-14 h-14 ${tier.bg} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <Icon size={26} className={tier.color} />
                </div>

                <h3 className="font-heading text-xl font-black text-white mb-1">{tier.title}</h3>
                <p className={`text-sm font-bold ${tier.color} mb-4`}>{tier.amount}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{tier.desc}</p>

                <ul className="space-y-2.5 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                      <CheckCircle size={14} className={tier.color} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3 px-5 rounded-xl border ${tier.border} ${tier.color} hover:bg-white/5 transition-all`}
                  aria-label={`Give to ${tier.title}`}
                >
                  Give Now <ArrowRight size={14} />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <a
            href="#"
            className="btn-primary text-lg px-10 py-4 group"
            aria-label="Make a one-time donation"
          >
            MAKE A DONATION
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </a>
          <p className="text-white/40 text-sm mt-4">
            All donations are directed to our SEC-registered non-profit (No. 0000110444).
          </p>
        </motion.div>
      </div>
    </section>
  );
}
