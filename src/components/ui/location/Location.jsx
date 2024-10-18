import React from "react";

export const Location = ({ route, subroute }) => {
  return (
    <div className="flex justify-start gap-1 text-sm font-light text-gray-400 items-center">
      <span>{route}</span>
      <span>/</span>
      <span>{subroute && subroute}</span>
    </div>
  );
};
