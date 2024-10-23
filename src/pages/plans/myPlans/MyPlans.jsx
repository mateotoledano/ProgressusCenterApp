import React, { useState } from "react";
import { MainLayout } from "../../../layout/MainLayout";
import { Title, Location, BasicTable, Select } from "../../../components";

const columns = [
  "Grupo Muscular",
  "Ejercicio",
  "Peso",
  "Series",
  "Repeticiones",
  "Ver",
];
const ejercicios = [
  {
    grupoMuscular: "Pecho",
    ejercicio: "Press de banca",
    peso: "60kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
    dia: "Lunes",
  },
  {
    grupoMuscular: "Pecho",
    ejercicio: "Aperturas con mancuernas",
    peso: "20kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=eozdVDA78K0",
    dia: "Lunes",
  },
  {
    grupoMuscular: "Pecho",
    ejercicio: "Press inclinado",
    peso: "50kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=DbFgADa2PL8",
    dia: "Lunes",
  },
  {
    grupoMuscular: "Pecho",
    ejercicio: "Fondos en paralelas",
    peso: "Peso corporal",
    series: 3,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=2z8JmcrW-As",
    dia: "Lunes",
  },
  {
    grupoMuscular: "Pecho",
    ejercicio: "Press con máquina",
    peso: "70kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=1bEv8G0u3bQ",
    dia: "Lunes",
  },
  {
    grupoMuscular: "Espalda",
    ejercicio: "Dominadas",
    peso: "Peso corporal",
    series: 4,
    repeticiones: 8,
    link: "https://www.youtube.com/watch?v=IS9o9E7jf4M",
    dia: "Martes",
  },
  {
    grupoMuscular: "Espalda",
    ejercicio: "Remo con barra",
    peso: "60kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=9efgcAjQe7E",
    dia: "Martes",
  },
  {
    grupoMuscular: "Espalda",
    ejercicio: "Pull-over con mancuerna",
    peso: "25kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=xWggTb45brM",
    dia: "Martes",
  },
  {
    grupoMuscular: "Espalda",
    ejercicio: "Jalones al pecho",
    peso: "50kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=O5hVJf2BRw4",
    dia: "Martes",
  },
  {
    grupoMuscular: "Espalda",
    ejercicio: "Remo con máquina",
    peso: "60kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=1pJBeGZ5Q14",
    dia: "Martes",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Sentadillas",
    peso: "80kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=1oed-UmAxFs",
    dia: "Miércoles",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Prensa",
    peso: "100kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=IZxyjW7MPJQ",
    dia: "Miércoles",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Peso muerto",
    peso: "80kg",
    series: 4,
    repeticiones: 8,
    link: "https://www.youtube.com/watch?v=ytGaGIn3SjE",
    dia: "Miércoles",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Zancadas",
    peso: "20kg",
    series: 3,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=D7KaRcUTQeE",
    dia: "Miércoles",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Extensiones de piernas",
    peso: "60kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=yRdv3fSnhoY",
    dia: "Miércoles",
  },
  {
    grupoMuscular: "Bíceps",
    ejercicio: "Curl con barra",
    peso: "30kg",
    series: 3,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=soxrZlIl35U",
    dia: "Jueves",
  },
  {
    grupoMuscular: "Bíceps",
    ejercicio: "Curl martillo",
    peso: "15kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=zC3nLlEvin4",
    dia: "Jueves",
  },
  {
    grupoMuscular: "Bíceps",
    ejercicio: "Curl con mancuernas",
    peso: "12kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
    dia: "Jueves",
  },
  {
    grupoMuscular: "Bíceps",
    ejercicio: "Curl concentrado",
    peso: "10kg",
    series: 3,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=F8dERy4GIyw",
    dia: "Jueves",
  },
  {
    grupoMuscular: "Bíceps",
    ejercicio: "Curl en banco Scott",
    peso: "25kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=oEGZ2gF-36w",
    dia: "Jueves",
  },
  {
    grupoMuscular: "Tríceps",
    ejercicio: "Fondos en paralelas",
    peso: "Peso corporal",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=2z8JmcrW-As",
    dia: "Viernes",
  },
  {
    grupoMuscular: "Tríceps",
    ejercicio: "Extensión con barra",
    peso: "25kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=d_KZxkY_0cM",
    dia: "Viernes",
  },
  {
    grupoMuscular: "Tríceps",
    ejercicio: "Extensión de polea",
    peso: "30kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=vB5OHsJ3EME",
    dia: "Viernes",
  },
  {
    grupoMuscular: "Tríceps",
    ejercicio: "Press cerrado",
    peso: "40kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=0AUGkch3tzc",
    dia: "Viernes",
  },
  {
    grupoMuscular: "Tríceps",
    ejercicio: "Extensiones en polea con cuerda",
    peso: "25kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=SeIJmciN8mo",
    dia: "Viernes",
  },
  {
    grupoMuscular: "Hombros",
    ejercicio: "Press militar",
    peso: "40kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=B-aVuyhvLHU",
    dia: "Sábado",
  },
  {
    grupoMuscular: "Hombros",
    ejercicio: "Elevaciones laterales",
    peso: "8kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=3VcKaXpzqRo",
    dia: "Sábado",
  },
  {
    grupoMuscular: "Hombros",
    ejercicio: "Pájaros",
    peso: "10kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=6yMdALZ9lz4",
    dia: "Sábado",
  },
  {
    grupoMuscular: "Hombros",
    ejercicio: "Encogimientos",
    peso: "60kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=IAgkVKyRhB8",
    dia: "Sábado",
  },
  {
    grupoMuscular: "Hombros",
    ejercicio: "Press Arnold",
    peso: "20kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=6Z15_WdXmVw",
    dia: "Sábado",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Peso muerto",
    peso: "80kg",
    series: 4,
    repeticiones: 8,
    link: "https://www.youtube.com/watch?v=ytGaGIn3SjE",
    dia: "Sabado",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Zancadas",
    peso: "20kg",
    series: 3,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=D7KaRcUTQeE",
    dia: "Sabado",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Peso muerto",
    peso: "80kg",
    series: 4,
    repeticiones: 8,
    link: "https://www.youtube.com/watch?v=ytGaGIn3SjE",
    dia: "Sabado",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Zancadas",
    peso: "20kg",
    series: 3,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=D7KaRcUTQeE",
    dia: "Sabado",
  },
];

export const MyPlans = () => {
  const [selectedDay, setSelectedDay] = useState("Lunes");
  console.log(selectedDay, "selected day");

  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12  overflow-hidden mb-4 flex flex-col ">
        <div className="p-3">
          <Location route={"Planes"} subroute={"Mis Planes"}></Location>
          <Title title={"Mis Planes"}></Title>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <div className="w-full flex md:flex-row flex-col items-start md:gap-0 gap-2 md:justify-between md:items-center p-3 mb-3">
          <Title title={`Plan de Mariano`}></Title>
          <Select
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          ></Select>
        </div>
        <BasicTable
          selectedDay={selectedDay}
          arregloColumns={columns}
          arreglo={ejercicios}
          action={"delete"}
        ></BasicTable>
      </section>
    </MainLayout>
  );
};
