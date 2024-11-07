import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const SnackbarDefault = ({ alertDelete, setAlertDelete }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertDelete(false);
  };

  return (
    <div>
      <Snackbar
        open={alertDelete}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Turno eliminado con exito !
        </Alert>
      </Snackbar>
    </div>
  );
};
