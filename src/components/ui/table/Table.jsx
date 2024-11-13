import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { MdAddCircleOutline, MdDeleteOutline } from "react-icons/md";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { CgGym } from "react-icons/cg";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useGetMuscleporEjercicio } from "../../../service/plans/useGetMuscleporEjercicio";
import { LoadingSkeleton } from "../skeleton/LoadingSkeleton";
import { useEffect } from "react";
import { useStorePlanCreado } from "../../../store/useStorePlanCreado";
import { ModalAddToPlan } from "../../plans/ModalAddToPlan";
export const BasicTable = ({
  arreglo,
  arregloColumns,
  action,
  setAlertExerciseAdded,
  loading,
  myplans,
  textSinEjercicios,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openVideo, setOpenVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [nameExercise, setNameExercise] = useState("");
  const [openToModalAdd, setOpenModalToAdd] = useState(false);
  const setPlanCreado = useStorePlanCreado((state) => state.setPlanCreado);

  const [ejercicioAgregado, setEjercicioAgregado] = useState(null);
  // MUSCULO POR EJERCICIO

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // const ejerciciosFiltrados = arreglo.filter(
  //   (exercise) => exercise.dia === selectedDay
  // );

  const ejerciciosPaginados = arreglo.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  // ABRIR Y CERRAR VIDEO DE YT
  const handleOpen = (link, ejercicio) => {
    setVideoUrl(link);
    setOpenVideo(true);
    setNameExercise(ejercicio);
  };

  const handleClose = () => {
    setOpenVideo(false);
    setVideoUrl("");
  };
  /////////////////////////////

  //  AGREGAR EJERCICIO AL PLAN DE ENTRENAMIENTO (NO SE HACE LLAMADO A NINGUN ENDPOINT)
  const addToPlan = (exercise) => {
    setOpenModalToAdd(true);
    setEjercicioAgregado(exercise);
  };

  return (
    <>
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {arregloColumns.map((column, index) => {
                  return (
                    <TableCell
                      key={index}
                      align={
                        column === "Repeticiones" ||
                        column === "Ver" ||
                        column === "Imagen" ||
                        column === "Agregar"
                          ? "center"
                          : "left"
                      }
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      {column}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <div></div>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <LoadingSkeleton
                      width={"100%"}
                       height={100}
                      count={5}
                    ></LoadingSkeleton>
                  </TableCell>
                </TableRow>
              ) : arreglo.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={myplans ? 8 : 6}
                    sx={{ fontSize: "18px" }}
                    align="center"
                  >
                    {` ${textSinEjercicios}`}
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
                      Espalda
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {exercise.nombre}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {exercise.descripcion}
                    </TableCell>
                    {/* MOSTRAR SERIES Y REPETICIONES SOLO EN PANTALLA MIS PLANES */}
                    {myplans && (
                      <TableCell
                        sx={{ fontSize: "16px", fontWeight: "600" }}
                        align="center"
                      >
                        {exercise.series}
                      </TableCell>
                    )}
                    {myplans && (
                      <TableCell
                        sx={{ fontSize: "16px", fontWeight: "600" }}
                        align="center"
                      >
                        {exercise.repeticiones}
                      </TableCell>
                    )}

                    <TableCell
                      sx={{
                        fontSize: "16px",
                        width: {
                          xs: "90px",
                          sm: "100px",
                          md: "110px",
                          lg: "115px",
                        },

                        // bgcolor:"red"
                      }}
                    >
                      <img
                        src="https://www.technogym.com/wpress/wp-content/uploads/2015/06/purestrength_shoulderpress_businessuse_01.jpg"
                        className="w-full"
                        alt=""
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="center">
                      <a
                        onClick={() =>
                          handleOpen(exercise.videoEjercicio, exercise.nombre)
                        }
                        className="underline cursor-pointer text-customTextBlue"
                      >
                        Video
                      </a>
                    </TableCell>
                    {action == "add" && (
                      <TableCell sx={{ fontSize: "16px" }} align="center">
                        <button onClick={() => addToPlan(exercise)}>
                          <MdAddCircleOutline className="text-customNavBar hover:text-customButtonGreen text-[23px] md:text-[28px]"></MdAddCircleOutline>
                        </button>
                      </TableCell>
                    )}
                    {action == "delete" && (
                      <TableCell sx={{ fontSize: "16px" }} align="center">
                        <button>
                          <MdDeleteOutline className="text-red-600 text-2xl"></MdDeleteOutline>
                        </button>
                      </TableCell>
                    )}
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

        {/* Modal para mostrar el video */}
        <Dialog open={openVideo} onClose={handleClose} fullWidth maxWidth="lg">
          <div className="bg-customGreenLigth">
            <div className="flex items-center gap-3 p-2 md:px-4 md:py-3">
              <CgGym className="text-2xl md:text-3xl"></CgGym>
              <h2 className="text-lg md:text-xl font-semibold">
                {nameExercise}{" "}
              </h2>
            </div>

            <iframe
              width="100%"
              className="md:h-[500px] h-72 px-3 md:pb-4 pb-3 md:px-4 "
              src={videoUrl.replace("watch?v=", "embed/")}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Dialog>
      </Paper>
      <ModalAddToPlan
        ejercicioAgregado={ejercicioAgregado}
        open={openToModalAdd}
        setOpen={setOpenModalToAdd}
        setAlertExerciseAdded={setAlertExerciseAdded}
      ></ModalAddToPlan>
    </>
  );
};
