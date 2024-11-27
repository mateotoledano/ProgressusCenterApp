import React, { useEffect, useState } from "react";
import { LoadingSkeleton, Location, Title } from "../../../../components";
import { MainLayout } from "../../../../layout/MainLayout";
import usePlanParaVer from "../../../../store/planParaVer";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useSpinnerStore } from "../../../../store";
import { useGetPlanById } from "../../../../service/plans/useGetPlanById";
import { TableDay } from "../../../../components";
import { LuCalendarDays } from "react-icons/lu";
export const ViewPlan = () => {
  const columnsDayEdit = [
    "Ord.",
    "Ejercicio",
    "Series",
    "Repeticiones",
    "Acciones",
  ];

  const columnsDay = ["Ord.", "Ejercicio", "Series", "Repeticiones", "Ver"];
  const planParaVer = usePlanParaVer((state) => state.planParaVer);
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  const [diasDelPlan, setDiasDelPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDataPlan = async () => {
      try {
        const responseDataPlan = await useGetPlanById(planParaVer.id);
        setDiasDelPlan(responseDataPlan.data.value.value.diasDelPlan);
      } catch (e) {
        console.log(e, "errores al traer el plan");
      } finally {
        setLoading(false);
      }
    };
    fetchDataPlan();
  }, []);
  console.log(planParaVer, "plan para ver");

  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12  overflow-hidden mb-20 flex flex-col ">
        <div className="b p-3 ">
          <Location route={"Planes"} subroute={"Ver plan"}></Location>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Title title={"Ver plan de entrenamiento"}></Title>
          </div>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="b p-3  flex flex-col justify-center gap-1 items-center w-full md:flex-row md:justify-between md:text-xl">
          <span className="font-semibold">
            Nombre :{" "}
            <span className="text-customTextGreen">{planParaVer?.nombre}</span>
          </span>
          <span className="font-semibold">
            Objetivo :{" "}
            <span className="text-customTextGreen">
              {planParaVer?.objetivoDelPlan.nombre}
            </span>
          </span>
          <span className="font-semibold">
            Cantidad de dias :{" "}
            <span className="text-customTextGreen">
              {planParaVer?.diasPorSemana}
            </span>
          </span>
        </section>
        <div className="mt-3">
          {loading ? (
            <div>
              <LoadingSkeleton
                count={4}
                width={"100%"}
                className={"p-3"}
                height={200}
              ></LoadingSkeleton>
            </div>
          ) : (
            diasDelPlan &&
            diasDelPlan.map((dia) => {
              console.log(dia, "dia");

              return (
                <div className="p-3">
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <Title
                      title={`Dia ${dia.numeroDeDia}`}
                      className={""}
                    ></Title>
                    <LuCalendarDays className="text-customTextBlue text-lg md:text-3xl"></LuCalendarDays>
                  </div>
                  <TableDay
                    textSinEjercicios={"No hay ejercicios en este dia..."}
                    arregloColumns={columnsDay}
                    arreglo={dia.ejerciciosDelDia}
                  ></TableDay>
                </div>
              );
            })
          )}
        </div>
      </section>
    </MainLayout>
  );
};
