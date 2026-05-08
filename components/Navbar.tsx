"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Ministries", href: "#pillars" },
  { label: "Services", href: "#services" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-900/95 backdrop-blur-md shadow-lg shadow-black/30 py-2"
          : "bg-transparent py-4"
      }`}
      role="banner"
    >
      <div className="container-section">
        <nav
          className="flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group"
            aria-label="Jesus Loves You City Church - Home"
          >
            <div className="w-10 h-10 bg-crimson-500 rounded-full flex items-center justify-center font-heading font-black text-white text-sm transition-transform group-hover:scale-110">
              JL
            </div>
            <div className="hidden sm:block">
              <span className="block font-heading text-sm font-black text-white leading-none">
                JESUS LOVES YOU
              </span>
              <span className="block font-heading text-xs font-bold text-crimson-400 tracking-widest uppercase leading-none mt-0.5">
                CITY CHURCH
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg
                    ${
                      activeSection === link.href.replace("#", "")
                        ? "text-crimson-400"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }
                  `}
                  onClick={() => setActiveSection(link.href.replace("#", ""))}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#services"
              className="btn-ghost text-sm"
              aria-label="Watch our livestream"
            >
              Watch Live
            </a>
            <a
              href="#donate"
              className="btn-primary text-sm px-5 py-2.5"
              aria-label="Give to the church"
            >
              Give Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-white/10 bg-navy-900/98 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container-section py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl font-semibold transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#services"
                  className="btn-outline w-full justify-center text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  Watch Live
                </a>
                <a
                  href="#donate"
                  className="btn-primary w-full justify-center text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  Give Now
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
