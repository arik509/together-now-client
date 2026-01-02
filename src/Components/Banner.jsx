import React, { useEffect, useState } from "react";
import lightBanner from "../assets/banner.png";
import darkBanner from "../assets/banner-dark.png";
import { Link } from "react-router";

const Banner = () => {
  const getTheme = () => document.documentElement.getAttribute("data-theme") || "light";
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "data-theme") {
          setTheme(getTheme());
        }
      }
    });
    observer.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const bannerImage = theme === "dark" ? darkBanner : lightBanner;

  return (
    <div
      className="relative flex flex-col items-center justify-center text-center bg-cover bg-center h-[70vh] rounded-lg shadow-md transition-colors duration-500 w-11/12 mx-auto"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="absolute inset-0 bg-[#d9f7be] dark:bg-black/60 rounded-lg transition-colors duration-500"></div>
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 dark:text-green-200 mb-3 transition-colors duration-500">
          Together, We Build Better Communities
        </h1>
        <p className="text-lg md:text-xl text-green-800 dark:text-green-300 mb-6 transition-colors duration-500">
          Discover local initiatives, take part in events, and make a real difference.
        </p>
        <button className="button bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2 rounded-full transition">
          <Link to="/upcoming-events" className="button-content">
            Explore Events
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Banner;
