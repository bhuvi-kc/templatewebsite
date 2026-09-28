import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import OptionWheel from "../component/OptionWheel";
import { sounds } from "../utils/audio";
import { useInteractive } from "../context/InteractiveContext";

const transition = { duration: 0.45, ease: [0.32, 0.72, 0, 1] };

const defaultData = {
  footerLinks: [
    { title: "Terms", href: "/contact" },
    { title: "Privacy", href: "/contact" },
    { title: "Support", href: "/contact" },
    { title: "Contact", href: "/contact" },
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

const routeKeys = Object.keys(routes);

export default function SubmenuSidebarNav({
  data = defaultData,
  widthOpen = 300,
  brandName = "DOMÉ",
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { recordInteraction, activeTheme } = useInteractive();

  // Compute selected index based on current URL
  const currentItemIndex = Math.max(
    0,
    routeKeys.findIndex((key) => routes[key] === location.pathname)
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        sounds.playClick();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const close = () => {
    sounds.playClick();
    setOpen(false);
  };

  const goHome = (e) => {
    e.preventDefault();
    sounds.playSwitch();
    recordInteraction();
    close();
    window.dispatchEvent(new Event("dome:gohome"));
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <>
      <header className="h-20 w-full bg-[#080808]" role="banner">
        {/* Transparent top navbar */}
        <div
          className={`fixed inset-x-0 top-0 z-30 flex h-20 items-center justify-between px-6 md:px-10 transition-all duration-300 border-b ${
            scrolled
              ? "bg-[#080808]/90 backdrop-blur-md border-white/10 shadow-lg shadow-black/40"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Left: menu toggle button */}
          <div className="flex items-center justify-start flex-1 gap-3">
            <button
              onClick={() => {
                sounds.playSwitch();
                recordInteraction();
                setOpen(true);
              }}
              aria-label="Open navigation menu"
              className="flex items-center justify-center w-10 h-10 text-white/90 hover:text-white transition-all rounded-full hover:bg-white/10 active:scale-95 cursor-pointer"
            >
              <Menu size={22} strokeWidth={2} />
            </button>
          </div>

          {/* Centered brand */}
          <a
            href="/"
            onClick={goHome}
            className="flex-1 text-center text-[26px] md:text-[30px] font-semibold tracking-[0.25em] text-white hover:opacity-90 transition-opacity select-none relative group"
          >
            <span>{brandName}</span>
            <span
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full transition-all group-hover:w-12"
              style={{ backgroundColor: activeTheme.color }}
            />
          </a>

          {/* Right: Quick action / Contact link */}
          <div className="flex items-center justify-end flex-1 gap-3">
            <Link
              to="/contact"
              onClick={() => sounds.playClick()}
              className="hidden sm:inline-flex items-center text-xs font-medium tracking-[0.15em] uppercase text-white/70 hover:text-white px-4 py-2 rounded-full border border-white/15 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.06] transition-all hover:scale-105 active:scale-95"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Backdrop Scrim */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm cursor-pointer"
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Slide-out Sidebar */}
        <motion.div
          className="fixed left-0 top-0 z-50 flex flex-col overflow-hidden bg-[#0a0a0a] border-r border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
          initial={false}
          animate={{
            width: open ? widthOpen : 0,
            height: "100vh",
          }}
          transition={transition}
          aria-hidden={!open}
        >
          <div className="flex flex-col h-full" style={{ width: widthOpen }}>
            {/* Drawer Header */}
            <div className="relative z-10 flex items-center justify-between h-20 px-6 shrink-0 border-b border-white/5">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/40 flex items-center gap-1.5">
                <Sparkles size={12} style={{ color: activeTheme.color }} />
                Spatial Menu
              </span>
              <button
                onClick={close}
                aria-label="Close navigation menu"
                className="flex items-center justify-center text-white/80 hover:text-white transition-all rounded-full h-9 w-9 hover:bg-white/10 active:scale-95 cursor-pointer"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Drawer Body with OptionWheel */}
            <div className="relative flex flex-col flex-1 overflow-hidden">
              <motion.div
                key="main"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={transition}
                className="flex flex-col justify-center h-full px-8 py-6"
              >
                <div className="w-full">
                  <p className="text-[11px] font-medium tracking-[0.35em] uppercase text-white/40 mb-3">
                    Explore
                  </p>

                  <div className="h-[360px] relative">
                    <OptionWheel
                      items={routeKeys}
                      defaultSelected={currentItemIndex}
                      onChange={(i, item) => {
                        sounds.playSwitch();
                        recordInteraction();
                        const path = routes[item];
                        if (!path) return;

                        close();

                        if (item === "Home") {
                          window.dispatchEvent(new Event("dome:gohome"));
                        }

                        navigate(path);
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-white/30 tracking-wide mt-2">
                    Scroll or tap to navigate
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Drawer Footer */}
            <div className="flex items-center justify-between px-6 py-6 border-t shrink-0 border-white/10 bg-black/40">
              {data.footerLinks.map((l, i) => (
                <Link
                  key={i}
                  to={l.href}
                  onClick={close}
                  className="text-[12px] text-white/60 transition-colors hover:text-white"
                >
                  {l.title}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </header>
    </>
  );
}
