import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../../layout/MainLayout";
import { IoSearchSharp } from "react-icons/io5";
import { useGetAllExercises } from "../../../../service/plans/useGetExercises";

import { GrPlan } from "react-icons/gr";
import {
  Title,
  Location,
  CustomInput,
  BasicTable,
  SnackbarDefault,
} from "../../../../components";
import { Link } from "react-router-dom";
import { useStoreUserData } from "../../../../store";
import { CreatePlans } from "../createPlans/CreatePlans";

import { MyPlans } from "../myPlans/MyPlans";
import { AllPlanes } from "../todosLosPlanes/AllPlanes";
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
const columnsUser = [
  "Grupo Muscular",
  "Ejercicio",
  "Peso",
  "Series",
  "Repeticiones",
  "Ver",
  "Agregar",
];
const columnsTrainer = [
  "Musculos",
  "Ejercicio",
  "Descripcion",
  "Imagen",
  "Ver",
  "Agregar",
];
export const Plans = () => {
  const [selectNav, setSelectNav] = useState("Todos los planes");
  const dataUser = useStoreUserData((state) => state.userData);
  const [alertPlanVacio, setAlertPlanVacio] = useState(false);
  const [alertAsignedPlan, setAlertAsignedPlan] = useState(false);
  const [alertExerciseAdded, setAlertExerciseAdded] = useState(false);

  const [errorServer, setErrorServer] = useState(false);
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12  overflow-hidden mb-20 flex flex-col ">
        <div className="b p-3 ">
          <Location route={"Planes"} subroute={selectNav}></Location>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Title title={"Planes de entrenamiento"}></Title>
            {/* <Link
              to={"/plans/createPlans/myPlans"}
              className="flex  gap-2 items-center"
            >
              <span className="text-sm md:text-lg text-customTextGreen underline">
                Mis planes
              </span>
              <GrPlan className="text-customNavBar text-sm md:text-2xl"></GrPlan>
            </Link> */}
          </div>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        {/* BUSCAR EJERCICIO */}
        <div className="p-3 mb-3 w-full flex justify-between md:justify-center items-center gap-0 md:gap-12  ">
          <span
            onClick={() => setSelectNav("Todos los planes")}
            className={`transition-all font-bold cursor-pointer p-1  ${
              selectNav === "Todos los planes" &&
              "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
            }`}
          >
            Todos los planes
          </span>
          {/* <span
            onClick={() => setSelectNav("Editar Planes")}
            className={`transition-all font-bold cursor-pointer p-1 ${
              selectNav === "Editar Planes" &&
              "border-b-2 border-customTextGreen text-customTextGreen md:text-lg"
            }`}
          >
            Editar Planes
          </span> */}
          <span
            onClick={() => setSelectNav("Mis Planes")}
            className={`transition-all font-bold cursor-pointer p-1 ${
              selectNav === "Mis Planes" &&
              "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
            }`}
          >
            Mis Planes
          </span>
        </div>
        <AllPlanes
          setAlertAsignedPlan={setAlertAsignedPlan}
          selectNav={selectNav}
        ></AllPlanes>
        {/* {selectNav == "Editar Planes" && <EditPlans></EditPlans>} */}
      </section>
      {/* ASIGNAR PLAN A UN USER */}
      <SnackbarDefault
        open={alertAsignedPlan}
        setOpen={setAlertAsignedPlan}
        severity={"success"}
        message={"¡El plan se asignó correctamente!"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>
      {/* ALERT ERROR 500(SERVIDOr) */}
      <SnackbarDefault
        open={errorServer}
        setOpen={setErrorServer}
        severity={"error"}
        message={"Ocurrio un error intentelo nuevamente"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>

      <SnackbarDefault
        open={alertExerciseAdded}
        setOpen={setAlertExerciseAdded}
        severity={"success"}
        message={
          "El ejercicio se agregó a tu plan. Puedes consultarlo en Mis Planes."
        }
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>

      {/* <SnackbarDefault
        open={alertCreate}
        setOpen={setAlertCreate}
        severity={"success"}
        message={"El plan se creo correctamente."}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault> */}
    </MainLayout>
  );
};
