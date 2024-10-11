import React from "react";
import { NavBar, TopMenu } from "../components";
export const MainLayout = ({ children }) => {
  return (
    <div className="animate-fade-in-down ">
      <TopMenu></TopMenu>
      <NavBar></NavBar>

      {children}
    </div>
  );
};
