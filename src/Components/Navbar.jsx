import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/Together Now.png";
import { Link, NavLink } from "react-router";
import { Sun, Moon, User, LogOut, LayoutDashboard } from "lucide-react";
import userIcon from "../assets/download.png";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, signOutUser } = React.useContext(AuthContext);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged out successfully!",
              showConfirmButton: false,
              timer: 1400,
            });
            setDropdownOpen(false);
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Logout Failed",
              text: error.message,
            });
          });
      }
    });
  };

  return (
    <div className="bg-secondary sticky top-0 z-50 shadow-md">
      <div className="navbar w-full md:w-11/12 mx-auto py-1 md:py-3 lg:py-6">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/upcoming-events">Upcoming Events</NavLink>
              </li>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/privacy">Privacy & Terms</NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="flex gap-2 items-center">
            <img className="w-10 lg:w-[50px]" src={logo} alt="" />
            <NavLink to="/" className="lg:text-2xl font-bold">
              Together <span className="text-green-800">Now</span>
            </NavLink>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1 flex gap-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `lg:text-[20px] relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-green-800 after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "font-bold text-green-800 after:w-full" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/upcoming-events"
                className={({ isActive }) =>
                  `lg:text-[20px] relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-green-800 after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "font-bold text-green-800 after:w-full" : ""
                  }`
                }
              >
                Upcoming Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `lg:text-[20px] relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-green-800 after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "font-bold text-green-800 after:w-full" : ""
                  }`
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `lg:text-[20px] relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-green-800 after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "font-bold text-green-800 after:w-full" : ""
                  }`
                }
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `lg:text-[20px] relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-green-800 after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "font-bold text-green-800 after:w-full" : ""
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy"
                className={({ isActive }) =>
                  `lg:text-[20px] relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-green-800 after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "font-bold text-green-800 after:w-full" : ""
                  }`
                }
              >
                Privacy & Terms
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end flex items-center gap-2 md:gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-green-700 hover:bg-green-100 dark:hover:bg-green-500 cursor-pointer transition"
            title="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-2 md:w-5 h-2 md:h-5 text-green-800" />
            ) : (
              <Sun className="w-2 md:w-5 h-2 md:h-5 text-yellow-400" />
            )}
          </button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                title={user.displayName || "User"}
                className="cursor-pointer"
              >
                <img
                  src={user.photoURL || userIcon}
                  alt={user.displayName || "User"}
                  className="w-8 md:w-12 h-8 md:h-12 rounded-full border-2 border-green-700 dark:border-green-400 hover:scale-110 transition-transform duration-200"
                />
              </div>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-52 bg-base-100 border-2 border-green-700 dark:border-green-400 rounded-lg shadow-xl z-50 overflow-hidden">
                  <li className="border-b border-base-300 px-4 py-3 bg-base-200">
                    <p className="font-bold text-sm truncate">{user.displayName || "User"}</p>
                    <p className="text-xs text-accent truncate">{user.email}</p>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="w-4 h-4 text-green-700" />
                      <span>My Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LayoutDashboard className="w-4 h-4 text-green-700" />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className="border-t border-base-300">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-100 dark:hover:bg-red-900 transition-colors w-full text-left text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl btn-primary">
              <Link to="/auth/login">Log In</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
