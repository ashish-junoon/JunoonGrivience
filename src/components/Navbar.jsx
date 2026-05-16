import { useState } from "react";
import {
  RiSearchLine,
  RiMenuLine,
} from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ setIsMobileOpen }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const location = useLocation()
  const path = location?.pathname?.split("/").at(-1).replaceAll("-", " ")
  const navigate = useNavigate()
  
  return (
    <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 shadow-sm w-full">
      {openProfile && <div className="fixed w-[100vw] h-[100vh] left-0 top-0 bg-black/20 z-50 cursor-pointer" onClick={()=> setOpenProfile(false)}></div>}
      
      {/* LEFT */}
      <div className="flex items-center gap-3 w-full">
        
        {/* ✅ Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden cursor-pointer"
        >
          <RiMenuLine size={24} className="text-gray-700" />
        </button>

        {/* ✅ Search */}
        {/* <div className="hidden sm:flex items-center bg-gray-100 px-3 py-2 rounded-lg w-full max-w-md focus-within:ring-2 focus-within:ring-blue-400 transition">
          <RiSearchLine className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm w-full"
          />
        </div> */}

        <div>
          <h1 className="text-md md:text-lg font-semibold text-gray-700 capitalize">{path}</h1>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 mx-3">
        
        {/* ✅ Profile */}
        <div className="relative">
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              // src="https://i.pravatar.cc/40"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrjhwn-61c18KmFBnQxt85eAtjayJyUueDRA&s"
              alt="user"
              className="w-9 h-9 rounded-full border object-cover"
            />

            {/* Hide text on mobile */}
            <div className="hidden sm:flex flex-col -space-y-0.5">
              <span className="text-sm font-medium text-gray-700">
                Rohit
              </span>
              <span className="text-xs text-gray-500">
                rohitkoli@gmail.com
              </span>
            </div>
          </div>

          {/* Dropdown */}
          {openProfile && (
            <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-0 z-50 overflow-hidden">
              <Link to="/profile" className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 block">
                Profile
              </Link>
              {/* <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                Settings
              </button> */}
              <button onClick={()=> navigate("/login")} className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 cursor-pointer">
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;