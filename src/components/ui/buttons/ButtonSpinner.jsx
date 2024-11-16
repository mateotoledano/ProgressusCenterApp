import * as React from "react";

import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";

export const ButtonSpinner = ({
  loading,
  onClick,
  label,
  disabled = false,
  className = "",
  type = "button",
  Icon,
  classNameIcon,
}) => (
  <button
    type={type}
    onClick={!loading ? onClick : null} // Evitar múltiples clics mientras carga
    disabled={loading}
    className={`py-[7px] my-2 px-5 bg-customButtonGreen text-white rounded-sm  font-medium ${className} button ${
      loading ? "flex justify-center items-center md:px-12  " : ""
    }`} // Cambia el estilo si está cargando
  >
    {loading ? (
      <CircularProgress color="inherit" size={20} disableShrink />
    ) : (
      label
    )}
  </button>
);

ButtonSpinner.propTypes = {
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
