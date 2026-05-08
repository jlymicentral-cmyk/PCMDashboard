"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, ArrowRight } from "lucide-react";

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="cta"
      className="relative py-28 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Parallax background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src="https://images.unsplash.com/photo-1607827448387-a67db2c8e8e6?w=1920&q=60"
            alt=""
            aria-hidden="true"
            className="w-full h-[120%] object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-navy-950/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/70 to-navy-950/60" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-10 right-10 w-64 h-64 bg-crimson-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-navy-700/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container-section" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Main Copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label">The JLY Difference</span>
            <div className="section-divider" />
            <h2 id="cta-heading" className="section-title text-white mt-4 mb-6">
              Answer the Call{" "}
              <span className="text-crimson-400">With Excellence</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              We don't just impart knowledge; we forge character. Our environment is designed to strip away complacency and build spiritual resilience.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#about"
                className="btn-primary group"
                aria-label="Explore our church community"
              >
                Get Involved
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#donate"
                className="btn-outline"
                aria-label="Support our mission financially"
              >
                Support Our Mission
              </a>
            </div>
          </motion.div>

          {/* Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <div className="relative bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-8 shadow-2xl">
              <Quote
                size={48}
                className="text-crimson-500/30 mb-4"
                aria-hidden="true"
              />
              <blockquote>
                <p className="text-white/90 text-xl leading-relaxed font-medium italic mb-6">
                  "The just shall live by faith..."
                </p>
                <footer className="flex items-center gap-4">
                  <div>
                    <div className="font-heading font-bold text-white">- Habakkuk 2:4</div>
                  </div>
                </footer>
              </blockquote>

              {/* Decorative border accent */}
              <div className="absolute top-0 left-8 w-16 h-1 bg-crimson-500 rounded-b-full" aria-hidden="true" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
