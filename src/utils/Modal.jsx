import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-100 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-xs"
          onClick={onClose}
        />

        {/* Modal Box */}
        <div
          className={`relative bg-white max-w-[95%] min-w-[50%] rounded-lg shadow-xl transform transition-all duration-300 ${
            isOpen
              ? "scale-100 translate-y-0 opacity-100"
              : "scale-95 translate-y-4 opacity-0"
          }`}
        >
          {/* Header (FIXED) */}
          <div className="flex justify-between items-center border-b border-gray-200 px-4 py-3">
            <h2 className="text-md font-semibold text-gray-700">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Body (SCROLLABLE) */}
          <div className="max-h-[75vh] overflow-y-auto px-4 py-3 text-gray-600">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
