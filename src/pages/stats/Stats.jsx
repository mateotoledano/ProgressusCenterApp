import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import { ChartBar, Location, Title } from "../../components";
export const Stats = () => {
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location route={`Estadisticas`} subroute={"Reportes"}></Location>
          <Title title={"Estadisticas"}></Title>
        </div>
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="w-full justify-center p-3 mb-4">
          Este módulo se implementará proximamente en la siguiente release!
          <div className="w-full flex items-center justify-center ">
            <ChartBar></ChartBar>
          </div>
        </section>
      </section>
    </MainLayout>
  );
};
