import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Title , Location} from "../../components";
export const Users = () => {
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">

          <Location
            route={`Usuarios`}
            subroute={"Gestionar usuarios"}
          ></Location>

          <Title title={"Usuarios"}></Title>

        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        {/* ////////////////////////////////////////////// */}
      </section>
    </MainLayout>
  );
};
