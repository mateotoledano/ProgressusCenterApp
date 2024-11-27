import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../../layout/MainLayout";
import {
  Title,
  Location,
  BasicTable,
  Select,
  Button,
  TableAllPlans,
} from "../../../../components";
import { MdDeleteOutline } from "react-icons/md";
import { useStoreUserData } from "../../../../store";
import { GrPlan } from "react-icons/gr";
import { useGetAllPlansByUser } from "../../../../service/plans/useGetAllPlansByUser";
import { IoIosAddCircleOutline } from "react-icons/io";

const arregloColumns = [
  "Nombre",
  "Objetivo",
  "Descripcion",
  "Cantidad de dias",
  "Acciones",
];
export const MyPlans = (
  {
    // setAlertPlanVacio,
    // setAlertCreate,
    // setErrorServer,
  }
) => {
  const dataUser = useStoreUserData((state) => state.userData);
  const nameUser = dataUser.nombre;
  const [loading, setLoading] = useState(false);

  const [plansByUser, setPlansByUser] = useState([]);

  useEffect(() => {
    const traerPlansByUser = async () => {
      setLoading(true);
      try {
        const response = await useGetAllPlansByUser(dataUser.identityUserId);

        if (response?.status == 200) {
          setPlansByUser(response.data);
        }
      } catch (e) {
        console.log(e, "errores");
      } finally {
        setLoading(false);
      }
    };
    traerPlansByUser();
  }, []);
  console.log(plansByUser, "plans by user");

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
      </div>

      <TableAllPlans
        loading={loading}
        textSinEjercicios={"No se encontraron planes.."}
        arregloColumns={arregloColumns}
        arreglo={plansByUser}
        // prop para ver si esta en myplan o en all plans
        myPlans={true}
      ></TableAllPlans>

      {/* <ModalCreatePlans
        setErrorServer={setErrorServer}
        setAlertCreate={setAlertCreate}
        open={openModalCreate}
        setOpen={setOpenModalCreate}
      ></ModalCreatePlans> */}
    </>
  );
};
