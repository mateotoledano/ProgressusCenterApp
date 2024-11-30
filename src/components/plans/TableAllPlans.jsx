import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { LoadingSkeleton } from "../ui/skeleton/LoadingSkeleton";
import { ModalDeletePlan } from "./ModalDeletePlan";
import usePlanParaVer from "../../store/planParaVer";
import { ModalAsignPlan } from "./ModalAsignPlan";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useStoreUserData } from "../../store";
import { usePlansSocio } from "../../service/plans/usePlansSocio";
import { useGetPlanById } from "../../service/plans/useGetPlanById";
import { ModalElegirPlan } from "./ModalElegirPlan";
export const TableAllPlans = ({
  setPlanes,
  arreglo = [],
  arregloColumns,
  loading,
  textSinEjercicios,
  myPlans,
  setAlertAsignedPlan,
}) => {
  console.log(arreglo, "arreglo all plans");

  const dataUser = useStoreUserData((state) => state.userData);
  const roleUser = dataUser.roles[0];
  const [planSocio, setPlanSocio] = useState();
  // plan Para poder verlo en otra ruta
  const setPlanParaVer = usePlanParaVer((state) => state.setPlanParaVer);
  const setIsEditable = usePlanParaVer((state) => state.setIsEditable);
  // MODAL DELETE PLAN
  const [modalDeletePlan, setModalDeletePlan] = useState(false);
  const navigate = useNavigate();
  const [planToAsignar, setPlanToAsignar] = useState();
  const [planElegir, setPlanElegir] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //  MODAL PARA ASIGNAR A UN USER
  const [modalAsignarPlan, setModalAsignarPlan] = useState(false);
  //  MODAL PARA ELEGIR PLAN EN PÁRTE DE UN SOCIO
  const [modalPlanElegir, setModalPlanElegir] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const ejerciciosPaginados = arreglo.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  // ASIGNAR PLAN
  const openAsignar = (plan) => {
    if (roleUser === "ENTRENADOR") {
      setPlanToAsignar(plan);
      setModalAsignarPlan(true);
    } else {
      // ELEGIR PLAN (SOLO PARTE DEL USER)
      setPlanElegir(plan);
      setModalPlanElegir(true);
    }
  };
  // VER PLANES
  const viewPlan = (plan) => {
    setIsEditable(false);
    setPlanParaVer(plan);
    navigate("/plans/viewPlan");
  };
  // ELIMINAR PLAN
  const deletePlan = (plan) => {
    setModalDeletePlan(true);
    setPlanToAsignar(plan);
  };
  // EDITAR PLAN
  const editPlan = (plan) => {
    setIsEditable(true);
    setPlanParaVer(plan);
    navigate("/plans/viewPlan");
  };

  // useEffect(() => {
  //   if(arreglo.length){

  //   }
  //   const traerPlanSocio = async () => {
  //     const responsePlansSocio = await usePlansSocio(dataUser.identityUserId);

  //     if (responsePlansSocio?.status == 200) {
  //       const traerPlanAsignado = await useGetPlanById(
  //         responsePlansSocio.data.planDeEntrenamientoId
  //       );
  //       setPlanSocio(traerPlanAsignado.data.value.value);
  //     }
  //   };
  //   traerPlanSocio();
  // }, []);
  return (
    <div>
      <Paper>
        <TableContainer>
          <Table
            sx={{
              tableLayout: {
                xs: "auto",
                md: "fixed",
              },
              width: "100%", // Asegúrate de que la tabla ocupe todo el ancho
            }}
          >
            <TableHead>
              <TableRow>
                {arregloColumns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={
                      [
                        "Repeticiones",
                        "Ver",
                        "Imagen",
                        "Acciones",
                        "Cantidad de dias",
                        "Acciones",
                      ].includes(column)
                        ? "center"
                        : "left"
                    }
                    sx={{ fontWeight: "bold", fontSize: "16px" }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <LoadingSkeleton width={"100%"} height={40} count={5} />
                  </TableCell>
                </TableRow>
              ) : arreglo.length === 0 ? (
                <TableRow>
                  <TableCell sx={{ fontSize: "18px" }} align="center">
                    {textSinEjercicios}
                  </TableCell>
                </TableRow>
              ) : (
                ejerciciosPaginados.map((exercise, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: "#E6F7FF",
                      },
                    }}
                  >
                    <TableCell
                      sx={{ fontSize: "16px" }}
                      component="th"
                      scope="row"
                    >
                      {exercise.nombre}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {exercise.objetivoDelPlan.nombre}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {exercise.descripcion}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="center">
                      {exercise.diasPorSemana}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "16px",
                      }}
                      align={myPlans ? "right" : "center"}
                    >
                      <div className="flex justify-center gap-3">
                        {myPlans && roleUser === "ENTRENADOR" && (
                          <div className="flex justify-end gap-3">
                            <div
                              onClick={() => editPlan(exercise)}
                              className="p-[2px] bg-customButtonGreen hover:bg-green-700 rounded cursor-pointer"
                            >
                              <MdOutlineEdit className="text-white text-xl" />
                            </div>
                            <div
                              onClick={() => deletePlan(exercise)}
                              className="p-[2px] bg-red-600 hover:bg-red-800 rounded cursor-pointer"
                            >
                              <MdDeleteOutline className="text-white text-xl" />
                            </div>
                          </div>
                        )}
                        <div
                          onClick={() => viewPlan(exercise)}
                          className="text-customTextBlue underline cursor-pointer mb-1"
                        >
                          Ver
                        </div>
                        {roleUser === "ENTRENADOR" && (
                          <div
                            onClick={() => openAsignar(exercise)}
                            className="text-customTextBlue underline cursor-pointer"
                          >
                            Asignar
                          </div>
                        )}
                        {!myPlans && roleUser === "SOCIO" && (
                          <div
                            onClick={() => openAsignar(exercise)}
                            className="text-customTextBlue underline cursor-pointer"
                          >
                            Elegir
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={arreglo.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={() => ""}
        />
      </Paper>
      {/* MODAL PARA ASIGNAR PLAN */}
      <ModalAsignPlan
        setAlertAsignedPlan={setAlertAsignedPlan}
        planToAsignar={planToAsignar}
        open={modalAsignarPlan}
        setOpen={setModalAsignarPlan}
      ></ModalAsignPlan>
      {/* MODAL PARA ELIMINAR PLAN */}
      <ModalDeletePlan
        setPlanes={setPlanes}
        open={modalDeletePlan}
        plan={planToAsignar}
        setOpen={setModalDeletePlan}
      ></ModalDeletePlan>

      {/* MODAL PARA ELEGIR PLAN (PARTE DE SOCI0) */}
      <ModalElegirPlan
        setAlertAsignedPlan={setAlertAsignedPlan}
        open={modalPlanElegir}
        plan={planElegir}
        setOpen={setModalPlanElegir}
      ></ModalElegirPlan>
    </div>
  );
};
