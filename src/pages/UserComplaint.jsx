import React from "react";
import ComplaintForm from "../components/forms/ComplaintForm";

const UserComplaint = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-500/10 to-theme/40 py-6">
      <div className="bg-white py-2 px-1 rounded-lg w-fit max-lg:hidden fixed left-2 top-2 shadow-xl border border-gray-300/50">
        <img src="/junoon.webp" alt="" className="w-18 rounded-lg" />
      </div>

      <div className="max-w-[1600px] w-[95%] mx-auto md:px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <div className="hidden lg:flex flex-col sticky top-20 self-start h-fit">
            <div className="my-8">
              <span className="inline-flex items-center rounded-full bg-theme/10 px-4 py-1 text-theme text-sm font-medium">
                Customer Support
              </span>

              <div className="flex items-center gap-4 mt-5">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800">
                    Register Your
                    <span className="text-theme"> Grievance</span>
                  </h1>
                  <p className="text-xs text-gray-600 font-semibold mt-1">
                    Junoon Capital Services Pvt. Ltd.
                  </p>
                </div>
              </div>

              <p className="mt-2 text-md text-gray-600 leading-6">
                We are committed to resolving your concerns quickly and
                transparently. Submit your complaint with the required details,
                and our support team will review and respond within the
                prescribed timeline.
              </p>
            </div>

            {/* Features */}

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  ✅
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Secure Submission
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Your complaint details are securely stored and handled.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  📄
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Track Complaint
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Receive a unique reference number for future tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  ⏱️
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Timely Resolution
                  </h3>
                  <p className="text-gray-500 text-sm">
                    We strive to resolve every grievance within the defined SLA.
                  </p>
                </div>
              </div>
            </div>

            {/* Illustration */}

            {/* <img
              src="/images/grievance-illustration.svg"
              alt="Grievance"
              className="mt-10 w-[85%] mx-auto"
            /> */}
          </div>

          {/* Right Section */}

          <div>
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-theme text-white px-6 py-4 flex justify-between">
                <div>
                  <h2 className="text-xl font-bold">Register your Grievance</h2>

                  <p className="text-white/80 mt-0 text-xs">
                    Fill in the form below to register your complaint.
                  </p>
                </div>

                <div className="bg-white py-2 px-1 rounded-lg w-fit lg:hidden">
                  <img src="/junoon.webp" alt="" className="w-13 rounded-lg" />
                </div>
              </div>

              <div className="p-2 lg:p-4">
                <ComplaintForm user={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserComplaint;
