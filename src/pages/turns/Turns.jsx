import React, { useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Acordion, Stack } from "../../components";
import dayjs from "dayjs";
import "dayjs/locale/es";

import { FaRegCalendarCheck } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";

dayjs.locale("es");

export const Turns = () => {
  const turnos = [
    {
      title: "Turno Mañana",
      horarios: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"],
    },
    {
      title: "Turno Tarde",
      horarios: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    },
    {
      title: "Turno Noche",
      horarios: ["19:00", "20:00", "21:00", "22:00"],
    },
  ];

  const today = dayjs().format("dddd, D [de] MMMM [de] YYYY");

  return (
    <MainLayout>
      <section className="bg-white md:mx-auto   rounded shadow-xl w-full md:w-11/12 p-4 overflow-hidden mb-4">
        <section className="w-full md:flex items-start mt-5 gap-12">
          <div className="flex flex-col  items-center justify-center gap-4 w-full mt-0 md:w-1/4 ">
            <div className="flex flex-col justify-center items-center gap-3">
              <h1 className="text-lg md:text-2xl font-semibold">
                Reserva tu turno
              </h1>
              <span className="text-customTextBlue text-base md:text-xl font-medium">
                {today}
              </span>
            </div>
            {turnos.map((turno, index) => (
              <Acordion
                key={index}
                title={turno.title}
                content={turno.horarios}
              />
            ))}
          </div>
          <section className="md:w-3/4 md:border-l  md:pl-12">
            <div className="md:mt-0 mt-3 flex w-full gap-5 flex-col justify-center items-center">
              <h1 className="text-lg md:text-2xl font-semibold flex items-center gap-1">
                Mis turnos
                <IoIosTimer></IoIosTimer>
              </h1>
              <Stack
                titulo="Turno mañana"
                duracion="10:30"
                fechaFinalizacion={today}
              ></Stack>
              <Stack
                titulo="Turno mañana"
                duracion="10:30"
                fechaFinalizacion={today}
              ></Stack>
              <Stack
                titulo="Turno mañana"
                duracion="10:30"
                fechaFinalizacion={today}
              ></Stack>
              <Stack
                titulo="Turno mañana"
                duracion="10:30"
                fechaFinalizacion={today}
              ></Stack>
            </div>
            <div className="mt-3 flex w-full gap-5 flex-col justify-center items-center">
              <h1 className="text-lg md:text-2xl font-semibold flex items-center gap-1">
                Turnos a los que asisti
                <FaRegCalendarCheck></FaRegCalendarCheck>
              </h1>
              <Stack
                titulo="Turno mañana"
                duracion="10:30"
                fechaFinalizacion={today}
                className="bg-red-200"
              ></Stack>
              <Stack
                titulo="Turno mañana"
                duracion="10:30"
                fechaFinalizacion={today}
                className="bg-red-200"
              ></Stack>
              <Stack
                titulo="Turno mañana"
                duracion="10:30"
                fechaFinalizacion={today}
                className="bg-red-200"
              ></Stack>
              <Stack
                titulo="Turno mañana"
                duracion="10:30"
                fechaFinalizacion={today}
                className="bg-red-200"
              ></Stack>
            </div>
          </section>
        </section>
      </section>
    </MainLayout>
  );
};
