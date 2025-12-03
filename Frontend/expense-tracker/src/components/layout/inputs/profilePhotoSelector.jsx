import React, { useState, useRef } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChanger = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChanger}
                className="hidden"
            />
            {!image ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                    <LuUser className="w-20 h-20 text-gray-400" />
                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={onChooseFile}
                    >
                        <LuUpload className="w-5 h-5" />
                        Upload Photo
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                    <img
                        src={previewUrl}
                        alt="profile photo"
                        className="w-24 h-24 object-cover rounded-full shadow-md border border-gray-300"
                    />
                    <button
                        type="button"
                        className="flex items-center gap-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={handleRemoveImage}
                    >
                        <LuTrash className="w-4 h-4" />
                        Remove
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
