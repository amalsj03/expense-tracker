import React from "react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="p-4">
      {/* Content */}
      <p className="text-sm text-gray-700">{content}</p>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          className="px-4 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-100 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow transition"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
