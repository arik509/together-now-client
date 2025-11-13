import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Register = () => {
  const { signInWithGoogle, createUser, setUser, updateUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    
    if (!password || password.trim().length < 6) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters long"
      });
      setLoading(false);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain at least 1 uppercase letter"
      });
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain at least 1 lowercase letter"
      });
      setLoading(false);
      return;
    }
    if (!/[0-9]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must contain at least 1 digit"
      });
      setLoading(false);
      return;
    }
    if (/[^a-zA-Z0-9!@#$%^&*]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password contains invalid special characters"
      });
      setLoading(false);
      return;
    }

    try {
      const res = await createUser(email, password);
      const user = res.user;
      await updateUser({ displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });
      Swal.fire({
        icon: "success",
        title: "Sign Up Successful!",
        showConfirmButton: false,
        timer: 1500
      });
      setLoading(false);
      setTimeout(() => navigate("/"), 1700);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message
      });
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: `Welcome ${result.user.displayName || "User"}! Logged in with Google.`,
          showConfirmButton: false,
          timer: 1500
        });
        setLoading(false);
        setTimeout(() => navigate("/"), 1700);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign In Failed",
          text: error.message
        });
        setLoading(false);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center my-4">Register Now</h1>
        <div className="card-body">
          <form onSubmit={handleRegister}>
            <label className="label mb-2">Name</label>
            <input
              name="name"
              type="text"
              className="input mb-4"
              placeholder="Your Name"
              required
            />

            <label className="label mb-2">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input mb-4"
              placeholder="Your Photo URL"
              required
            />

            <label className="label mb-2">Email</label>
            <input
              name="email"
              type="email"
              className="input mb-4"
              placeholder="Email"
              required
            />

            <label className="label mb-2">Password</label>
            <input
              name="password"
              type="password"
              className="input mb-4"
              placeholder="Password"
              required
            />

            <button
              type="submit"
              className="btn btn-primary mt-4 w-full"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="text-accent my-2 font-bold text-center text-[20px]">
            Or,
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-primary"
            disabled={loading}
          >
            <FcGoogle className="mr-2" /> Sign up with Google
          </button>

          <p className="mt-2 text-sm text-center">
            Already Have An Account?{" "}
            <Link className="text-primary font-semibold" to="/auth/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
