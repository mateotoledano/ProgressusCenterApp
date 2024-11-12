import React from "react";

export const Button = ({
  onClick,
  label,
  disabled = false,
  className = "",
  type = "button",
  Icon,
  classNameIcon
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-[7px] my-2 px-5 bg-customButtonGreen text-white rounded-sm  font-medium ${className}`}
    >
      {label}
      {Icon && <Icon className={`text-base md:text-lg ${classNameIcon}`}></Icon>}
    </button>
  );
};
