import React from "react";
import { Alert } from "../components";
import useStoreAlert from "../store/useStoreAlert";
export const LayoutLoginRegister = ({ children }) => {
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
