import React, { useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Acordion, Stack } from "../../components";
import dayjs from "dayjs";
import { FaRegCalendarCheck } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
export const Turns = () => {
  const turnos = [
    {
      title: "Turno Mañana",
      horarios: ["08:30", "09:30", "10:30", "11:30", "12:30"],
    },
    {
      title: "Turno Tarde",
      horarios: ["14:30", "15:30", "16:30", "17:30", "18:30", "19:30"],
    },
    {
      title: "Turno Noche",
      horarios: ["20:30", "21:30", "22:30", "23:30"],
    },
  ];

  const today = dayjs().format("DD/MM/YYYY");

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
                Turnos seleccionados
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
                Turnos finalizados
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
