import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { HashLink as Link } from "react-router-hash-link";

const AUTHORIZED_EMAIL = "pankaj0172004@gmail.com";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const closeMenu = () => setOpenMenu(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.email === AUTHORIZED_EMAIL) {
          setShowUpload(true);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <div className="fixed w-full md:shadow bg-blue-50 z-50  dark:bg-green-950 dark:text-white transition-all duration-500  ">
      <nav className="flex justify-between px-8 py-4 relative rounded-2xl font-semibold">
        <h1 className="text-2xl tracking-wider sm:text-3xl">
          Onco<span className="text-green-800">X</span>
        </h1>

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
          {showUpload && (
            <li>
              <Link
                smooth
                to="/upload"
                className="hover:text-green-700 transition-all duration-300"
              >
                Upload
              </Link>
            </li>
          )}
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
            {showUpload && (
              <li>
                <Link
                  smooth
                  to="/upload"
                  onClick={closeMenu}
                  className="hover:text-green-700 transition-all duration-300"
                >
                  Upload
                </Link>
              </li>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
