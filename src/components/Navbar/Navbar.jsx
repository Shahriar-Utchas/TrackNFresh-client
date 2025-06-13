import React, { useContext, useEffect, useState, useRef } from 'react';
import { CakeSlice, HousePlus, Leaf, Menu, Refrigerator, UtensilsCrossed, X } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import { AuthContext } from '../../Provider/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  // Refs for click outside detection
  const profileMenuRefMobile = useRef(null);
  const profileMenuRefDesktop = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideMobileProfile =
        profileMenuRefMobile.current && !profileMenuRefMobile.current.contains(event.target);
      const clickedOutsideDesktopProfile =
        profileMenuRefDesktop.current && !profileMenuRefDesktop.current.contains(event.target);
      const clickedOutsideMobileMenu =
        mobileMenuRef.current && !mobileMenuRef.current.contains(event.target);

      if (profileMenuOpen && clickedOutsideMobileProfile && clickedOutsideDesktopProfile) {
        setProfileMenuOpen(false);
      }

      if (menuOpen && clickedOutsideMobileMenu) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen, profileMenuOpen]);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-1 transition ${isActive ? 'text-emerald-600 underline underline-offset-8' : 'text-base-content hover:text-emerald-600'}`;

  return (
    <nav
      className={`w-full px-4 md:px-6 py-3 z-50 transition-all duration-300 ${
        scrolled ? 'fixed top-0 left-0 bg-base-100/70 backdrop-blur-md shadow-md' : 'bg-base-100'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
        {/* Top Row: Logo and Mobile Controls */}
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="group">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <img src="/img/logo.png" alt="logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-600 bg-clip-text text-transparent tracking-tight">
                    Track<span className="text-emerald-400">
                      <i>N</i>
                    </span>
                    Fresh
                  </span>
                  <Leaf className="w-6 h-6 md:w-8 md:h-7 text-green-600 animate-bounce" />
                </div>
                <span className="text-xs md:text-sm text-green-800 dark:text-green-400">Stay Fresh, Waste Less</span>
              </div>
            </div>
          </Link>

          {/* Mobile Right: Toggle, Avatar, Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <ToggleTheme />
            {user && (
              <div className="relative" ref={profileMenuRefMobile}>
                <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="focus:outline-none">
                  <img
                    src={user?.photoURL || '/img/default-profile.png'}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  />
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-base-100 border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                    <button
                      onClick={() => {
                        logout();
                        setProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition-colors rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
          </div>
        </div>

        {/* Navigation & Auth/Profile */}
        <div
          ref={mobileMenuRef}
          className={`w-full md:flex md:items-center md:justify-between gap-4 transition-all duration-300 ${
            menuOpen ? 'flex flex-col' : 'hidden md:flex'
          }`}
        >
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row md:justify-center md:flex-1 items-center gap-3 md:gap-8 mt-2 md:mt-0">
            <NavLink to="/" className={navLinkClass}>
              <HousePlus className="w-5 h-5" />
              Home
            </NavLink>
            <NavLink to="/fridge" className={navLinkClass}>
              <Refrigerator className="w-5 h-5" />
              Fridge
            </NavLink>
            {user && (
              <NavLink to="/add-food" className={navLinkClass}>
                <CakeSlice className="w-5 h-5" />
                Add Food
              </NavLink>
            )}
            {user && (
              <NavLink to="/my-items" className={navLinkClass}>
                <UtensilsCrossed className="w-5 h-5" />
                My Items
              </NavLink>
            )}
          </div>

          {/* Auth or Desktop Avatar */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full md:w-auto relative mt-2 md:mt-0">
            {!user ? (
              <>
                <Link to="/login" className="w-full md:w-auto">
                  <button className="w-full md:w-auto text-sm md:text-base bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md hover:from-emerald-600 hover:to-teal-700 transition-colors duration-300 cursor-pointer">
                    Login
                  </button>
                </Link>
                <Link to="/register" className="w-full md:w-auto">
                  <button className="w-full md:w-auto text-sm md:text-base bg-base-100 border border-green-600 text-green-700 font-semibold px-5 py-2 rounded-xl hover:bg-green-100/30 dark:hover:bg-green-900/20 transition-colors duration-300 cursor-pointer">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <div className="relative hidden md:block" ref={profileMenuRefDesktop}>
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="relative group">
                    <img
                      src={user?.photoURL || '/img/default-profile.png'}
                      alt="User Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    />
                    <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 bg-neutral text-neutral-content text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition z-50">
                      {user.displayName || 'User'}
                    </div>
                  </div>
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-base-100 border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                    <button
                      onClick={() => {
                        logout();
                        setProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition-colors rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Theme Toggle */}
        <div className="hidden md:block">
          <ToggleTheme />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
