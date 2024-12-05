import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { LoadingSkeleton } from "../ui/skeleton/LoadingSkeleton";

export const TableContability = ({ data, columns, loading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [membershipDetails, setMembershipDetails] = useState({});

  useEffect(() => {
    const fetchMembershipDetails = async () => {
      const uniqueIds = [...new Set(data.map((item) => item.tipoMembresiaId))];
      const fetchedDetails = {};

      await Promise.all(
        uniqueIds.map(async (id) => {
          try {
            const response = await fetch(
              `https://www.progressuscenter.somee.com/api/Membresia/ObtenerMembresiaPorId?id=${id}`
            );
            const result = await response.json();
            fetchedDetails[id] = {
              nombre: result.nombre,
              precio: result.precio,
            };
          } catch (error) {
            console.error(`Error fetching membership ${id}:`, error);
            fetchedDetails[id] = { nombre: "Error", precio: "N/A" };
          }
        })
      );

      setMembershipDetails(fetchedDetails);
      loadingFetch(false);
    };

    fetchMembershipDetails();
  }, [data]);

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

  // Sumar todos los precios de todas las filas en 'data'
  const totalPrice = data.reduce((acc, row) => {
    const price = membershipDetails[row.tipoMembresiaId]?.precio;
    return price ? acc + parseFloat(price) : acc;
  }, 0);

  return (
    <div className="w-full">
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={
                      column === "Nombre" || column === "Fecha"
                        ? "left"
                        : "center"
                    }
                    sx={{ fontWeight: "bold" }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableCell colSpan={4}>
                  <LoadingSkeleton
                    height={35}
                    width={"100%"}
                    className={"p-3"}
                    count={5}
                  ></LoadingSkeleton>
                </TableCell>
              ) : paginatedData.length == 0 ? (
                <TableRow>
                  <TableCell
                    sx={{ fontSize: "18px" }}
                    align="center"
                    colSpan={4}
                  >
                    No se encontraron pagos en este mes...
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {row.nombre} {row.apellido}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {new Date(row.fechaPago).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="center">
                      {membershipDetails[row.tipoMembresiaId]?.nombre ||
                        "Cargando..."}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="center">
                      {membershipDetails[row.tipoMembresiaId]?.precio
                        ? `$${membershipDetails[row.tipoMembresiaId]?.precio}`
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[3, 5, 10]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página"
            labelDisplayedRows={() => ""}
          />
          {/* Mostrar el total de los precios de todas las filas */}
          <div className="text-center md:text-right  text-customTextGreen font-bold md:text-xl p-5">
            Total de Precios (todos los registros del mes):
            <span className="text-black">
             ${totalPrice.toFixed(2)}

            </span>
          </div>
        </TableContainer>
      </Paper>
    </div>
  );
};
