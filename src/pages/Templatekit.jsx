import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Check,
  Sparkles,
  Zap,
  Code2,
  Copy,
  Sliders,
  DollarSign,
  ChevronDown,
  Layers,
  ArrowRight,
  ExternalLink,
  Volume2,
  X,
  CreditCard,
} from "lucide-react";
import OptionWheel from "../component/OptionWheel";
import { sounds } from "../utils/audio";
import { useInteractive } from "../context/InteractiveContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] },
  }),
};

const CURRENCIES = [
  { symbol: "$", code: "USD", rate: 1 },
  { symbol: "€", code: "EUR", rate: 0.92 },
  { symbol: "£", code: "GBP", rate: 0.79 },
  { symbol: "¥", code: "JPY", rate: 155 },
];

const BASE_KITS = [
  {
    id: "foundation",
    name: "Foundation",
    basePrice: 49,
    tagline: "The single-signature-moment starter",
    features: [
      "Navbar + submenu 3D wheel component",
      "Home hero with 3D scene slot",
      "Grain + radial glow atmospheric layer",
      "Tailwind design tokens & reset",
      "Interactive HUD controller widget",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    basePrice: 129,
    tagline: "Everything to ship a full spatial site",
    features: [
      "Everything in Foundation",
      "About, Resources, Contact pages",
      "Quantum Orb & Liquid Chrome shaders",
      "Framer Motion page transitions",
      "Web Audio synthesizer micro-interactions",
      "Responsive nav + footer patterns",
    ],
    featured: true,
  },
  {
    id: "gallery",
    name: "Gallery Pro",
    basePrice: 219,
    tagline: "For portfolio and gallery-style builds",
    features: [
      "Everything in Studio",
      "DOMÉ 3D Gallery dome component",
      "LaserFlow & Physics Lanyard modules",
      "Interactive component sandbox & playground",
      "Case-study page templates",
      "Priority 1-on-1 architecture support",
    ],
  },
];

const included = [
  {
    title: "Composables & Shaders",
    detail:
      "Navbar with animated wheel, OGL WebGL shaders (Orb, LiquidChrome), Three.js LaserFlow, and full Navier-Stokes GPU fluid simulation.",
  },
  {
    title: "Motion & Audio Presets",
    detail:
      "Micro-animations with framer-motion plus a zero-asset Web Audio API synthesizer for tactile clicks, hovers, and tone sequences.",
  },
  {
    title: "Design Tokens & Palettes",
    detail:
      "The #080808 / #000000 background pairing, curated sensory color aura scales, SVG grain textures, and responsive layout primitives.",
  },
  {
    title: "Turnkey Routes",
    detail:
      "A complete React Router DOM setup: Home, About, DOMÉ Gallery, Template Kit, Resources, and Contact — pre-configured and responsive.",
  },
];

export default function TemplateKit() {
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const [licenseType, setLicenseType] = useState("individual"); // 'individual' | 'team' (1.8x base, unlimited projects)
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  // Sandbox State
  const [activeTab, setActiveTab] = useState("wheel");
  const [blurValue, setBlurValue] = useState(16);
  const [tintOpacity, setTintOpacity] = useState(6);
  const [copiedKey, setCopiedKey] = useState(null);

  // Checkout modal
  const [selectedKit, setSelectedKit] = useState(null);
  const [checkoutDone, setCheckoutDone] = useState(false);

  const { recordInteraction, activeTheme } = useInteractive();
  const currency = CURRENCIES[currencyIndex];

  const getPrice = (base) => {
    let p = base;
    if (licenseType === "team") p = Math.round(p * 1.8);
    if (discountApplied) p = Math.round(p * 0.8);
    p = Math.round(p * currency.rate);
    return `${currency.symbol}${p}`;
  };

  const handleCopy = (key, text) => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const applyCoupon = () => {
    sounds.playClick();
    if (couponCode.trim().toUpperCase() === "DOME20") {
      setDiscountApplied(true);
      setCouponMsg("20% discount unlocked!");
      sounds.playSuccess();
    } else {
      setCouponMsg("Invalid coupon. Try 'DOME20'");
    }
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
              <Sparkles size={14} className="text-blue-400" />
              Interactive Template Kit
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mt-3 text-3xl font-semibold text-white md:text-5xl"
            >
              Build your own room
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mt-4 text-white/50 leading-relaxed text-sm md:text-base"
            >
              The same components, motion presets, shaders, and design tokens that power this site.
              Experiment with the live controls below to customize your tier and test components.
            </motion.p>
          </div>

          {/* Interactive Pricing Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* License Switcher */}
            <div className="flex items-center p-1 rounded-full bg-[#111116] border border-white/10 shadow-lg">
              <button
                onClick={() => {
                  sounds.playSwitch();
                  setLicenseType("individual");
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  licenseType === "individual"
                    ? "bg-blue-600 text-white shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Individual
              </button>
              <button
                onClick={() => {
                  sounds.playSwitch();
                  setLicenseType("team");
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  licenseType === "team"
                    ? "bg-blue-600 text-white shadow"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <span>Studio / Team</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/20 text-white">
                  Unlimited
                </span>
              </button>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center p-1 rounded-full bg-[#111116] border border-white/10">
              {CURRENCIES.map((c, i) => (
                <button
                  key={c.code}
                  onClick={() => {
                    sounds.playClick();
                    setCurrencyIndex(i);
                  }}
                  className={`w-7 h-7 rounded-full text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-center ${
                    currencyIndex === i
                      ? "bg-white/15 text-white border border-white/30"
                      : "text-white/40 hover:text-white"
                  }`}
                  title={c.code}
                >
                  {c.symbol}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing tiers */}
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
          {BASE_KITS.map((kit, i) => (
            <motion.div
              key={kit.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className={`flex flex-col p-6 rounded-2xl border transition-all duration-300 relative group ${
                kit.featured
                  ? "border-blue-400/40 bg-gradient-to-b from-blue-500/[0.08] to-blue-500/[0.02] shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
              }`}
            >
              {kit.featured && (
                <span className="self-start px-3 py-1 mb-4 text-[10px] tracking-widest uppercase rounded-full text-blue-300 bg-blue-500/20 border border-blue-400/30 flex items-center gap-1">
                  <Sparkles size={11} /> Most popular
                </span>
              )}

              <h3 className="text-xl font-medium text-white">{kit.name}</h3>
              <p className="mt-1 text-xs text-white/50 min-h-[32px]">{kit.tagline}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-white font-mono tracking-tight">
                  {getPrice(kit.basePrice)}
                </span>
                <span className="text-xs text-white/40">one-time payment</span>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {kit.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-xs md:text-sm leading-relaxed text-white/70"
                  >
                    <Check size={14} className="mt-0.5 text-blue-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  sounds.playClick();
                  recordInteraction();
                  setSelectedKit(kit);
                  setCheckoutDone(false);
                }}
                className={`mt-8 py-3 px-4 text-xs md:text-sm font-medium rounded-xl text-center transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:scale-[1.02] ${
                  kit.featured
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                    : "bg-white/[0.06] hover:bg-white/15 text-white border border-white/10"
                }`}
              >
                <span>Get {kit.name}</span>
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE COMPONENT PLAYGROUND & SANDBOX                */}
        {/* ========================================================= */}
        <div className="mt-24 p-6 md:p-8 rounded-3xl bg-[#0c0c12]/80 border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-blue-400 flex items-center gap-1.5">
                <Code2 size={13} />
                Live Component Laboratory
              </span>
              <h2 className="text-2xl font-light text-white mt-1">
                Interact with the Kit Components
              </h2>
            </div>

            {/* Sandbox Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "wheel", label: "OptionWheel" },
                { id: "glass", label: "Glass & Blur" },
                { id: "audio", label: "Audio Synthesizer" },
                { id: "tokens", label: "Design Tokens" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab(tab.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                      : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content 1: OptionWheel */}
          {activeTab === "wheel" && (
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-lg font-medium text-white">Interactive OptionWheel</h4>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">
                  Scroll or drag the cylindrical 3D selector below. It uses 3D transform perspectives
                  and velocity damping for a weighted physical touch.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-white/60 flex items-center justify-between">
                  <span>{"<OptionWheel items={[...]} />"}</span>
                  <button
                    onClick={() => handleCopy("wheel", '<OptionWheel items={["Hero", "About", "Gallery", "Docs"]} />')}
                    className="flex items-center gap-1 text-blue-400 hover:text-blue-300 cursor-pointer"
                  >
                    <Copy size={12} />
                    <span>{copiedKey === "wheel" ? "Copied!" : "Copy JSX"}</span>
                  </button>
                </div>
              </div>

              <div className="h-[260px] bg-black/60 rounded-2xl border border-white/10 p-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                <OptionWheel
                  items={["Hero 3D", "Quantum Orb", "Fluid Mesh", "Gallery Dome", "Kinetic HUD"]}
                  defaultSelected={0}
                  onChange={(idx, val) => sounds.playHover()}
                />
              </div>
            </div>
          )}

          {/* Tab Content 2: Glass & Blur */}
          {activeTab === "glass" && (
            <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Fluid Glass Controls</h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  Adjust backdrop blur and glass opacity in real time to see how the card responds
                  to the atmospheric lighting underneath.
                </p>

                <div>
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>Backdrop Blur</span>
                    <span className="font-mono text-blue-400">{blurValue}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={blurValue}
                    onChange={(e) => setBlurValue(Number(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>Surface Tint</span>
                    <span className="font-mono text-blue-400">{tintOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    value={tintOpacity}
                    onChange={(e) => setTintOpacity(Number(e.target.value))}
                    className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>

              <div className="h-[240px] rounded-2xl p-6 flex flex-col justify-between border border-white/15 relative overflow-hidden shadow-2xl transition-all"
                style={{
                  backdropFilter: `blur(${blurValue}px)`,
                  backgroundColor: `rgba(255, 255, 255, ${tintOpacity / 100})`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-white/60">
                    Live Glass Preview
                  </span>
                  <div className="w-3 h-3 rounded-full bg-blue-400 animate-ping" />
                </div>
                <div>
                  <h3 className="text-xl font-light text-white">Dynamic Glassmorphism</h3>
                  <p className="text-xs text-white/50 mt-1">
                    Zero blur halo artifacts, GPU compositor friendly.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-white/40">
                  backdrop-blur-[{blurValue}px] bg-white/[{(tintOpacity / 100).toFixed(2)}]
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 3: Audio Synthesizer */}
          {activeTab === "audio" && (
            <div className="py-8">
              <h4 className="text-lg font-medium text-white">Web Audio Synthesizer Keys</h4>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Click or tap the sensory frequency pads below to trigger zero-asset procedural tones.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-6">
                {[
                  { name: "Swoosh", freq: 320, type: "sine" },
                  { name: "Tick", freq: 520, type: "sine" },
                  { name: "Haptic", freq: 680, type: "triangle" },
                  { name: "Chime", freq: 880, type: "sine" },
                  { name: "Resonance", freq: 1046, type: "triangle" },
                  { name: "Fanfare", action: () => sounds.playSuccess() },
                ].map((pad, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (pad.action) pad.action();
                      else sounds.playPop(pad.freq, pad.type);
                    }}
                    className="p-4 rounded-xl bg-white/[0.04] hover:bg-blue-600/30 border border-white/10 hover:border-blue-400/40 text-center transition-all cursor-pointer active:scale-95 group"
                  >
                    <Volume2 size={16} className="mx-auto text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="block mt-2 text-xs font-medium text-white">{pad.name}</span>
                    <span className="block text-[10px] text-white/40 font-mono">
                      {pad.freq ? `${pad.freq}Hz` : "Seq"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content 4: Design Tokens */}
          {activeTab === "tokens" && (
            <div className="py-8 space-y-4">
              <h4 className="text-lg font-medium text-white">Color Tokens &amp; Tailwind Classes</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: "Void Black", hex: "#080808", tailwind: "bg-[#080808]" },
                  { name: "Studio Ink", hex: "#0e0e14", tailwind: "bg-[#0e0e14]" },
                  { name: "Cyan Aura", hex: "#00f0ff", tailwind: "text-cyan-400" },
                  { name: "Electric Blue", hex: "#3b82f6", tailwind: "bg-blue-600" },
                ].map((t) => (
                  <div
                    key={t.name}
                    onClick={() => handleCopy(t.hex, t.hex)}
                    className="p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer transition-all"
                  >
                    <div className="w-full h-8 rounded-lg mb-2 border border-white/10" style={{ backgroundColor: t.hex }} />
                    <div className="text-xs text-white font-medium">{t.name}</div>
                    <div className="text-[10px] font-mono text-white/50">{t.hex}</div>
                    <div className="text-[9px] text-blue-400 mt-1">
                      {copiedKey === t.hex ? "Copied!" : "Click to copy"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* What's included */}
        <div className="mt-24">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-xs tracking-[0.3em] uppercase text-white/40 flex items-center gap-2"
          >
            <Layers size={13} className="text-blue-400" />
            What's included in every download
          </motion.p>

          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
            {included.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="p-6 transition-all border rounded-2xl border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
              >
                <h3 className="text-lg font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coupon Bar */}
        <div className="mt-16 p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Zap size={15} />
            </div>
            <div>
              <div className="text-xs font-medium text-white">Got a promo code?</div>
              <div className="text-[11px] text-white/40">Try code <span className="font-mono text-blue-400">DOME20</span> for 20% off all packages.</div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Enter code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-blue-400 uppercase font-mono w-full sm:w-32"
            />
            <button
              onClick={applyCoupon}
              className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium cursor-pointer transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
        {couponMsg && (
          <p className="mt-2 text-center text-xs font-mono text-blue-400">{couponMsg}</p>
        )}

        {/* Interactive Checkout Modal */}
        <AnimatePresence>
          {selectedKit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
              onClick={() => setSelectedKit(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="max-w-md w-full p-6 rounded-3xl bg-[#0f0f16] border border-white/15 shadow-2xl text-white relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedKit(null)}
                  className="absolute top-5 right-5 text-white/40 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>

                {!checkoutDone ? (
                  <>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-blue-400">
                      Checkout Preview
                    </span>
                    <h3 className="text-2xl font-semibold mt-1">Get {selectedKit.name}</h3>
                    <p className="text-xs text-white/50 mt-1">{selectedKit.tagline}</p>

                    <div className="mt-6 p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Tier</span>
                        <span className="text-white font-medium">{selectedKit.name}</span>
                      </div>
                      <div className="flex justify-between text-xs text-white/70">
                        <span>License</span>
                        <span className="text-white capitalize">{licenseType}</span>
                      </div>
                      {discountApplied && (
                        <div className="flex justify-between text-xs text-emerald-400">
                          <span>Discount (20%)</span>
                          <span>-20%</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-white/10 flex justify-between text-base font-semibold">
                        <span>Total Due</span>
                        <span className="font-mono text-blue-400">{getPrice(selectedKit.basePrice)}</span>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button
                        onClick={() => {
                          sounds.playSuccess();
                          setCheckoutDone(true);
                        }}
                        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer transition-all"
                      >
                        <CreditCard size={16} />
                        <span>Confirm &amp; Instant Access</span>
                      </button>
                      <p className="text-[11px] text-white/40 text-center">
                        Instant ZIP download + GitHub access token included.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="py-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Access Granted!</h3>
                    <p className="text-xs text-white/60 leading-relaxed max-w-xs mx-auto">
                      Your spatial starter kit package is ready. Use the token below in your repo:
                    </p>
                    <div className="p-3 bg-black/60 rounded-xl border border-white/10 font-mono text-[11px] text-blue-300 select-all">
                      DOME-STARTER-KEY-2026-X9
                    </div>
                    <button
                      onClick={() => setSelectedKit(null)}
                      className="mt-4 px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
