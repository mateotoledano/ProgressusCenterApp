import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import { LoadingSkeleton } from "../../ui/skeleton/LoadingSkeleton";
import { useEffect } from "react";
import dayjs from "dayjs";

export const TablePagos = ({
  arreglo,
  arregloColumns,
  loading,
  textSinEjercicios,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // PAGINAR EL INVENTARIO
  const inventaryPagination = arreglo.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 200 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {arregloColumns.map((column, index) => {
                  return (
                    <TableCell
                      key={index}
                      align={
                        column === "Modificar"
                          ? "right"
                          : column === "Estado"
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
                  <TableCell colSpan={3} align="center">
                    <LoadingSkeleton
                      width={"100%"}
                      height={45}
                      count={3}
                    ></LoadingSkeleton>
                  </TableCell>
                </TableRow>
              ) : arreglo.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{ fontSize: "18px" }}
                    align="center"
                  >
                    {` ${textSinEjercicios}`}
                  </TableCell>
                </TableRow>
              ) : (
                inventaryPagination.map((element, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": {
                        backgroundColor: "#E6F7FF",
                      },
                    }}
                  >
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {element.membresia.nombre}
                    </TableCell>
                   
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {dayjs(
                        element.historialSolicitudDePagos[1].fechaCambioEstado
                      ).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      $ {element.membresia.precio}
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
    </>
  );
};
