import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const resolvedType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="relative">
        <input
          type={resolvedType}
          placeholder={placeholder}
          className="w-full px-3 py-2 border rounded"
          value={value}
          onChange={e => onChange(e)}
        />
        {type === 'password' && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer">
            {showPassword ? (
              <FaRegEye size={20} onClick={toggleShowPassword} />
            ) : (
              <FaRegEyeSlash size={20} onClick={toggleShowPassword} />
            )}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Input;
