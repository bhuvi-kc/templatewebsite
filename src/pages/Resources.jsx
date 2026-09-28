import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Copy,
  Check,
  Terminal,
  Layers,
  Sparkles,
  ExternalLink,
  Code,
  Package,
} from "lucide-react";
import { sounds } from "../utils/audio";
import { useInteractive } from "../context/InteractiveContext";

const stack = [
  {
    category: "Core Framework",
    items: [
      {
        name: "React",
        pkg: "react",
        role: "UI Library",
        detail:
          "Every screen on this site — Home, Navbar, Gallery, Resources — is built as a composable React component tree. State is handled with hooks like useState and useEffect.",
        docs: "https://react.dev",
      },
      {
        name: "Vite",
        pkg: "vite",
        role: "Build Tool",
        detail:
          "Powers the dev server and production bundling. Gives us near-instant hot module reload while building the UI, and a fast, optimized build for deployment.",
        docs: "https://vitejs.dev",
      },
    ],
  },
  {
    category: "Styling",
    items: [
      {
        name: "Tailwind CSS",
        pkg: "tailwindcss",
        role: "Utility-first CSS",
        detail:
          "All layout, spacing, color, and responsive breakpoints across the site are written with Tailwind utility classes directly in JSX — no separate CSS files to maintain.",
        docs: "https://tailwindcss.com",
      },
    ],
  },
  {
    category: "Animation",
    items: [
      {
        name: "Framer Motion",
        pkg: "framer-motion",
        role: "Animation Library",
        detail:
          "Drives every transition on the site: the sidebar menu sliding open/closed, fade-and-slide entrances on Home and Resources, and AnimatePresence exit animations.",
        docs: "https://motion.dev",
      },
    ],
  },
  {
    category: "3D & Shaders",
    items: [
      {
        name: "Spline",
        pkg: "@splinetool/react-spline",
        role: "3D Spatial Scene",
        detail:
          "The homepage hero is a live, interactive 3D scene rendered via @splinetool/react-spline, layered under grain and soft glow for depth.",
        docs: "https://spline.design",
      },
      {
        name: "OGL Shaders",
        pkg: "ogl",
        role: "WebGL 3D Minimalist Engine",
        detail:
          "Powers the lightweight Quantum Orb and Liquid Chrome interactive shaders, delivering 60 FPS GPU-accelerated effects with minimal footprint.",
        docs: "https://github.com/oframe/ogl",
      },
      {
        name: "Three.js",
        pkg: "three",
        role: "3D Engine",
        detail:
          "Used for LaserFlow volumetric beam rendering and physical interactive scene geometry.",
        docs: "https://threejs.org",
      },
    ],
  },
  {
    category: "Icons",
    items: [
      {
        name: "lucide-react",
        pkg: "lucide-react",
        role: "Icon Set",
        detail:
          "Supplies the Menu, X, and sensory icons used in the navbar and HUD controls, keeping icon weight consistent with the rest of the UI.",
        docs: "https://lucide.dev",
      },
    ],
  },
  {
    category: "Routing",
    items: [
      {
        name: "react-router-dom",
        pkg: "react-router-dom",
        role: "Client-side Routing",
        detail:
          "Handles navigation between Home, About, DOMÉ Gallery, Template Kit, Resources, and Contact without full page reloads.",
        docs: "https://reactrouter.com",
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Resources() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedPkg, setCopiedPkg] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const { recordInteraction, activeTheme } = useInteractive();

  const categories = useMemo(() => {
    return ["All", ...stack.map((s) => s.category)];
  }, []);

  const filteredStack = useMemo(() => {
    return stack
      .map((cat) => {
        if (selectedCategory !== "All" && cat.category !== selectedCategory) {
          return null;
        }
        const matchingItems = cat.items.filter((item) => {
          const q = search.toLowerCase();
          return (
            item.name.toLowerCase().includes(q) ||
            item.role.toLowerCase().includes(q) ||
            item.detail.toLowerCase().includes(q) ||
            (item.pkg && item.pkg.toLowerCase().includes(q))
          );
        });
        if (matchingItems.length === 0) return null;
        return { ...cat, items: matchingItems };
      })
      .filter(Boolean);
  }, [search, selectedCategory]);

  const copyInstall = (pkg) => {
    sounds.playClick();
    recordInteraction();
    const cmd = `npm i ${pkg}`;
    navigator.clipboard.writeText(cmd);
    setCopiedPkg(pkg);
    setTimeout(() => setCopiedPkg(null), 2000);
  };

  return (
    <div
      className="min-h-[calc(100vh-80px)] w-full relative overflow-hidden select-none"
      style={{ background: "#080808" }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${activeTheme.glow} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 max-w-5xl px-6 py-20 mx-auto md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs tracking-[0.35em] uppercase text-white/40 flex items-center gap-2"
            >
              <Sparkles size={13} className="text-blue-400" />
              Stack &amp; Architecture
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-3 text-3xl font-semibold text-white md:text-5xl"
            >
              Interactive Resources
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mt-4 text-white/50 text-sm md:text-base leading-relaxed"
            >
              Every library, renderer, and framework powering this spatial environment. Filter,
              inspect packages, or copy install commands directly.
            </motion.p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              placeholder="Search dependencies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#111116] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sounds.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Stack List */}
        <div className="mt-12 space-y-12">
          {filteredStack.map((section, sIdx) => (
            <div key={section.category}>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/40 px-3">
                  {section.category}
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-xs text-white/40">{item.role}</span>
                        </div>
                        {item.pkg && (
                          <button
                            onClick={() => copyInstall(item.pkg)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-[11px] font-mono text-white/70 hover:text-white hover:border-white/30 transition-all cursor-pointer active:scale-95"
                            title="Copy install command"
                          >
                            <Terminal size={12} className="text-blue-400" />
                            <span>{copiedPkg === item.pkg ? "Copied!" : item.pkg}</span>
                            {copiedPkg === item.pkg ? (
                              <Check size={11} className="text-emerald-400" />
                            ) : (
                              <Copy size={11} className="text-white/40" />
                            )}
                          </button>
                        )}
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-white/50">{item.detail}</p>
                    </div>

                    {item.docs && (
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <a
                          href={item.docs}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <span>Official Documentation</span>
                          <ExternalLink size={11} />
                        </a>
                        <span className="text-[10px] font-mono text-white/30 uppercase">
                          Verified
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {filteredStack.length === 0 && (
            <div className="py-16 text-center text-white/40">
              No matching resources found for "{search}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
