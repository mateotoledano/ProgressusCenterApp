import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const currentYear = dayjs();

export const DatePickerr = ({
  selectedDate,     
  setSelectedDate,   
  minDate,          
  maxDate,           
  openTo = "year",   
  views = ["year", "month"],  
  label = "Seleccionar fecha", 
  sx = { minWidth: "100%"},  
}) => {
  const defaultMinDate = minDate || dayjs("2000-01-01");  
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      
        label={label}
        value={dayjs(selectedDate)} 
        onChange={(date) => {
          if (date) {
           
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
