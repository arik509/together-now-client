import React, { useState, useEffect, useRef, useContext } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  Plus,
  FileEdit,
  Users,
  Menu,
  X,
  User,
  LogOut,
  Home,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import logo from "../assets/Together Now.png";

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dropdownRef = useRef(null);

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
            navigate("/");
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

  // Sidebar menu items
  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Create Event",
      path: "/dashboard/create-event",
      icon: Plus,
    },
    {
      name: "Manage Events",
      path: "/dashboard/manage-events",
      icon: FileEdit,
    },
    {
      name: "Joined Events",
      path: "/dashboard/joined-events",
      icon: Users,
    },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Top Navbar */}
      <header className="bg-base-100 shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left Section - Logo & Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-base-200 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-green-700" />
              ) : (
                <Menu className="w-6 h-6 text-green-700" />
              )}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Together Now" className="w-10 h-10" />
              <span className="font-bold text-xl hidden sm:block">
                Together <span className="text-green-700">Now</span>
              </span>
            </Link>
          </div>

          {/* Center Section - Dashboard Title */}
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-green-700">Dashboard</h1>
          </div>

          {/* Right Section - Theme, Notifications, Profile */}
          <div className="flex items-center gap-3">
            {/* Home Button */}
            <Link
              to="/"
              className="btn btn-ghost btn-sm gap-2 hidden sm:flex"
              title="Back to Home"
            >
              <Home className="w-4 h-4" />
              <span className="hidden lg:inline">Home</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-green-700 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
              title="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-green-700" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>

            {/* Notifications */}
            <button
              className="p-2 rounded-full hover:bg-base-200 transition-colors relative hidden sm:block"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-green-700" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-base-200 transition-colors"
              >
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt={user?.displayName || "User"}
                  className="w-10 h-10 rounded-full border-2 border-green-700"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold line-clamp-1 max-w-[150px]">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-accent line-clamp-1 max-w-[150px]">
                    {user?.email}
                  </p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-base-100 border-2 border-green-700 rounded-lg shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-base-300 bg-base-200">
                    <p className="font-bold text-sm truncate">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-accent truncate">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="w-4 h-4 text-green-700" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4 text-green-700" />
                    <span>Dashboard Home</span>
                  </Link>

                  <div className="border-t border-base-300">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-red-100 dark:hover:bg-red-900 transition-colors w-full text-left text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 h-[calc(100vh-64px)] lg:h-[calc(100vh-72px)] bg-base-100 shadow-xl z-40 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 w-64 overflow-y-auto`}
        >
          <nav className="p-4">
            <ul className="menu flex flex-col gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        active
                          ? "bg-green-700 text-white font-semibold shadow-lg"
                          : "hover:bg-base-200"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info at Bottom */}
          <div className="absolute bottom-0 w-full p-4 border-t border-base-300">
            <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/40"}
                    alt="User"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-accent truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto min-h-[calc(100vh-64px)]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
