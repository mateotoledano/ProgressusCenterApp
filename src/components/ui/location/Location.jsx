import React from "react";

export const Location = ({ route, subroute, barra = true }) => {
  return (
    <div className="flex justify-start gap-1 text-sm font-light text-gray-400 items-center">
      <span>{route}</span>
      {barra && <span>/</span>}
      <span>{subroute && subroute}</span>
    </div>
  );
};
