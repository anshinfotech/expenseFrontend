import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ label, type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="space-y-2 w-full">
      <label className="block text-sm font-medium text-black">
        {label}
      </label>

      <div
        className={`relative flex items-center rounded-lg border transition-all duration-200 
                    focus-within:border-black hover:border-gray-400 shadow-sm`}
      >
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-black 
                     placeholder-gray-500 px-4 py-3"
        />

        {type === 'password' && (
          <div className="p-3 pr-4 cursor-pointer">
            {showPassword ? (
              <FaRegEye
                onClick={togglePasswordVisibility}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              />
            ) : (
              <FaRegEyeSlash
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
