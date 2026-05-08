"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import Script from "next/script";

export default function StayUpdated() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="stay-updated"
      className="py-24 bg-navy-950 relative overflow-hidden"
      aria-labelledby="stay-updated-heading"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-crimson-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-section" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="section-label">Stay Updated</span>
          <div className="flex justify-center"><div className="section-divider" /></div>
          <h2 id="stay-updated-heading" className="section-title text-white mt-2">
            Connect <span className="text-crimson-400">With Us</span>
          </h2>
          <p className="text-white/60 text-lg mt-5 max-w-2xl mx-auto">
            Get the latest news, event updates, and spiritual encouragement delivered to your inbox.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto card-glass rounded-2xl p-8 border border-white/10"
        >
          {/* GHL Inline Form Embed */}
          <div
            className="inline-form-wrapper"
            id="inline-1uY69mpQsh3XvrDqbXzj-div"
            data-layout="true"
            data-hl-type="inline"
            data-src="https://api.leadconnectorhq.com/widget/form/1uY69mpQsh3XvrDqbXzj"
          />
          <Script
            src="https://link.msgsndr.com/js/form_embed.js"
            strategy="lazyOnload"
          />
        </motion.div>
      </div>
    </section>
  );
}
