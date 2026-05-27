import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { adminUser } = useAuth();

  return (
    <div className="p-6 bg-gray-50 rounded-md">

      {/* 🔷 Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          My Profile
        </h2>
        <p className="text-sm text-gray-400">
          View your account details
        </p>
      </div>

      {/* 📦 Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 👤 Left - Avatar */}
        <div className="flex flex-col items-center border-r pr-6">
          <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
            {adminUser?.name?.charAt(0) || "A"}
          </div>

          <p className="mt-3 font-medium text-gray-800">
            {adminUser?.name || "N/A"}
          </p>

          <p className="text-sm text-gray-400 capitalize">
            {adminUser?.role || "N/A"}
          </p>
        </div>

        {/* 📋 Right - Info */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
          
          <div>
            <p className="text-gray-400 text-xs">Full Name</p>
            <p className="font-medium text-gray-800">
              {adminUser?.name || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-xs">Email</p>
            <p className="font-medium text-gray-800">
              {adminUser?.email || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-xs">Mobile</p>
            <p className="font-medium text-gray-800">
              {adminUser?.mobile || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-xs">Role</p>
            <p className="font-medium text-gray-800 capitalize">
              {adminUser?.role || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-xs">Employee ID</p>
            <p className="font-medium text-gray-800">
              {adminUser?.empId || "N/A"}
            </p>
          </div>

          {/* <div>
            <p className="text-gray-400 text-xs">Status</p>
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 mt-1">
              Active
            </span>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Profile;