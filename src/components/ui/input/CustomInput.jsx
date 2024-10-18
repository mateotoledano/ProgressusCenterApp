import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const CustomInput = ({
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  disabled = false,
  className = "",
  Icon,
  iconColor,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const inputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }
    return type;
  };

  return (
    <div
      className={`flex my-2 bg-white items-center border border-gray-400 rounded-sm w-full ${className}`}
    >
      {Icon && <span className="p-1">{<Icon className={iconColor} />}</span>}

      <input
        name={name}
        type={inputType()}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 p-1 md:p-2 focus:outline-none font-medium"
        aria-label={placeholder}
      />
      {type === "password" && (
        <span className="p-2 cursor-pointer" onClick={toggleShowPassword}>
          {showPassword ? (
            <AiFillEyeInvisible className="text-gray-500" />
          ) : (
            <AiFillEye className="text-gray-500" />
          )}
        </span>
      )}
    </div>
  );
};
