import React from "react";
import ComplaintForm from "../components/forms/ComplaintForm";

const UserComplaint = () => {
  return (
    <div className="bg-gray-100 py-5">
      <div className="w-[95%] md:w-[60%] mx-auto">
        {/* HEADER */}
        <div className="bg-white shadow rounded-lg mb-2 p-6 text-center">
          <h1 className="text-2xl font-semibold text-primary italic">
            Describe your grievance
          </h1>
        </div>

        <ComplaintForm user={true} />
      </div>
    </div>
  );
};

export default UserComplaint;
