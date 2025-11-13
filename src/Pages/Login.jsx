import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: `Welcome back, ${result.user.displayName || "User"}!`,
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => navigate(location.state?.from || "/"), 1700);
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid Credentials"
        });
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: `Logged in as ${result.user.displayName || "User"} via Google!`,
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => navigate(location.state?.from || "/"), 1700);
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message
        });
      });
  };

  return (
    <div>
      <div className="flex justify-center min-h-screen items-center">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body p-8">
            <h1 className="text-2xl font-bold mb-4 border-b-2 border-base-200 pb-6">
              Login Your Account
            </h1>

            <form onSubmit={handleLogin}>
              <fieldset className="fieldset overflow-visible">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  required
                />

                <label className="label">Password</label>
                <div className="relative overflow-visible">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pr-12"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none z-10"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>


                <button type="submit" className="btn btn-primary text-secondary mt-4 w-full">
                  Login
                </button>
              </fieldset>
            </form>

            <div className="divider">OR</div>

            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-primary w-full mt-2 flex justify-center items-center"
            >
              <FcGoogle size={20} /> Continue with Google
            </button>

            <p className="mt-4 text-center">
              Don't Have An Account?{" "}
              <Link className="text-primary" to="/auth/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
