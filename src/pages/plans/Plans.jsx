import React, { useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { IoSearchSharp } from "react-icons/io5";

import { GrPlan } from "react-icons/gr";
import { Title, Location, CustomInput, BasicTable } from "../../components";
import { Link } from "react-router-dom";
const ejercicios = [
  {
    grupoMuscular: "Pecho",
    ejercicio: "Press de banca",
    peso: "60kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=gRVjAtPip0Y",
  },
  {
    grupoMuscular: "Pecho",
    ejercicio: "Aperturas con mancuernas",
    peso: "20kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=eozdVDA78K0",
  },
  {
    grupoMuscular: "Pecho",
    ejercicio: "Press inclinado",
    peso: "50kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=DbFgADa2PL8",
  },
  {
    grupoMuscular: "Pecho",
    ejercicio: "Fondos en paralelas",
    peso: "Peso corporal",
    series: 3,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=2z8JmcrW-As",
  },
  {
    grupoMuscular: "Pecho",
    ejercicio: "Press con máquina",
    peso: "70kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=1bEv8G0u3bQ",
  },

  {
    grupoMuscular: "Espalda",
    ejercicio: "Dominadas",
    peso: "Peso corporal",
    series: 4,
    repeticiones: 8,
    link: "https://www.youtube.com/watch?v=IS9o9E7jf4M",
  },
  {
    grupoMuscular: "Espalda",
    ejercicio: "Remo con barra",
    peso: "60kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=9efgcAjQe7E",
  },
  {
    grupoMuscular: "Espalda",
    ejercicio: "Pull-over con mancuerna",
    peso: "25kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=xWggTb45brM",
  },
  {
    grupoMuscular: "Espalda",
    ejercicio: "Jalones al pecho",
    peso: "50kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=O5hVJf2BRw4",
  },
  {
    grupoMuscular: "Espalda",
    ejercicio: "Remo con máquina",
    peso: "60kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=1pJBeGZ5Q14",
  },

  {
    grupoMuscular: "Piernas",
    ejercicio: "Sentadillas",
    peso: "80kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=1oed-UmAxFs",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Prensa",
    peso: "100kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=IZxyjW7MPJQ",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Peso muerto",
    peso: "80kg",
    series: 4,
    repeticiones: 8,
    link: "https://www.youtube.com/watch?v=ytGaGIn3SjE",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Zancadas",
    peso: "20kg",
    series: 3,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=D7KaRcUTQeE",
  },
  {
    grupoMuscular: "Piernas",
    ejercicio: "Extensiones de piernas",
    peso: "60kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=yRdv3fSnhoY",
  },

  {
    grupoMuscular: "Bíceps",
    ejercicio: "Curl con barra",
    peso: "30kg",
    series: 3,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=soxrZlIl35U",
  },
  {
    grupoMuscular: "Bíceps",
    ejercicio: "Curl martillo",
    peso: "15kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=zC3nLlEvin4",
  },
  {
    grupoMuscular: "Bíceps",
    ejercicio: "Curl con mancuernas",
    peso: "12kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo",
  },
  {
    grupoMuscular: "Bíceps",
    ejercicio: "Curl concentrado",
    peso: "10kg",
    series: 3,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=F8dERy4GIyw",
  },
  {
    grupoMuscular: "Bíceps",
    ejercicio: "Curl en banco Scott",
    peso: "25kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=oEGZ2gF-36w",
  },

  {
    grupoMuscular: "Tríceps",
    ejercicio: "Fondos en paralelas",
    peso: "Peso corporal",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=2z8JmcrW-As",
  },
  {
    grupoMuscular: "Tríceps",
    ejercicio: "Extensión con barra",
    peso: "25kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=d_KZxkY_0cM",
  },
  {
    grupoMuscular: "Tríceps",
    ejercicio: "Extensión de polea",
    peso: "30kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=vB5OHsJ3EME",
  },
  {
    grupoMuscular: "Tríceps",
    ejercicio: "Press cerrado",
    peso: "40kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=0AUGkch3tzc",
  },
  {
    grupoMuscular: "Tríceps",
    ejercicio: "Extensiones en polea con cuerda",
    peso: "25kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=SeIJmciN8mo",
  },

  {
    grupoMuscular: "Hombros",
    ejercicio: "Press militar",
    peso: "40kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=B-aVuyhvLHU",
  },
  {
    grupoMuscular: "Hombros",
    ejercicio: "Elevaciones laterales",
    peso: "8kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=3VcKaXpzqRo",
  },
  {
    grupoMuscular: "Hombros",
    ejercicio: "Pájaros",
    peso: "10kg",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=SiM5Af6ScjY",
  },
  {
    grupoMuscular: "Hombros",
    ejercicio: "Press Arnold",
    peso: "15kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=v-7v9zOI72g",
  },
  {
    grupoMuscular: "Hombros",
    ejercicio: "Remo al mentón",
    peso: "30kg",
    series: 4,
    repeticiones: 10,
    link: "https://www.youtube.com/watch?v=8zI5EoiYiZk",
  },

  {
    grupoMuscular: "Core",
    ejercicio: "Plancha",
    peso: "Peso corporal",
    series: 4,
    repeticiones: "30s",
    link: "https://www.youtube.com/watch?v=TvxNkmjdhMM",
  },
  {
    grupoMuscular: "Core",
    ejercicio: "Crunch abdominal",
    peso: "Peso corporal",
    series: 4,
    repeticiones: 15,
    link: "https://www.youtube.com/watch?v=5ER5OFKxz4E",
  },
  {
    grupoMuscular: "Core",
    ejercicio: "Elevación de piernas",
    peso: "Peso corporal",
    series: 4,
    repeticiones: 12,
    link: "https://www.youtube.com/watch?v=JB2oyawG9KI",
  },
  {
    grupoMuscular: "Core",
    ejercicio: "Bicicleta",
    peso: "Peso corporal",
    series: 3,
    repeticiones: 20,
    link: "https://www.youtube.com/watch?v=9FGilxCbdz8",
  },
  {
    grupoMuscular: "Core",
    ejercicio: "Russian twist",
    peso: "5kg",
    series: 4,
    repeticiones: 20,
    link: "https://www.youtube.com/watch?v=wkD8rjkodUI",
  },
];
const columns = [
  "Grupo Muscular",
  "Ejercicio",
  "Peso",
  "Series",
  "Repeticiones",
  "Ver",
  "Agregar",
];
export const Plans = () => {
  const [searchPlan, setSearchPlan] = useState("");
  const handleChange = (e) => {
    setSearchPlan(e.target.value);
  };
  console.log(searchPlan, "search");

  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12  overflow-hidden mb-4 flex flex-col ">
        <div className="b p-3 ">
          <Location route={"Planes"} subroute={"Crear Plan"}></Location>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Title title={"Crear Plan de Entrenamiento"}></Title>
            <Link to={"/plans/myplans"} className="flex  gap-2 items-center">
              <span className="text-sm md:text-lg text-customTextGreen underline">
                Mis planes
              </span>
              <GrPlan className="text-customNavBar text-sm md:text-2xl"></GrPlan>
            </Link>
          </div>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        {/* BUSCAR EJERCICIO */}
        <div className="p-3 mt-0  flex flex-col md:flex-row md:justify-between  md:items-center">
          <div className="flex justify-start items-center gap-2">
            <h2 className="md:text-2xl">{`Plan de Mariano`}</h2>

            <GrPlan className="text-customNavBar text-sm md:text-2xl"></GrPlan>
          </div>
          <div className="flex justify-center items-center gap-1 mt-3 md:w-1/3">
            <CustomInput
            className="focus:ring-customButtonGreen focus:border-customButtonGreen "
              value={searchPlan}
              onChange={handleChange}
              placeholder="Buscar ejercicio..."
              type="text"
            ></CustomInput>
            <button className="bg-customButtonGreen p-2 md:p-2  rounded">
              <IoSearchSharp className="text-white  text-lg md:text-2xl font-semibold"></IoSearchSharp>{" "}
            </button>
          </div>
        </div>
        {/* TABLA DE EJERCICIOS */}
        <div className="mt-3">
          <BasicTable
            arreglo={ejercicios}
            arregloColumns={columns}
            action="add"
          ></BasicTable>
        </div>
      </section>
    </MainLayout>
  );
};
