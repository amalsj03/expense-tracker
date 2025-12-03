import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {/* Trigger button */}
      <div
        className="flex items-center gap-2 cursor-pointer border rounded-lg px-3 py-2 bg-gray-50 hover:bg-gray-100 transition"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
          {icon ? (
            <span className="text-xl">{icon}</span>
          ) : (
            <LuImage className="w-5 h-5" />
          )}
        </div>
        <p className="text-sm font-medium text-gray-700">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="relative">
          {/* Close button */}
          <button
            className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600"
            onClick={() => setIsOpen(false)}
          >
            <LuX className="w-4 h-4" />
          </button>

          {/* Emoji Picker */}
          <div className="border rounded-xl shadow-lg bg-white p-2 z-50">
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                onSelect(emojiData.emoji);
                setIsOpen(false);
              }}
              autoFocusSearch={false}
              height={350}
              width={280}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
