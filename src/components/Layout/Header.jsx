import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../../auth/firebase";

const navItems = [
  { label: "STORE", to: "/" },
  { label: "TOP SELLERS", to: "/search" },
  { label: "OPEN WORLD", to: "/category" },
  // { label: "SIGN UP", to: "/signup" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedUp(Boolean(user));
    });

    return unsubscribe;
  }, []);

  const navigationItems = isSignedUp
    ? navItems
    : [...navItems, { label: "SIGN UP", to: "/signup" }];

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="bg-[#171d25]">
      <div className="mx-auto max-w-[940px] px-4 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            onClick={closeMenu}
            className="shrink-0 text-2xl font-bold tracking-tight text-white transition-opacity hover:opacity-80 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#66c0f4]"
          >
            FREZNEL
          </NavLink>

          <nav className="hidden sm:block" aria-label="Main navigation">
            <ul className="flex items-center gap-x-2 text-sm">
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `inline-flex min-h-10 items-center rounded-sm px-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4] ${
                        isActive
                          ? "bg-white/10 text-[#66c0f4]"
                          : "text-white/70 hover:text-white focus-visible:bg-white/10 focus-visible:text-[#66c0f4]"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-white transition-colors hover:bg-white/10 active:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4] sm:hidden"
          >
            <span className="text-2xl leading-none" aria-hidden="true">
              {menuOpen ? "×" : "☰"}
            </span>
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="mt-4 border-t border-white/10 pt-3 sm:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="flex flex-col">
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex min-h-11 items-center rounded-sm px-3 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#66c0f4] ${
                        isActive
                          ? "bg-white/10 text-[#66c0f4]"
                          : "text-white/70 hover:bg-white/5 hover:text-white focus-visible:bg-white/10 focus-visible:text-[#66c0f4]"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
