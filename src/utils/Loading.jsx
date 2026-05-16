import React from "react";

const Loading = ({ text = "" }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      
      {/* 🔥 Soft Blur Background */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* 🔥 Loader Box */}
      <div className="relative flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary border-r-primary rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-sm text-gray-600 font-medium tracking-wide">
          {text}
        </p>

      </div>
    </div>
  );
};

export default Loading;