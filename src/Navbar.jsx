import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
      className="group flex items-center justify-between py-3 text-[28px] leading-none tracking-tight text-base-content"
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
      className="inline-flex w-fit items-center py-1 text-[17px] leading-tight text-base-content underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-current"
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
      className="flex h-full flex-col gap-12 overflow-auto p-8 pt-16"
    >
      <p className="text-[32px] font-medium leading-none tracking-tight text-base-content">
        {item.title}
      </p>
      <div className="flex flex-col gap-8">
        {item.submenu.columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-1">
            <p className="mb-1 text-sm tracking-tight text-base-content/50">
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
  widthOpen = 400,
  brandName = "STUDIO",
}) {
  const [open, setOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const close = () => {
    setOpen(false);
    setActiveSubmenu(null);
  };

  return (
    <div className="relative h-screen w-full font-sans bg-base-200">
      {/* Demo backdrop content */}
      <div className="flex h-full flex-col items-center justify-center gap-2 p-10 text-base-content/40">
        <p className="text-sm uppercase tracking-widest">Page content</p>
        <p className="max-w-md text-center text-2xl text-base-content/60">
          The navbar above is transparent and overlays this content. Open the
          menu on the right to see the sidebar in action.
        </p>
      </div>

      {/* Transparent top navbar */}
      <div className="fixed inset-x-0 top-0 z-20 flex h-20 items-center justify-between bg-transparent px-6 md:px-10">
        <div className="flex-1" />

        <a
          href="#"
          className="flex-1 text-center text-lg font-semibold tracking-[0.2em] text-base-content"
        >
          {brandName}
        </a>

        {/* Right side: theme toggle + menu button */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-base-content">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input type="checkbox" value="synthwave" className="toggle theme-controller" />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-base-content">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>

          {!open && (
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full text-base-content transition-colors hover:bg-base-content/10"
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>

      <motion.div
        className="fixed right-0 top-0 z-30 flex flex-col overflow-hidden bg-base-100 shadow-[0_0_40px_rgba(0,0,0,0.08)]"
        initial={false}
        animate={{
          width: open ? widthOpen : 0,
          height: open ? "100vh" : 0,
        }}
        transition={transition}
      >
        <div className="flex h-full flex-col" style={{ width: widthOpen }}>
          <div className="relative z-10 flex h-20 shrink-0 items-center justify-end px-6">
            <button
              onClick={close}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full text-base-content transition-colors hover:bg-base-content/10"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
          </div>

          <div className="relative flex flex-1 flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              {activeSubmenu === null ? (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={transition}
                  className="flex h-full flex-col justify-between overflow-auto p-8"
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
                className="absolute left-8 top-8 text-sm text-base-content/50 underline-offset-2 hover:underline"
              >
                ← Back
              </button>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-6 border-t border-base-content/10 px-6 py-6">
            {data.footerLinks.map((l, i) => (
              <a
                key={i}
                href={l.href}
                className="text-[13px] text-base-content opacity-70 transition-opacity hover:opacity-100"
              >
                {l.title}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}