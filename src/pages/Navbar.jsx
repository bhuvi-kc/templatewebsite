import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OptionWheel from "../component/OptionWheel";
import Resources from "./Resources";
import DomeGallery from "../component/DomeGallery";

const transition = { duration: 0.5, ease: [0.54, 0.01, 0.19, 0.93] };

const defaultData = {
  footerLinks: [
    { title: "Terms", href: "#" },
    { title: "Privacy", href: "#" },
    { title: "Support", href: "#" },
    { title: "Contact", href: "#" },
  ],
};

// Map each wheel item to a route
const routes = {
  "Home": "/",
  "About": "/about",
  "DOMÉ Gallery": "/gallery",
  "Template Kit": "/template-kit",
  "Resources": "/resources",
  "Contact": "/contact",
};

export default function SubmenuSidebarNav({
  data = defaultData,
  widthOpen = 280,
  brandName = "DOMÉ",
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const close = () => {
    setOpen(false);
  };

  const goHome = (e) => {
    e.preventDefault();
    close();
    window.dispatchEvent(new Event("dome:gohome"));
    if (window.location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <>
      <div className="h-20 w-full bg-[#080808]">
        {/* Transparent top navbar */}
        <div
          className={`fixed inset-x-0 top-0 z-20 flex h-20 items-center justify-between px-6 md:px-10 transition-colors duration-300 ${
            scrolled ? "bg-[#080808]/95 backdrop-blur-sm" : "bg-transparent"
          }`}
        >
          {/* Left: menu button */}
          <div className="flex items-center justify-start flex-1">
            {!open && (
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="flex items-center justify-center w-5 h-5 text-white transition-colors rounded-full hover:bg-white/10"
              >
                <Menu size={30} strokeWidth={1.75} />
              </button>
            )}
          </div>

          {/* Centered brand — click resets and redirects to lanyard */}
          <a
            href="/"
            onClick={goHome}
            className="flex-1 text-center text-[30px] font-semibold tracking-[0.2em] text-white"
          >
            {brandName}
          </a>

          {/* Right: empty spacer to keep brand centered */}
          <div className="flex items-center justify-end flex-1" />
        </div>

        <motion.div
          className="fixed left-0 top-0 z-30 flex flex-col overflow-hidden bg-[#080808] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          initial={false}
          animate={{
            width: open ? widthOpen : 0,
            height: open ? "100vh" : 0,
          }}
          transition={transition}
        >
          <div className="flex flex-col h-full" style={{ width: widthOpen }}>
            <div className="relative z-10 flex items-center justify-end h-20 px-6 shrink-0">
              <button
                onClick={close}
                aria-label="Close menu"
                className="flex items-center justify-center text-white transition-colors rounded-full h-9 w-9 hover:bg-white/10"
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>

            <div className="relative flex flex-col flex-1 overflow-hidden">
              <motion.div
                key="main"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={transition}
                className="flex flex-col justify-center h-full p-8 overflow-auto"
              >
                {/* Option Wheel */}
                <div className="">
                  <p className=" text-xs tracking-[0.35em] uppercase text-white/40">
                    Explore
                  </p>

                  <div className="h-[400px] mb-50">
                    <OptionWheel
                      items={Object.keys(routes)}
                      onChange={(i, item) => {
                        const path = routes[item];
                        if (!path) return;

                        close(); // collapse the sidebar

                        if (item === "Home") {
                          // reuse existing reset behavior
                          window.dispatchEvent(new Event("dome:gohome"));
                        }

                        navigate(path);
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex items-center gap-6 px-6 py-6 border-t shrink-0 border-white/10">
              {data.footerLinks.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  className="text-[13px] text-white opacity-70 transition-opacity hover:opacity-100"
                >
                  {l.title}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}