import React, { useEffect, useState } from "react";
import {
  BasicTable,
  Button,
  SnackbarDefault,
  TableAllPlans,
} from "../../../../components";
import { IoMdAdd } from "react-icons/io";
import { useGetAllPlans } from "../../../../service/plans/useGetAllPlans";
import { ModalCreatePlans } from "../../../../components";
import { MyPlans } from "../myPlans/MyPlans";
const arregloColumns = [
  "Nombre",
  "Objetivo",
  "Descripcion",
  "Cantidad de dias",
  "Acciones",
];
export const AllPlanes = ({ selectNav }) => {
  // ERROR SERVER
  const [errorServer, setErrorServer] = useState(false);
  // MODAL PARA CREAR PLAN
  const [openCreatePlan, setOpenCreatePlan] = useState(false);

  // LOADING CUANDO CARGUE LA TABLA
  const [loading, setLoading] = useState(false);
  const [allPlans, setAllPlans] = useState([]);
  useEffect(() => {
    const traerPlans = async () => {
      setLoading(true);
      try {
        const response = await useGetAllPlans();
        if (response) {
          setAllPlans(response.data);
        }
      } catch (e) {
        console.log(e, "errores");
      } finally {
        setLoading(false);
      }
    };
    traerPlans();
  }, []);
  console.log(allPlans, "all plans");

  return (
    <div className="">
      <div className="p-3 flex justify-end">
        {/* NUEVO PLAN */}
        <Button
          className="flex justify-start items-center gap-1 "
          Icon={IoMdAdd}
          onClick={() => setOpenCreatePlan(true)}
          label={"Nuevo plan"}
        ></Button>
      </div>
      {selectNav == "Todos los planes" ? (
        <TableAllPlans
          loading={loading}
          textSinEjercicios={"No se encontraron planes.."}
          arregloColumns={arregloColumns}
          arreglo={allPlans}
        ></TableAllPlans>
      ) : (
        <MyPlans></MyPlans>
      )}
      {/* MODAL PARA CREAR PLAN */}
      <ModalCreatePlans
        setErrorServer={setErrorServer}
        open={openCreatePlan}
        setOpen={setOpenCreatePlan}
      ></ModalCreatePlans>
      <SnackbarDefault
        open={errorServer}
        setOpen={setErrorServer}
        severity={"error"}
        message={"Ocurrio un error intentelo nuevamente !"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>
    </div>
  );
};
