import React from "react";
import { Alert } from "../../ui/alert/Alert"; // Asegúrate de que este import esté correcto
import { SnackbarDefault } from "../../ui/snackbar/Snackbar";
export const GridAlertsTurns = ({ alertDelete, openAlert, openAlertError,setAlertDelete }) => {
  return (
    <>
      {openAlert && (
        <Alert
          type="success"
          theme="dark"
          position="bottom-center"
          message="Turno reservado  con éxito"
          autoclose={5000}
        />
      )}
      {openAlertError && (
        <Alert
          theme="dark"
          type="error"
          position="bottom-center"
          message="Ocurrió un error al realizar la operación"
          autoclose={5000}
        />
      )}
      {alertDelete && (
        <SnackbarDefault setAlertDelete={setAlertDelete} alertDelete={alertDelete}></SnackbarDefault>
      )}
    </>
  );
};
