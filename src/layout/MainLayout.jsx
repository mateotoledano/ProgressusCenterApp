import React from "react";
import { NavBar, TopMenu } from "../components";
import useStoreAlert from "../store/useStoreAlert";
export const MainLayout = ({ children }) => {
  const prueba = useStoreAlert((state) => state.alert);
  console.log(prueba, "estado de la alerta");
  return (
    <div className="">
      <TopMenu></TopMenu>
      <NavBar></NavBar>

      {children}
    </div>
  );
};
