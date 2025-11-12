import React from "react";
import image from "../assets/banner.png"
import { Link } from "react-router";

const Banner = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center text-center bg-cover bg-center h-[70vh] rounded-lg shadow-md"
      style={{
        backgroundImage:
          `url(${image})`,
      }}
    >

      {/* <div className="absolute inset-0 bg-[#d9f7be]/30 rounded-lg"></div> */}

      
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-3">
          Together, We Build Better Communities
        </h1>
        <p className="text-lg md:text-xl text-green-800 mb-6">
          Discover local initiatives, take part in events, and make a real difference.
        </p>
        <button className="button bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-2 rounded-full transition">
          <Link to="/upcoming-events" className="button-content">Explore Events</Link>
        </button>
      </div>
    </div>
  );
};

export default Banner;
