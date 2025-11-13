import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const { signInWithGoogle, createUser, setUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password validation
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least 1 uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least 1 lowercase letter");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Sign Up Successful!");
            setTimeout(() => navigate("/"), 1500);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success(
          `Welcome ${result.user.displayName || "User"}! Logged in with Google.`
        );
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl mx-auto">
        <h1 className="text-5xl font-bold text-center my-4">Register Now</h1>
        <div className="card-body">
          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input name="name" type="text" className="input" placeholder="Your Name" required />

              <label className="label">Photo URL</label>
              <input name="photo" type="text" className="input" placeholder="Your Photo URL" required />

              <label className="label">Email</label>
              <input name="email" type="email" className="input" placeholder="Email" required />

              <label className="label">Password</label>
              <input name="password" type="password" className="input" placeholder="Password" required />

              <button type="submit" className="btn btn-neutral mt-4">Register</button>

              <div className="text-blue-600 my-2 font-bold text-center text-[20px]">Or,</div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="btn bg-white text-black border-[#e5e5e5]"
              >
                Sign up with Google
              </button>

              <p className="mt-2 text-sm text-center">
                Already Have An Account?{" "}
                <Link className="text-primary font-semibold" to="/auth/login">
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
