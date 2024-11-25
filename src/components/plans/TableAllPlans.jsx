import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

export const TableAllPlans = ({
  data = [],
  columns = [],
  loading = false,
  arreglo = [],
  myplans = false,
  textSinEjercicios = "No hay ejercicios",
  ejerciciosPaginados = [],
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={
                    ["Repeticiones", "Ver", "Imagen", "Acciones"].includes(
                      column
                    )
                      ? "right"
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
                <TableCell colSpan={6} align="center">
                  <div>Loading...</div>
                </TableCell>
              </TableRow>
            ) : arreglo.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={myplans ? 8 : 6}
                  sx={{ fontSize: "18px" }}
                  align="center"
                >
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
                    Espalda
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px" }} align="left">
                    {exercise.Nombre}
                  </TableCell>
                  <TableCell sx={{ fontSize: "16px" }} align="left">
                    {exercise.Descripcion}
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
      />
    </Paper>
  );
};
