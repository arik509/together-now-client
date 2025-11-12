import React from "react";

import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";


const AuthLayout = () => {
  return (
    <div className="bg-base-200 min-h-screen">
        <Navbar></Navbar>
      <main className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default AuthLayout;
