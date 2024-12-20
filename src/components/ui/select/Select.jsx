import React, { useState } from "react";

export const Select = ({ selectedDay, setSelectedDay }) => {
  // Estado para almacenar el valor seleccionado

  // Función que actualiza el valor seleccionado
  const handleChange = (event) => {
    setSelectedDay(event.target.value);
  };

  return (
    <form className="w-full md:w-1/2 flex justify-end">
      <select
        id="countries"
        value={selectedDay}
        onChange={handleChange}
        className="w-full md:w-2/3  border border-gray-200 outline-none text-gray-900 text-sm rounded-sm focus:ring-customButtonGreen focus:border-customButtonGreen block p-2.5 md:p-2  "
      >
        <option value="Lunes">Lunes</option>
        <option value="Martes">Martes</option>
        <option value="Miércoles">Miercoles</option>
        <option value="Jueves">Jueves</option>
        <option value="Viernes">Viernes</option>
        <option value="Sabado">Sabado</option>
      </select>
    </form>
  );
};
