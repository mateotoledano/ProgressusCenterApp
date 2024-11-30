import React from "react";
import { Autocomplete, TextField, useMediaQuery } from "@mui/material";

export const SelectNavegable = ({ options, label, onSelect , wd}) => {
  // Detectar si la pantalla es chica (ancho menor a 600px)
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <Autocomplete
      size={isSmallScreen ? "small" : "medium"} // Cambiar tamaño según pantalla
      disablePortal
      options={options}
      getOptionLabel={(option) => {
        const nombre = option.nombre || "";
        const apellido = option.apellido || "";
        return `${nombre} ${apellido}`.trim();
      }}
      isOptionEqualToValue={(option, value) =>
        option.nombre === value.nombre && option.apellido === value.apellido
      }

      sx={{ width: isSmallScreen ? "100%" : wd ? wd : 340 }} // Ancho según pantalla
      renderInput={(params) => (
        <TextField {...params} label={label || "Seleccione un usuario"} />
      )}
      onChange={(event, value) => onSelect(value)}
      noOptionsText="No hay opciones disponibles"
      componentsProps={{
        popper: {
          sx: {
            "& .MuiAutocomplete-listbox": {
              fontSize: isSmallScreen ? "0.8rem" : "1rem",
              padding: isSmallScreen ? "2px" : "8px",
            },
          },
        },
      }}
    />
  );
};
