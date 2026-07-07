import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar=()=>{
    return(<>
    <div className="navbar fixed top-0 left-0 z-50 bg-transparent backdrop-blur-md px-8 py-3 transition-all duration-300">
  {/* Left */}
  <div className="navbar-start">
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle text-white hover:bg-white/10 border border-transparent hover:border-white/20 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M4 6h16M4 12h16M4 18h8"
          />
        </svg>
      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-4 w-56 rounded-2xl bg-black/70 backdrop-blur-xl text-white shadow-2xl border border-white/10 p-3"
      >
        <li>
          <a className="hover:text-amber-300 transition-colors">Home</a>
        </li>
        <li>
          <a className="hover:text-amber-300 transition-colors">Collections</a>
        </li>
        <li>
          <a className="hover:text-amber-300 transition-colors">About</a>
        </li>
        <li>
          <a className="hover:text-amber-300 transition-colors">Contact</a>
        </li>
      </ul>
    </div>
  </div>

  {/* Center */}
  <div className="navbar-center">
    <a
       className="text-2xl tracking-[0.2em] text-white"
    style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontOpticalSizing: "auto",
        fontWeight: 500,
        fontStyle: "normal",
        fontVariationSettings: '"wdth" 100',
    }}
    >
      DOM<span className="text-blue-800">É</span>
    </a>
  </div>

  {/* Right */}
  <div className="navbar-end gap-2">
    {/* Search */}
    <button className="btn btn-ghost btn-circle text-white hover:bg-white/10 transition-all duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M21 21l-5.2-5.2m1.2-4.8a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>
    </button>

    {/* Notifications */}
    <button className="btn btn-ghost btn-circle text-white hover:bg-white/10 transition-all duration-300">
      <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-4-5.7V5a2 2 0 10-4 0v.3A6 6 0 006 11v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 11-6 0"
          />
        </svg>

        <span className="badge badge-xs bg-amber-400 border-none indicator-item"></span>
      </div>
    </button>
  </div>
</div>
    </>)
}

export default Navbar