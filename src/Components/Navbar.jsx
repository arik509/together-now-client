import React from "react";
import logo from "../assets/Together Now.png";
import { NavLink } from "react-router";

const Navbar = () => {
  const activeClass = "font-bold text-green-800";

  return (
    <div className="bg-[#d9f7be]">
      <div className="navbar w-11/12 mx-auto p-2 md:p-3 lg:p-6">
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/upcoming-events">UpComing Events</NavLink>
              </li>
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
          <ul className=" menu-horizontal px-1 flex gap-6">
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
          </ul>
        </div>

        <div className="navbar-end">
          <button class="button">
            <span class="button-content">Log in </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
