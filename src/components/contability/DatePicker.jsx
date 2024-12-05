import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const currentYear = dayjs();

export const DatePickerr = ({
  selectedDate,      // Fecha seleccionada
  setSelectedDate,   // Función para actualizar la fecha
  minDate,           // Fecha mínima seleccionable
  maxDate,           // Fecha máxima seleccionable (opcional)
  openTo = "year",   // Vista inicial ("year" o "month")
  views = ["year", "month"],  // Las vistas disponibles para el selector
  label = "Seleccionar fecha", // Etiqueta del DatePicker
  sx = { minWidth: "100%"},  // Estilos del componente (opcional)
}) => {
  const defaultMinDate = minDate || dayjs("2000-01-01");  // Ajustar a tu preferencia
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      
        label={label}
        value={dayjs(selectedDate)} // Aseguramos que sea un objeto dayjs
        onChange={(date) => {
          if (date) {
            // Al seleccionar una fecha, guardamos solo el mes y año
            setSelectedDate(dayjs(date).format("YYYY-MM"));
          }
        }}  
        minDate={defaultMinDate}
        maxDate={maxDate}
        openTo={openTo}
        views={views}
        sx={sx}
      />
    </LocalizationProvider>
  );
};
