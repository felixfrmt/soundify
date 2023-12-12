"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className={`navbar ${showLinks ? "show-navbar" : "hide-navbar"}`}>
      <div className="navbar-logo">LOGO</div>
      <ul className="navbar-links">
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/Game">
          <li>Game</li>
        </Link>
        <Link href="/About">
          <li>About</li>
        </Link>
      </ul>
      <button className="burger" onClick={handleShowLinks}>
        <span className="burger-bar"></span>
      </button>
    </nav>
  );
}
