import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "../../assets/images/logoorg.jpg";
import {navigation} from '../../data/HomePageData'


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">

      {/* ================= DESKTOP / MOBILE HEADER ================= */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-11 w-11 overflow-hidden rounded-full bg-[#13233b]">
            <img
              src={Logo}
              alt="Apostolic Church Sri Lanka"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Church name - Desktop */}
          <div className="hidden sm:block">
            <p className="text-sm font-bold tracking-wide text-[#13233b]">
              APOSTOLIC CHURCH
            </p>

            <p className="text-xs tracking-wider text-gray-500">
              SRI LANKA
            </p>
          </div>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#13233b]"
                    : "text-gray-600 hover:text-[#13233b]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* ================= DESKTOP CTA ================= */}
        <div className="hidden lg:block">
          <Link
            to="/churches"
            className="inline-flex items-center rounded-full bg-[#13233b] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d3557]"
          >
            Find a Church
          </Link>
        </div>

        {/* ================= MOBILE CHURCH NAME ================= */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center lg:hidden">
          <p className="text-base font-black tracking-wider text-[#13233b]">
            APOSTOLIC CHURCH
          </p>

          <p className="text-[10px] font-medium tracking-[0.25em] text-gray-500">
            SRI LANKA
          </p>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="ml-auto rounded-lg p-2 text-[#13233b] hover:bg-gray-100 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* ================= MOBILE NAVIGATION ================= */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl px-6 py-5">
            <div className="flex flex-col gap-1">

              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-medium ${
                      isActive
                        ? "bg-gray-100 text-[#13233b]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#13233b]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <Link
                to="/churches"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 rounded-full bg-[#13233b] px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Find a Church
              </Link>

            </div>
          </nav>
        </div>
      )}
    </header>
  );
}