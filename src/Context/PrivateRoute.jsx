import React, { use, useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";


const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext)
//   console.log(user);

  const location = useLocation()
//   console.log(location);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (user && user?.email) {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
  }
};

export default PrivateRoute;
