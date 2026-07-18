import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import OptionWheel from "../component/OptionWheel";

const transition = { duration: 0.5, ease: [0.54, 0.01, 0.19, 0.93] };

const defaultData = {
  mainMenu: [
    { title: "Work", href: "#" },
    { title: "Studio", href: "#" },
    {
      title: "Services",
      submenu: {
        columns: [
          {
            tagline: "Design",
            links: [
              { title: "Brand identity", href: "#" },
              { title: "Web design", href: "#" },
              { title: "Product design", href: "#" },
            ],
          },
          {
            tagline: "Build",
            links: [
              { title: "Development", href: "#" },
              { title: "Motion", href: "#" },
              { title: "Consulting", href: "#" },
            ],
          },
        ],
      },
    },
    {
      title: "Resources",
      submenu: {
        columns: [
          {
            tagline: "Learn",
            links: [
              { title: "Journal", href: "#" },
              { title: "Guides", href: "#" },
              { title: "FAQ", href: "#" },
            ],
          },
          {
            tagline: "Connect",
            links: [
              { title: "Newsletter", href: "#" },
              { title: "Community", href: "#" },
              { title: "Events", href: "#" },
            ],
          },
        ],
      },
    },
    { title: "Contact", href: "#" },
  ],
  footerLinks: [
    { title: "Terms", href: "#" },
    { title: "Privacy", href: "#" },
    { title: "Support", href: "#" },
    { title: "Contact", href: "#" },
  ],
};

function NavLink({ title, href = "#", onClick, hasSubmenu, active }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group flex items-center justify-between py-3 text-[18px] leading-none tracking-tight text-white"
    >
      <span className="underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-current">
        {title}
      </span>
      {hasSubmenu && (
        <ArrowUpRight
          size={22}
          strokeWidth={1.75}
          className={`shrink-0 transition-transform duration-300 ${
            active ? "rotate-45" : "group-hover:rotate-45"
          }`}
        />
      )}
    </a>
  );
}

function SubLink({ title, href = "#" }) {
  return (
    <a
      href={href}
      className="inline-flex w-fit items-center py-1 text-[17px] leading-tight text-white underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-current"
    >
      {title}
    </a>
  );
}

function SubmenuView({ item }) {
  return (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={transition}
      className="flex flex-col h-full gap-12 p-8 pt-16 overflow-auto"
    >
      <p className="text-[32px] font-medium leading-none tracking-tight text-white">
        {item.title}
      </p>
      <div className="flex flex-col gap-8 ">
        {item.submenu.columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-1">
            <p className="mb-1 text-sm tracking-tight text-white/50">
              {col.tagline}
            </p>
            <div className="flex flex-col">
              {col.links.map((l, j) => (
                <SubLink key={j} {...l} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SubmenuSidebarNav({
  data = defaultData,
  widthOpen = 280,
  brandName = "DOMÉ",
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
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
    setActiveSubmenu(null);
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
            <AnimatePresence mode="wait">
              {activeSubmenu === null ? (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={transition}
                  className="flex flex-col justify-between h-full p-8 overflow-auto"
                >
                  <div className="flex flex-col">
                    {data.mainMenu.map((item, i) =>
                      item.submenu ? (
                        <NavLink
                          key={i}
                          title={item.title}
                          hasSubmenu
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveSubmenu(i);
                          }}
                        />
                      ) : (
                        <NavLink key={i} title={item.title} href={item.href} />
                      )
                    )}
                  </div>
                </motion.div>
              ) : (
                <SubmenuView key="submenu" item={data.mainMenu[activeSubmenu]} />
              )}
            </AnimatePresence>

            {activeSubmenu !== null && (
              <button
                onClick={() => setActiveSubmenu(null)}
                className="absolute text-sm left-8 top-8 text-white/50 underline-offset-2 hover:underline"
              >
                ← Back
              </button>
            )}
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