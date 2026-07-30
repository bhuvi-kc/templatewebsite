import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "DOMÉ Gallery", href: "/gallery" },
  { title: "Template Kit", href: "/template-kit" },
  { title: "Resources", href: "/resources" },
  { title: "Contact", href: "/contact" },
];

const legalLinks = [
  { title: "Terms", href: "#" },
  { title: "Privacy", href: "#" },
  { title: "Support", href: "#" },
];

export default function Footer({ brandName = "DOMÉ" }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#080808]">
      <div className="relative z-10 max-w-5xl px-6 py-16 mx-auto md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-2xl font-semibold tracking-[0.15em] text-white">
              {brandName}
            </p>
            <p className="max-w-xs mt-3 text-sm leading-relaxed text-white/40">
              Interfaces that feel like spaces — built with the same care
              for light, depth, and motion as the rooms they're named
              after.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40">
              Navigate
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.title}>
                  <Link
                    to={l.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal / contact */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-white/40">
              Studio
            </p>
            <ul className="mt-4 space-y-2">
              {legalLinks.map((l) => (
                <li key={l.title}>
                  <a
                    href={l.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {l.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:hello@domestudio.com"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  hello@domestudio.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 mt-12 border-t border-white/10 md:flex-row md:items-center">
          <p className="text-xs text-white/30">
            © {year} {brandName} Studio. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Built with React, Tailwind CSS &amp; Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}