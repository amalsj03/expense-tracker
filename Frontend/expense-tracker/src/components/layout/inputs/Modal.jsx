import React from "react";

const Modal = ({ children, isOpen, title, onClose }) => {
  if (!isOpen) return null;

  return (
    // Backdrop with frosted glass effect
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
      {/* Modal box */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
