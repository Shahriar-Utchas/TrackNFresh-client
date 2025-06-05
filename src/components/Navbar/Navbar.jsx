import React, { useState } from 'react';
import { CakeSlice, HousePlus, Leaf, Menu, Refrigerator, ShoppingCart, UtensilsCrossed, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-1 transition ${isActive ? 'text-green-800 underline underline-offset-8' : 'text-base-content hover:text-green-700'}`;


    return (
        <nav className="w-full px-4 md:px-6 py-3 shadow-sm bg-gradient-to-r from-white via-green-50 to-white">
            <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4">

                {/* Logo & Title */}
                <div className="flex items-center space-x-3 flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-md bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-300 flex items-center justify-center overflow-hidden">
                        <img src="/img/logo.png" alt="logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-1">
                            <span className="text-lg md:text-2xl font-semibold text-emerald-800">
                                Track<span className="text-emerald-600"><i>N</i></span>Fresh
                            </span>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 1,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatType: "loop"
                                }}
                            >
                                <Leaf className="w-6 h-6 md:w-8 md:h-7 text-emerald-500" />
                            </motion.div>
                        </div>
                        <span className="text-xs md:text-sm text-emerald-800">Stay Fresh, Waste Less</span>
                    </div>
                </div>

                {/* Mobile Toggle Button */}
                <div className="ml-auto md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Navigation & Buttons */}
                <div className={`w-full md:w-auto flex-col md:flex md:flex-row md:items-center justify-between md:flex-1 mt-4 md:mt-0 ${menuOpen ? 'flex' : 'hidden md:flex'} gap-4 `}>

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
                        <button className="w-full md:w-auto text-sm md:text-base bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md hover:from-emerald-500 hover:to-emerald-700 transition-colors duration-300">
                            Login
                        </button>
                        <button className="w-full md:w-auto text-sm md:text-base bg-white border border-emerald-500 text-emerald-600 font-semibold px-5 py-2 rounded-xl hover:bg-gradient-to-r hover:from-emerald-100 hover:to-emerald-200 transition-colors duration-300">
                            Register
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
