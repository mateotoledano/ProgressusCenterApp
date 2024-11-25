import React from "react";
import { BasicTable, Button, TableAllPlans } from "../../../../components";
import { IoMdAdd } from "react-icons/io";

export const AllPlanes = () => {
  const planesDeEntrenamiento = [
    {
      Nombre: "Plan Básico",
      Objetivo: "Tonificar",
      Descripcion:
        "Entrenamiento para principiantes enfocado en mejorar resistencia.",
      "Cantidad de dias": 3,
      Acciones: "Editar / Eliminar",
    },
    {
      Nombre: "Plan Avanzado",
      Objetivo: "Hipertrofia",
      Descripcion: "Ejercicios intensos para aumento de masa muscular.",
      "Cantidad de dias": 5,
      Acciones: "Editar / Eliminar",
    },
    {
      Nombre: "Plan Funcional",
      Objetivo: "Resistencia",
      Descripcion: "Entrenamiento funcional con enfoque en movilidad.",
      "Cantidad de dias": 4,
      Acciones: "Editar / Eliminar",
    },
    {
      Nombre: "Plan Personalizado",
      Objetivo: "Personalizado",
      Descripcion: "Plan adaptado a las necesidades específicas del usuario.",
      "Cantidad de dias": 6,
      Acciones: "Editar / Eliminar",
    },
  ];

  const arregloColumns = [
    "Nombre",
    "Objetivo",
    "Descripcion",
    "Cantidad de dias",
    "Acciones",
  ];
  return (
    <div className="">
      <div className="p-3 flex justify-end">
        {/* NUEVO PLAN */}
        <Button
          className="flex justify-start items-center gap-1 "
          Icon={IoMdAdd}
          label={"Nuevo plan"}
        ></Button>
      </div>
      <TableAllPlans
       textSinEjercicios={"No se encontraron planes.."}
        columns={arregloColumns}
        arreglo={planesDeEntrenamiento}
        ejerciciosPaginados={planesDeEntrenamiento}
      ></TableAllPlans>
    </div>
  );
};
