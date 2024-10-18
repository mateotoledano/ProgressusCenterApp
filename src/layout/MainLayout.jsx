import React from "react";
import { NavBar, TopMenu } from "../components";
import { useStoreAlert } from "../store";
export const MainLayout = ({ children }) => {
  const prueba = useStoreAlert((state) => state.alert);
  return (
    <div className="bg-customGray">
      <TopMenu></TopMenu>
      <NavBar></NavBar>

      {children}
    </div>
  );
};
