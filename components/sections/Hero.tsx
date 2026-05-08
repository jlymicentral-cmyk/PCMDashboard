"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, MapPin, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/60 to-navy-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-navy-950/40" />
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-crimson-500/10 blur-3xl"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Large watermark text */}
      <div
        className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-heading text-[20vw] font-black text-white/[0.03] leading-none tracking-tighter">
          JLYCC
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 container-section pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex items-center gap-2 text-white/60 text-sm font-semibold">
              <MapPin size={14} className="text-crimson-400" />
              <span>WELCOME TO JLYCC</span>
            </div>
            <span className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2 text-white/60 text-sm font-semibold">
              <Clock size={14} className="text-crimson-400" />
              <span>Family-friendly</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] text-shadow-lg mb-6"
          >
            <span className="text-white block">JESUS LOVES</span>
            <span className="text-white block">YOU</span>
            <span className="block mt-1">
              <span className="text-crimson-500">CITY</span>
              <span className="text-white"> CHURCH</span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
          >
            A welcoming Christ-centered community helping people grow in faith, purpose, and service.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#about"
              className="btn-primary text-base px-8 py-4 group"
              aria-label="Start your calling"
            >
              START YOUR CALLING
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#donate"
              className="btn-outline text-base px-8 py-4 group"
              aria-label="Support the ministry"
            >
              <div className="w-7 h-7 rounded-full bg-crimson-500/30 flex items-center justify-center group-hover:bg-crimson-500/50 transition-colors">
                <Play size={12} fill="white" />
              </div>
              SUPPORT THE MINISTRY
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-16 flex flex-wrap gap-8"
          >
            {[
              { value: "Open", label: "to everyone" },
              { value: "Weekly", label: "gatherings" },
              { value: "Church", label: "Community" },
              { value: "1983", label: "ESTABLISHED" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="font-heading text-3xl font-black text-crimson-400">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm font-semibold mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="text-white/40 text-xs font-semibold tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-1.5"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-crimson-500 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
