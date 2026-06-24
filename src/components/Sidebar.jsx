import { useState } from "react";
import { RiArrowDownSLine, RiCloseLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { RiDashboardLine, RiUser3Line, RiSettings3Line } from "react-icons/ri";
import { IoBookmarksOutline, IoTicketOutline, IoMailOpenOutline } from "react-icons/io5";


import { MdHistory } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();

  const { isAdmin } = useAuth();

  const sidebarData = !isAdmin
    ? [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: RiDashboardLine,
        },
        {
          title: "Tickets",
          icon: RiUser3Line,
          children: [
            { title: "Manage Ticket", path: "/tickets/manage-tickets" },
            { title: "InProcess Ticket", path: "/tickets/inprocess-tickets" },
            { title: "History", path: "/tickets/tickets-history" },
          ],
        },
      ]
    : [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: RiDashboardLine,
        },
        {
          title: "Tickets",
          icon: RiUser3Line,
          children: [
            { title: "Manage Ticket", path: "/tickets/manage-tickets" },
            { title: "InProcess Ticket", path: "/tickets/inprocess-tickets" },
            { title: "History", path: "/tickets/tickets-history" },
          ],
        },
        {
          title: "User Master",
          icon: RiUser3Line,
          children: [{ title: "Manage User", path: "/User/manage-user" }],
        },
        {
          title: "Query Master",
          icon: IoBookmarksOutline,
          children: [{ title: "Manage Query", path: "/query/manage-query" }],
        },
        {
          title: "Mail Management",
          path: "/mail-management",
          icon: IoMailOpenOutline,
        },
      ];

  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-50 h-screen min-w-70
        bg-[#0f172a] text-gray-300 flex flex-col
        transform transition-transform duration-300
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-800">
          <h1 className="text-md font-semibold text-white tracking-wide">
            {/* Admin Panel */}
            {/* <span className="text-primary">Grievance</span> Portal */}
            <span className="text-primary">Grievance Redressal</span> Portal
          </h1>

          <button
            className="md:hidden text-gray-400 cursor-pointer"
            onClick={() => setIsMobileOpen(false)}
          >
            <RiCloseLine size={22} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto py-0 space-y-1">
          {sidebarData.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={index}>
                {item.children ? (
                  <>
                    {/* Parent */}
                    <div
                      onClick={() => toggleMenu(index)}
                      className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-800 transition"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="text-sm">{item.title}</span>
                      </div>

                      <RiArrowDownSLine
                        className={`transition ${
                          openMenus[index] ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {/* Submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openMenus[index] ? "max-h-40" : "max-h-0"
                      }`}
                    >
                      <div className="ml-10 mt-1 space-y-1">
                        {item.children.map((sub, i) => (
                          <NavLink
                            key={i}
                            to={sub.path}
                            onClick={() => setIsMobileOpen(false)}
                            className={`block px-3 py-3 rounded-sm text-sm transition ${
                              isActive(sub.path)
                                ? "bg-primary text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            }`}
                          >
                            {sub.title}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-5 py-4 text-sm transition relative ${
                        isActive
                          ? "bg-gray-800 text-white border-l-4 border-primary"
                          : "hover:bg-gray-800 hover:text-white"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {item.title}
                  </NavLink>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 text-xs text-gray-400 text-center font-semibold">
          © 2026 Powered by LogicAI Tech.
        </div>
      </div>
    </>
  );
};

export default Sidebar;
