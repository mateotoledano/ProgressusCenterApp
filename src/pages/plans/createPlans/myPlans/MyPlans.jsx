import React, { useState } from "react";
import { MainLayout } from "../../../../layout/MainLayout";
import {
  Title,
  Location,
  BasicTable,
  Select,
  Button,
} from "../../../../components";
import { MdDeleteOutline } from "react-icons/md";
import { useStoreUserData } from "../../../../store";
import { GrPlan } from "react-icons/gr";
import { useStorePlanCreado } from "../../../../store/useStorePlanCreado";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ModalCreatePlans } from "../../../../components";
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
  "Series",
  "Repeticiones",
  "Imagen",
  "Ver",
  "Agregar",
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

export const MyPlans = ({
  setAlertPlanVacio,
  setAlertCreate,
  setErrorServer,
}) => {
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const dataUser = useStoreUserData((state) => state.userData);
  const nameUser = dataUser.nombre;
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const planCreado = useStorePlanCreado((state) => state.planCreado);
  const clearPlanActual = useStorePlanCreado((state) => state.clearPlan);

  const createPlan = () => {
    if (planCreado.length > 0) {
      setOpenModalCreate(true);
    } else {
      setAlertPlanVacio(true);
    }
  };
  const deletePlan = () => {
    clearPlanActual();
  };
  return (
    <>
      {/* <div className="p-3">
          <Location route={"Planes"} subroute={"Mis Planes"}></Location>
          <Title title={"Mis Planes"}></Title>
        </div> */}
      {/* DIVISION GRAY */}
      {/* <div className="w-full h-2 md:h-4 bg-customGray"></div> */}
      <div className="px-3 mt-0  flex flex-col md:flex-row md:justify-between mb-0 md:items-center">
        <div className="flex justify-start items-center gap-2 mb-4">
          <h2 className="md:text-2xl">{`Planes de ${nameUser}`}</h2>

          <GrPlan className="text-customNavBar text-sm md:text-2xl"></GrPlan>
        </div>
        <Select
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        ></Select>
      </div>

      <div className="flex justify-center px-3 text-center my-3 ">
        <h2 className="text-lg md:text-2xl p-1 border-customNavBar border-b-2 font-semibold">
          Plan actual
        </h2>
      </div>

      <BasicTable
        myplans={true}
        loading={false}
        selectedDay={selectedDay}
        arregloColumns={columnsTrainer}
        arreglo={planCreado}
        action={"delete"}
      ></BasicTable>
      <div className="flex justify-center my-2 px-3 gap-6">
        <Button
          onClick={createPlan}
          Icon={IoIosAddCircleOutline}
          className="flex items-center gap-2 md:px-[8px] md:py-[5px]"
          classNameIcon="text-xl md:text-xl font-semibold"
          label={"Crear Plan"}
        ></Button>
        <Button
          onClick={deletePlan}
          Icon={MdDeleteOutline}
          className="flex bg-red-600 items-center gap-2 px-[8px] py-[5px]"
          classNameIcon="text-xl md:text-xl font-semibold"
          label={"Eliminar Plan"}
        ></Button>
      </div>
      <ModalCreatePlans
        setErrorServer={setErrorServer}
        setAlertCreate={setAlertCreate}
        open={openModalCreate}
        setOpen={setOpenModalCreate}
      ></ModalCreatePlans>
    </>
  );
};
