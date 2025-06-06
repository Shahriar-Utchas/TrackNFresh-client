import React, { useState } from 'react';
import { CakeSlice, HousePlus, Leaf, Menu, Refrigerator, UtensilsCrossed, X } from 'lucide-react';
import { NavLink } from 'react-router';
import ToggleTheme from '../ToggleTheme/ToggleTheme';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-1 transition ${isActive ? 'text-emerald-600 underline underline-offset-8' : 'text-base-content hover:text-emerald-600'}`;

    return (
        <nav className="w-full px-4 md:px-6 py-3 shadow-sm bg-base-100">
            <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4">

                {/* Logo & Title */}
                <div className="flex items-center space-x-3 flex-shrink-0">
                    <div className="group">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                            <img src="/img/logo.png" alt="logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center space-x-1">
                            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-600 bg-clip-text text-transparent tracking-tight">
                                Track<span className="text-emerald-400"><i>N</i></span>Fresh
                            </span>
                            <Leaf className="w-6 h-6 md:w-8 md:h-7 text-green-600 animate-bounce" />
                        </div>
                        <span className="text-xs md:text-sm text-green-800 dark:text-green-400">Stay Fresh, Waste Less</span>
                    </div>
                </div>

                {/* Mobile Toggle Button */}
                <div className="ml-auto md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Navigation & Buttons */}
                <div className={`w-full md:w-auto flex-col md:flex md:flex-row md:items-center justify-between md:flex-1 mt-4 md:mt-0 ${menuOpen ? 'flex' : 'hidden md:flex'} gap-4`}>

                    {/* Nav Links */}
                    <div className="flex flex-col md:flex-row md:justify-center md:flex-1 items-center gap-3 md:gap-8">
                        <NavLink to="/" className={navLinkClass}>
                            <HousePlus className="w-5 h-5" />Home
                        </NavLink>
                        <NavLink to="/fridge" className={navLinkClass}>
                            <Refrigerator className="w-5 h-5" />Fridge
                        </NavLink>
                        <NavLink to="/fridge" className={navLinkClass}>
                            <CakeSlice className="w-5 h-5" />Add Food
                        </NavLink>
                        <NavLink to="/fridge" className={navLinkClass}>
                            <UtensilsCrossed className="w-5 h-5" />My Items
                        </NavLink>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full md:w-auto">
                        <button className="w-full md:w-auto text-sm md:text-base bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md hover:from-emerald-600 hover:to-teal-700 transition-colors duration-300 cursor-pointer">
                            Login
                        </button>
                        <button className="w-full md:w-auto text-sm md:text-base bg-base-100 border border-green-600 text-green-700 font-semibold px-5 py-2 rounded-xl hover:bg-green-100/30 dark:hover:bg-green-900/20 transition-colors duration-300 cursor-pointer">
                            Register
                        </button>
                    </div>
                </div>
                <ToggleTheme />
            </div>
        </nav>
    );
};

export default Navbar;