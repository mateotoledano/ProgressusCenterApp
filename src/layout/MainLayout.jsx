import React from "react";
import { NavBar, TopMenu } from "../components";
export const MainLayout = ({ children }) => {
  return (
    <div className="">
      <TopMenu></TopMenu>
      <NavBar></NavBar>

      {children}
    </div>
  );
};
