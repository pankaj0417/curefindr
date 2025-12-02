import React, { useState,} from "react";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { HashLink as Link } from "react-router-hash-link";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const closeMenu = () => setOpenMenu(false);

  return (
    <div className="fixed w-full md:shadow bg-blue-50 z-50  dark:bg-green-950 dark:text-white transition-all duration-500  ">
      <nav className="flex justify-between px-8 py-4 relative rounded-2xl font-semibold">
        <h1 className="text-2xl tracking-wider sm:text-3xl">Onco<span className="text-green-800">X</span></h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-xl text-gray-500 dark:text-white cursor-pointer">
          <li>
            <Link
              smooth
              to="/home"
              className="hover:text-green-700 transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              smooth
              to="/about"
              className="hover:text-green-700 transition-all duration-300"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              smooth
              to="/contact"
              className="hover:text-green-700 transition-all duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Hamburger Toggle */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="md:hidden text-xl p-3 cursor-pointer"
        >
          {openMenu ? <IoClose /> : <RxHamburgerMenu />}
        </button>

        {/* Mobile Menu */}
        {openMenu && (
          <ul className="absolute top-18 left-0 w-full flex flex-col py-4 text-center bg-blue-50 text-xl shadow text-gray-500 space-y-2 md:hidden cursor-pointer  dark:bg-green-950 dark:text-white transition-all duration-500 ">
            <li>
              <Link
                smooth
                to="/home"
                onClick={closeMenu}
                className="hover:text-green-700 transition-all duration-300"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                smooth
                to="/about"
                onClick={closeMenu}
                className="hover:text-green-700 transition-all duration-300"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                smooth
                to="/contact"
                onClick={closeMenu}
                className="hover:text-green-700 transition-all duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

/** <div
          className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 shadow-lg p-6 w-64 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-64"
          }`}
        >
          <h2 className="text-xl font-semibold mb-6">Menu</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer font-semibold">
              About
            </li>
            <li className="hover:text-blue-600 cursor-pointer">Research</li>
            <li className="hover:text-blue-600 cursor-pointer">Contact</li>
          </ul>
        </div>

        // Toggler 
        <button
          onClick={() => setOpen(!open)}
          className="fixed top-4 left-4 z-20 bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
          aria-expanded={open}
          aria-controls="sidebar"
        >
          {open ? "Close" : "Menu"}
        </button> */