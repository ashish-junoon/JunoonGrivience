import React from "react";
import DashboardStats from "../utils/DashboardStats";
import DashboardChart from "../utils/DashboardChart";


const complaints = [
  { id: "#1234", subject: "Login Issue", status: "Pending", date: "16 Apr 2026" },
  { id: "#1235", subject: "Payment Failed", status: "Resolved", date: "15 Apr 2026" },
  { id: "#1236", subject: "Service Delay", status: "Rejected", date: "14 Apr 2026" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen p-0">
      <div className="mx-auto space-y-2">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Grievance overview & analytics</p>
          </div>
          {/* <button className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:opacity-90 transition">
            Export
          </button> */}
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Charts */}
        <DashboardChart />
      </div>
    </div>
  );
}
