import React from "react";
import { Alert } from "../components";
import { useStoreAlert } from "../store";
export const LayoutLoginRegister = ({ children }) => {
  // LAYOUT PARA PODER MOSTRAR ALERT AL REGISTRARSE(MANEJO DE STORE DEL ALERT)
  const alertValue = useStoreAlert((state) => state.alert);

  return (
    <div className="">
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
