import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import userIcon from "../assets/download.png";
import { Mail, Calendar } from "lucide-react";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4 text-center text-red-600 font-semibold">
        You must be logged in to view your profile.
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
          My Profile
        </h1>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="avatar mb-4">
              <div className="w-32 rounded-full ring ring-green-700 ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL || userIcon} alt={user.displayName} />
              </div>
            </div>

            <h2 className="card-title text-2xl mb-2">
              {user.displayName || "User"}
            </h2>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
              <Mail className="w-5 h-5 text-green-700" />
              <span>{user.email}</span>
            </div>

            <div className="divider"></div>

            <div className="w-full text-left space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-700" />
                <span className="font-semibold">Member Since:</span>
                <span>{formatDate(user.metadata?.creationTime)}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-700" />
                <span className="font-semibold">Last Sign In:</span>
                <span>{formatDate(user.metadata?.lastSignInTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
