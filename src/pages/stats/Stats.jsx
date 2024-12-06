import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { ChartBar, Location, Title } from "../../components";
import { useGetAsistForMonth } from "../../service/stats/useGetAsistForMonth";
import { BsCalendar2Month } from "react-icons/bs";
import { useGetAsistForDay } from "../../service/stats/useGetAsistForDay";
import { IoTodayOutline } from "react-icons/io5";
export const Stats = () => {
  const [selectNav, setSelectNav] = useState("Asistencia/Turnos");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  // ASISTENCIAS POR MES
  const [nroAsistenciaPorMes, setNroAsistenciaPorMes] = useState([]);
  // ASISTENCIAS POR DIA
  const [nroAsistForDay, setNroAsistForDay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // ASITENCIAS POR MES
      const traerAsistForMes = await useGetAsistForMonth();
      setNroAsistenciaPorMes(traerAsistForMes?.data || []);
      // ASISTENCIAS POR DIA
      const traerAsistForDay = await useGetAsistForDay();
      setNroAsistForDay(traerAsistForDay?.data || []);
    };
    fetchData();
  }, []);
  // ASISTENCIA POR MES
  // Filtrar por año
  const filteredData = nroAsistenciaPorMes.filter(
    (asistencia) => asistencia.anio === selectedYear
  );

  // Transformar los datos para el dataset
  const dataset = filteredData.map((asistencia) => ({
    mes: new Date(asistencia.anio, asistencia.mes - 1).toLocaleString("es-ES", {
      month: "long",
    }),
    numeroDeAsistencias: asistencia.numeroDeAsistencias,
  }));

  // Obtener lista de años únicos para el selector
  const availableYears = Array.from(
    new Set(nroAsistenciaPorMes.map((asistencia) => asistencia.anio))
  );
  ///////////////////////////////////////////////////////////////
  // ASISTENCIA POR DIA

  const diasDeLaSemana = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];

  // Mapa de días en inglés a español
  const diaMap = {
    Sunday: "domingo",
    Monday: "lunes",
    Tuesday: "martes",
    Wednesday: "miércoles",
    Thursday: "jueves",
    Friday: "viernes",
    Saturday: "sábado",
  };

  // Transformar los datos para el dataset y asegurarnos de que los días estén en español y en el orden correcto
  const dayOfWeekDataset = nroAsistForDay
    .map((asistencia) => ({
      dia: diaMap[asistencia.diaDeSemana] || asistencia.diaDeSemana.toLowerCase(), // Usamos el mapa para traducir al español
      numeroDeAsistencias: asistencia.numeroDeAsistencias,
    }))
    .sort(
      (a, b) => diasDeLaSemana.indexOf(a.dia) - diasDeLaSemana.indexOf(b.dia)
    );

  // Verifica si el orden de los días es el correcto
  console.log(dayOfWeekDataset, "DAY"); // Para depuración

  ///////////////////////////////////////////////////////////////
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location route={`Estadisticas`} subroute={"Reportes"} />
          <Title title={"Estadisticas"} />
        </div>
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="w-full justify-center p-3 mb-4">
          <div className="flex justify-center gap-4">
            <span
              onClick={() => setSelectNav("Asistencia/Turnos")}
              className={`transition-all font-bold cursor-pointer p-1 ${
                selectNav === "Asistencia/Turnos" &&
                "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
              }`}
            >
              Asistencias/Turnos
            </span>
            <span
              onClick={() => setSelectNav("Membresias")}
              className={`transition-all font-bold cursor-pointer p-1  ${
                selectNav === "Membresias" &&
                "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
              }`}
            >
              Membresias
            </span>
          </div>
          {/* ASISTENCIAS/TURNOS */}
          {/* ASISTENCIA POR CADA MES */}
          <div className="mt-12 mb-3 w-full   flex flex-col justify-center md:justify-between items-center gap-5 md:gap-12">
            <div className="flex items-center gap-3">
              <Title
                className={"text-customTextGreen "}
                title={"Asistencias por mes"}
              ></Title>
              <BsCalendar2Month className="text-3xl font-bold"></BsCalendar2Month>
            </div>

            <div className="flex justify-end w-full items-center">
              <label
                htmlFor="year-selector"
                className="font-semibold mr-2 hidden md:block md:text-xl"
              >
                Seleccionar Año:
              </label>
              <select
                id="year-selector"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border rounded px-1 md:px-3 font-semibold border-customTextGreen py-1 outline-none"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {/* ASISTENCIA POR CADA MES */}
            <div className="w-full flex items-center justify-center">
              <ChartBar
                dataset={dataset}
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey: "mes",
                    label: "Mes",
                  },
                ]}
                yAxis={[
                  {
                    label: "Número de asistencias",
                  },
                ]}
                series={[
                  {
                    dataKey: "numeroDeAsistencias",
                    label: "Asistencias",
                  },
                ]}
                barColor="#1890FF"
              />
            </div>
          </div>
          {/* /////////////////////////////////// */}
          <div className="w-full shadow-lg h-12"></div>
          {/* ASISTENCIAS POR DIA DE SEMANA */}
          <div className="mt-12 mb-3 w-full flex flex-col justify-center md:justify-between items-center gap-5 md:gap-12">
            <div className="flex items-center gap-3">
              <Title
                className={"text-customTextGreen"}
                title={"Asistencias por día de la semana"}
              ></Title>
              <IoTodayOutline className="text-3xl"></IoTodayOutline>
            </div>

            <div className="w-full flex items-center justify-center">
              <ChartBar
                dataset={dayOfWeekDataset} // Usamos el dataset de días de la semana
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey: "dia", // Clave para los días
                    label: "Día de la Semana",
                  },
                ]}
                yAxis={[
                  {
                    label: "Número de asistencias",
                  },
                ]}
                series={[
                  {
                    dataKey: "numeroDeAsistencias",
                    label: "Asistencias",
                  },
                ]}
                barColor="#FF5733" // Color personalizado para las barras
              />
            </div>
          </div>

          {/* ////////////////////////////////////////// */}
        </section>
      </section>
    </MainLayout>
  );
};
