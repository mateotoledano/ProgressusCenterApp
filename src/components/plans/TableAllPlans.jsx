import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { LoadingSkeleton } from "../ui/skeleton/LoadingSkeleton";
import usePlanParaVer from "../../store/planParaVer";
import { ModalAsignPlan } from "./ModalAsignPlan";
import { useNavigate } from "react-router-dom";
export const TableAllPlans = ({
  arreglo,
  arregloColumns,
  loading,
  textSinEjercicios,
  myPlans,
}) => {
  // plan Para poder verlo en otra ruta
  const setPlanParaVer = usePlanParaVer((state) => state.setPlanParaVer);

  const navigate = useNavigate();
  const [planToAsignar, setPlanToAsignar] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //  MODAL PARA ASIGNAR A UN USER
  const [modalAsignarPlan, setModalAsignarPlan] = useState(false);
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
    setPlanToAsignar(plan);
    setModalAsignarPlan(true);
  };
  // VER PLANES
  const viewPlan = (plan) => {
    setPlanParaVer(plan);
    navigate("/plans/viewPlan");
  };
  return (
    <div>
      <Paper>
        <TableContainer>
          <Table>
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
                    <LoadingSkeleton
                      width={"100%"}
                      height={40}
                      count={5}
                    ></LoadingSkeleton>
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
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                      }}
                      align={`${myPlans ? "rigth" : "center"}`}
                    >
                      <div
                        onClick={() => viewPlan(exercise)}
                        className="text-customTextBlue underline cursor-pointer mb-1"
                      >
                        Ver
                      </div>
                      <div
                        onClick={() => openAsignar(exercise)}
                        className="text-customTextBlue underline cursor-pointer"
                      >
                        Asignar
                      </div>
                      {myPlans && (
                        <div className="text-customTextBlue underline cursor-pointer">
                          Modificar
                        </div>
                      )}
                      {myPlans && (
                        <div className="text-red-600 underline cursor-pointer">
                          Eliminar
                        </div>
                      )}
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
        planToAsignar={planToAsignar}
        open={modalAsignarPlan}
        setOpen={setModalAsignarPlan}
      ></ModalAsignPlan>
    </div>
  );
};
