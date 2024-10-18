import React from "react";
import { MdErrorOutline } from "react-icons/md";

export const ErrorAuth = ({ messageError, className = "" }) => {
  // ERROR ABAJO DEL INPUT
  return (
    <span
      className={`text-red-500 w-full text-start font-medium flex justify-start items-center text-sm ${className}`}
    >
      {messageError}
      <MdErrorOutline width={15} />
    </span>
  );
};
