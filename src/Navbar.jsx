import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

/**
 * Submenu Sidebar Nav
 * A from-scratch React/Tailwind + Framer Motion recreation of the
 * Framer "Submenu Sidebar Nav" component's behavior:
 *  - Fixed top-right (or top-left) menu button toggles a sliding sidebar
 *  - Main menu items with two of them expanding into a full submenu view
 *  - Submenu view shows a title, then two columns of tagline + links
 *  - Footer row of secondary links pinned to the bottom
 *
 * Fully self-contained, no external component deps.
 */

const transition = { duration: 0.5, ease: [0.54, 0.01, 0.19, 0.93] };

const defaultData = {
  backgroundColor: "#ffffff",
  fontColor: "#141414",
  taglineColor: "#c2c2c2",
  iconColor: "#141414",
  underlineColor: "#141414",
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

function NavLink({ title, href = "#", underlineColor, fontColor, onClick, hasSubmenu, active }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group flex items-center justify-between py-3 text-[28px] leading-none tracking-tight"
      style={{ color: fontColor }}
    >
      <span
        className="underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 ease-out"
        style={{ textDecorationColor: "transparent" }}
        onMouseEnter={(e) => (e.currentTarget.style.textDecorationColor = underlineColor)}
        onMouseLeave={(e) => (e.currentTarget.style.textDecorationColor = "transparent")}
      >
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

function SubLink({ title, href = "#", underlineColor, fontColor }) {
  return (
    <a
      href={href}
      className="inline-flex w-fit items-center py-1 text-[17px] leading-tight underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 ease-out hover:decoration-current"
      style={{ color: fontColor, textDecorationColor: "transparent" }}
      onMouseEnter={(e) => (e.currentTarget.style.textDecorationColor = underlineColor)}
      onMouseLeave={(e) => (e.currentTarget.style.textDecorationColor = "transparent")}
    >
      {title}
    </a>
  );
}

function SubmenuView({ item, underlineColor, fontColor, taglineColor }) {
  return (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={transition}
      className="flex h-full flex-col gap-12 overflow-auto p-8 pt-16"
    >
      <p
        className="text-[32px] font-medium leading-none tracking-tight"
        style={{ color: fontColor }}
      >
        {item.title}
      </p>
      <div className="flex flex-col gap-8">
        {item.submenu.columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-1">
            <p
              className="mb-1 text-sm tracking-tight"
              style={{ color: taglineColor }}
            >
              {col.tagline}
            </p>
            <div className="flex flex-col">
              {col.links.map((l, j) => (
                <SubLink key={j} {...l} underlineColor={underlineColor} fontColor={fontColor} />
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
  const [activeSubmenu, setActiveSubmenu] = useState(null); // index of item with open submenu, or null

  const close = () => {
    setOpen(false);
    setActiveSubmenu(null);
  };

  return (
    <div className="relative h-screen w-full font-sans" style={{ background: "#fafafa" }}>
      {/* Demo backdrop content so the nav has something to sit above */}
      <div className="flex h-full flex-col items-center justify-center gap-2 p-10 text-neutral-300">
        <p className="text-sm uppercase tracking-widest">Page content</p>
        <p className="max-w-md text-center text-2xl text-neutral-400">
          The navbar above is transparent and overlays this content. Open the
          menu on the right to see the sidebar in action.
        </p>
      </div>

      {/* Transparent top navbar with centered branding */}
      <div className="fixed inset-x-0 top-0 z-20 flex h-20 items-center justify-between bg-transparent px-6 md:px-10">
        {/* Left spacer / optional left links */}
        <div className="flex-1" />

        {/* Centered brand */}
        <a
          href="#"
          className="flex-1 text-center text-lg font-semibold tracking-[0.2em]"
          style={{ color: data.iconColor }}
        >
          {brandName}
        </a>

        {/* Right: menu toggle, kept clear of the sidebar's own button when open */}
        <div className="flex flex-1 justify-end">
          {!open && (
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-black/5"
              style={{ color: data.menuIconColor || data.iconColor }}
            >
              <Menu size={20} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </div>

      <motion.div
        className="fixed right-0 top-0 z-30 flex flex-col overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.08)]"
        style={{ backgroundColor: data.backgroundColor }}
        initial={false}
        animate={{
          width: open ? widthOpen : 0,
          height: open ? "100vh" : 0,
        }}
        transition={transition}
      >
        <div className="flex h-full flex-col" style={{ width: widthOpen }}>
        {/* Top bar: close button, aligned with navbar height */}
        <div className="relative z-10 flex h-20 shrink-0 items-center justify-end px-6">
          <button
            onClick={close}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-black/5"
            style={{ color: data.menuIconColor || data.iconColor }}
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </div>

        {/* Body */}
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
                        underlineColor={data.underlineColor}
                        fontColor={data.fontColor}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveSubmenu(i);
                        }}
                      />
                    ) : (
                      <NavLink
                        key={i}
                        title={item.title}
                        href={item.href}
                        underlineColor={data.underlineColor}
                        fontColor={data.fontColor}
                      />
                    )
                  )}
                </div>
              </motion.div>
            ) : (
              <SubmenuView
                key="submenu"
                item={data.mainMenu[activeSubmenu]}
                underlineColor={data.underlineColor}
                fontColor={data.fontColor}
                taglineColor={data.taglineColor}
              />
            )}
          </AnimatePresence>

          {/* Back button when inside a submenu */}
          {activeSubmenu !== null && (
            <button
              onClick={() => setActiveSubmenu(null)}
              className="absolute left-8 top-8 text-sm underline-offset-2 hover:underline"
              style={{ color: data.taglineColor }}
            >
              ← Back
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center gap-6 border-t border-black/10 px-6 py-6">
          {data.footerLinks.map((l, i) => (
            <a
              key={i}
              href={l.href}
              className="text-[13px] opacity-70 transition-opacity hover:opacity-100"
              style={{ color: data.fontColor }}
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