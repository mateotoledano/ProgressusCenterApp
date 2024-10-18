import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import { router } from "./router";
import "./index.css";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
