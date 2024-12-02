import React, { useEffect, useState } from "react";
MainLayout;
import {
  Title,
  Location,
  CustomInput,
  BasicTable,
  SnackbarDefault,
} from "../../../components";
import { Link } from "react-router-dom";
import { useStoreUserData } from "../../../store";
import { CreatePlans } from "../createPlans/createPlans/CreatePlans";

import { MyPlans } from "../createPlans/myPlans/MyPlans";
import { MainLayout } from "../../../layout/MainLayout";
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
  "Músculos",
  "Ejercicio",
  "Descripción",
  "Imagen",
  "Ver",
  "Agregar",
];
export const CreateallExercise = () => {
  const [selectNav, setSelectNav] = useState("Crear Plan");
  const dataUser = useStoreUserData((state) => state.userData);
  const [alertPlanVacio, setAlertPlanVacio] = useState(false);
  const [alertExerciseAdded, setAlertExerciseAdded] = useState(false);
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12  overflow-hidden mb-20 flex flex-col ">
        <div className="b p-3 ">
          <Location route={"Planes"} subroute={selectNav}></Location>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <Title title={"Planes"}></Title>
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
            onClick={() => setSelectNav("Crear Plan")}
            className={`transition-all font-bold cursor-pointer p-1  ${
              selectNav === "Crear Plan" &&
              "border-b-2 border-customTextGreen text-customTextGreen md:text-lg"
            }`}
          >
            Crear Ejercicio
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
              "border-b-2 border-customTextGreen text-customTextGreen md:text-lg"
            }`}
          >
            Crear Músculo
          </span>
        </div>
        {selectNav == "Crear Musculo" && (
          <CreatePlans
            setAlertExerciseAdded={setAlertExerciseAdded}
          ></CreatePlans>
        )}
        {/* {selectNav == "Editar Planes" && <EditPlans></EditPlans>} */}
        {selectNav == "Crear Ejercicio" && (
          <MyPlans setAlertPlanVacio={setAlertPlanVacio}></MyPlans>
        )}
      </section>
      <SnackbarDefault
        open={alertPlanVacio}
        setOpen={setAlertPlanVacio}
        severity={"warning"}
        message={"Debe agregar ejercicios al Plan"}
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
    </MainLayout>
  );
};
