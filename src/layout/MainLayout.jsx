import React from "react";
import { Footer, NavBar, TopMenu } from "../components";
import { useStoreAlert } from "../store";

export const MainLayout = ({ children }) => {
  const prueba = useStoreAlert((state) => state.alert);

  return (
    <body className="bg-customGray ">
      <TopMenu />
      <NavBar />

      {/* Contenedor del contenido principal con flex-grow para ocupar el espacio restante */}
      <main className="flex-1 ">{children}</main>

      {/* Footer siempre al fondo, sin margen adicional */}
      <Footer />
    </body>
  );
};
