import React from "react";

import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


const AuthLayout = () => {
  return (
    <div className="bg-base-200 min-h-screen">
        <Navbar></Navbar>
      <main className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default AuthLayout;
