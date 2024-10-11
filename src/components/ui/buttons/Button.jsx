import React from "react";

export const Button = ({
  onClick,
  label,
  disabled = false,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`py-[7px] my-2 px-5 bg-customButtonGreen text-white rounded-sm hover:bg-customTextGreen ${className}`}
    >
      {label}
    </button>
  );
};
