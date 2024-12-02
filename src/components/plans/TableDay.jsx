import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RiAddCircleLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import TablePagination from "@mui/material/TablePagination";
import { LoadingSkeleton } from "../ui/skeleton/LoadingSkeleton";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Dialog } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { CgGym } from "react-icons/cg";
import { useGetExerciseById } from "../../service/plans/useGetExerciseById";
import { useSpinnerStore } from "../../store";
import { ModalExercise } from "./ModalExercise";
import { ModalDeleteExercise } from "./ModalDeleteExercise";
export const TableDay = ({
  day,
  arreglo,
  arregloColumns,
  textSinEjercicios,
  editar,
  isEditable,
  setDiasDelPlan,
  setAlertAddExercise,
  setOpenAlertDelete,
}) => {
  console.log(arreglo, "arreglo");
  const [modalExercise, setModalExercise] = useState(false);
  const [modalDeleteExercise, setModalDeleteExercise] = useState(false);
  const [exerciseDelete, setExerciseDelete] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  // DIALOG DE INFO
  const [openVideo, setOpenVideo] = useState(false);
  const [exercise, setExercise] = useState();
  const [videoUrl, setVideoUrl] = useState("");
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = arreglo.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // ABRIR Y CERRAR VIDEO DE YT
  const handleOpen = async (link, ejercicio) => {
    showSpinner();
    console.log(ejercicio, "ejercoicocp");

    try {
      const resp = await useGetExerciseById(ejercicio.ejercicioId);
      setExercise(resp.data);
    } catch (e) {
      console.log(e, "errores");
    } finally {
      setOpenVideo(true);
      setVideoUrl(link);
      hideSpinner();
    }
  };
  const handleClose = () => {
    setOpenVideo(false);
    setVideoUrl("");
  };
  console.log(arreglo, "arreglo en table day");
  const deleteExercise = (exercise) => {
    setExerciseDelete(exercise);
    setModalDeleteExercise(true);
  };
  const openModalAddExercise = () => {
    setModalExercise(true);
  };
  // ORDENAR LOS EJERCICIOS SEGUN EL ORDEN EN EL QUE VA
  const sortedPaginatedData = paginatedData.sort(
    (a, b) => a.ordenDeEjercicio - b.ordenDeEjercicio
  );

  return (
    <div>
      {isEditable && (
        <div className="flex items-center mt-3 gap-2 mb-3 w-full pb-3 p-3 ">
          {/* <span className="text-xl font-semibold">
            Agregar ejercicio al dia {day}
            </span> */}
            <div className="flex w-full justify-end">
              <Tooltip title={`Añadir ejercicio al dia ${day}`}>
                <span className="bg-customButtonGreen hover:bg-green-800 rounded p-1">
                  <RiAddCircleLine
                    onClick={() => openModalAddExercise()}
                    className="cursor-pointer text-3xl text-white"
                  />
                </span>
              </Tooltip>
            </div>

          <ModalExercise
            setAlertAddExercise={setAlertAddExercise}
            setDiasDelPlan={setDiasDelPlan}
            day={day}
            open={modalExercise}
            setOpen={setModalExercise}
          ></ModalExercise>
          {/* MODAL PARA ELIMINAR EJERCICIO */}
          <ModalDeleteExercise
            setOpenAlertDelete={setOpenAlertDelete}
            day={day}
            setPlanes={setDiasDelPlan}
            exercise={exerciseDelete}
            open={modalDeleteExercise}
            setOpen={setModalDeleteExercise}
          ></ModalDeleteExercise>
        </div>
      )}
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
                        "Repeticiones",
                        "Series",
                      ].includes(column)
                        ? "center"
                        : "left"
                    }
                    sx={{ fontWeight: "bold" }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {arreglo.length === 0 ? (
                <TableRow>
                  <TableCell
                    sx={{ fontSize: "18px" }}
                    colSpan={isEditable ? 6 : 5}
                    align="center"
                  >
                    {textSinEjercicios}
                  </TableCell>
                </TableRow>
              ) : (
                sortedPaginatedData.map((exercise, index) => (
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
                      {exercise?.ordenDeEjercicio}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {exercise?.ejercicio?.nombre}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="center">
                      {exercise?.series}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="center">
                      {exercise?.repeticiones}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "16px",

                        alignItems: "stretch",

                        height: "100%",
                      }}
                      align="right"
                    >
                      <div className="flex h-full items-center justify-center flex-col gap-8 md:gap-2">
                        <div
                          onClick={() => {
                            handleOpen(
                              "https://www.youtube.com/watch?v=rT7DgCr-3pg",
                              exercise
                            );
                          }}
                          className={`p-[2px] w-full md:w-1/6 h-full flex justify-center items-center bg-gray-700  hover:bg-gray-800 rounded  cursor-pointer `}
                        >
                          <IoInformationCircleOutline className="text-2xl text-white font-semibold"></IoInformationCircleOutline>
                        </div>
                        {isEditable && (
                          <div
                            onClick={() => deleteExercise(exercise)}
                            className="p-[2px] w-full md:w-1/6 h-full flex justify-center items-center bg-red-600  hover:bg-red-800 rounded  cursor-pointer"
                          >
                            <MdDeleteOutline className="text-white text-2xl"></MdDeleteOutline>
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

      {/* Modal para mostrar el video */}
      <Dialog open={openVideo} onClose={handleClose} fullWidth maxWidth="md">
        <div className="bg-customGreenLigth">
          <div className="flex items-center gap-3 p-2 md:px-4 md:py-3">
            <CgGym className="text-2xl md:text-3xl"></CgGym>
            <h2 className="text-lg md:text-xl font-semibold">
              {exercise?.nombre}{" "}
            </h2>
          </div>

          <iframe
            width="100%"
            className="md:h-[400px] h-72 px-3 md:pb-4 pb-3 md:px-4 "
            src={exercise?.videoEjercicio.replace("watch?v=", "embed/")}
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="flex flex-col justify-center gap-2 items-center mb-2 px-3 md:px-4 ">
            <h2 className="text-lg text-start w-full md:text-xl font-semibold">
              {exercise?.descripcion}{" "}
            </h2>

            <div className="flex justify-between  w-full md:mt-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 mb-4  md:text-xl justify-center font-semibold text-customTextBlue w-1/2">
                <h2 className=" text-black underline  font-semibold col-span-full">
                  Músculos involucrados
                </h2>
                {exercise?.musculosDeEjercicio.length > 0 ? (
                  exercise.musculosDeEjercicio.map((muscle, index) => (
                    <li key={index}>-{muscle}</li>
                  ))
                ) : (
                  <>
                    <li>-Gemelos</li>
                    <li>-Cuádriceps</li>
                    <li>-Femorales</li>
                    <li>-Bíceps</li>
                    <li>-Tríceps</li>
                    <li>-Pectorales</li>
                    <li>-Dorsales</li>
                    <li>-Trapecios</li>
                  </>
                )}
              </ul>
              <div className="flex w-1/2 justify-center">
                <img
                  className="w-2/3 object-contain"
                  src="/progressus.png"
                  alt="Progressus logo"
                />
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};