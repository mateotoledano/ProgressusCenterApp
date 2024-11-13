import React from "react";
import { Alert, Spinner } from "../components";
import { useStoreAlert, useSpinnerStore } from "../store";

export const LayoutLoginRegister = ({ children }) => {
  // LAYOUT PARA PODER MOSTRAR ALERT AL REGISTRARSE(MANEJO DE STORE DEL ALERT)
  const alertValue = useStoreAlert((state) => state.alert);
  // SPINNER DEL LOGIN Y REGISTER
  const isLoading = useSpinnerStore((state) => state.isLoading);
  return (
    <div className="">
      <Spinner open={isLoading} />
      {alertValue && (
        <Alert
          position="top-right"
          type="success"
          theme="dark"
          autoclose={7000}
          message="Se ha registrado exitosamente"
        ></Alert>
      )}
      {children}
    </div>
  );
};
