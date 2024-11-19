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
import { ModalEditInventary } from "../modalInventary/ModalEditInventary";
import { ModalDeleteInventary } from "../modalInventary/ModalDeleteInventary";
import { LoadingSkeleton } from "../../ui/skeleton/LoadingSkeleton";
import { useEffect } from "react";
import { ModalDeleteUsers } from "../../users/modalUsers/ModalDeleteUsers";
import { ModalEditUsers } from "../../users/modalUsers/ModalEditUsers";
export const TableInventary = ({
  arreglo,
  arregloColumns,
  loading,
  textSinEjercicios,
  setInventary,
  setAlertEditItem,
  setErrorAlertEditItem,
  setAlertDeleteItem,
  seterrorDeleteiItem,
  // USAR SOLO EN USERS
  users,
  setAlertDeleteUser,
  seterrorDeleteUser,
  setAlertEditUser,
  setErrorAlertEditUser,
  setUsers ,
}) => {
  // MODAL DE EDITAR ELEMENTO
  const [openEditElement, setOpenEditElement] = useState(false);
  // MODAL DE ELIMINAR ELEMENTO
  const [openDeleteElement, setOpenDeleteElement] = useState(false);
  // ESTADO PARA EL ELEMENTO A EDITAR O ELIMINAR
  const [elementEditable, setElementEditable] = useState();

  // USUARIO
  // MODAL DE EDITAR USER
  const [openEditUser, setOpenEditUser] = useState(false);
  // MODAL DE ELIMINAR USER
  const [openDeleteUser, setOpenDeleteUser] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
  // EDITAR ELEMENTO
  const editElement = (element) => {
    // llamar solo al modal user si no al de inventario
    setElementEditable(element);
    if (users) {
      setOpenEditUser(true);
    } else {
      setOpenEditElement(true);
    }
  };
  // ELIMINAR ELEMENTO
  const deleteElement = (element) => {
    // llamar solo al modal user si no al de inventario
    setElementEditable(element);
    if (users) {
      setOpenDeleteUser(true);
    } else {
      setOpenDeleteElement(true);
    }
  };
  console.log(elementEditable, "elemento a editar");

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
                        column === "Modificar"
                          ? "right"
                          : column === "Estado"
                          ? "center"
                          : column === "Email"
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
                      height={users ? 30 : 55}
                      count={10}
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
              ) : users ? (
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
                      {element.nombre}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {element.apellido}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "16px",
                        fontWeight: "semibold",
                        color:
                          element.estado === "Correcto" ? "#5B8C00" : "red",
                      }}
                      align="center"
                    >
                      {element.email}
                    </TableCell>

                    <TableCell sx={{ fontSize: "16px" }} align="right">
                      <div className="flex justify-end gap-[22px]">
                        {/* EDITAR ELEMENTO */}
                        <div
                          onClick={() => editElement(element)}
                          className="p-[3px] bg-customTextBlue hover:bg-blue-700 rounded cursor-pointer"
                        >
                          <MdOutlineEdit className="text-white text-xl"></MdOutlineEdit>
                        </div>

                        {/* ELIMINAR ELEMENTO */}
                        <div
                          onClick={() => deleteElement(element)}
                          className="p-[3px] bg-red-600 hover:bg-red-800 rounded  cursor-pointer"
                        >
                          <MdDeleteOutline className="text-white text-xl"></MdDeleteOutline>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
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
                      #{element.id}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {element.nombre}
                    </TableCell>
                    <TableCell sx={{ fontSize: "16px" }} align="left">
                      {element.descripcion}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "16px",
                        fontWeight: "semibold",
                        color:
                          element.estado === "Correcto" ? "#5B8C00" : "red",
                      }}
                      align="center"
                    >
                      {element.estado}
                    </TableCell>

                    <TableCell sx={{ fontSize: "16px" }} align="right">
                      <div className="flex justify-end gap-[22px]">
                        {/* EDITAR ELEMENTO */}
                        <div
                          onClick={() => editElement(element)}
                          className="p-[3px] bg-customTextBlue hover:bg-blue-700 rounded cursor-pointer"
                        >
                          <MdOutlineEdit className="text-white text-xl"></MdOutlineEdit>
                        </div>

                        {/* ELIMINAR ELEMENTO */}
                        <div
                          onClick={() => deleteElement(element)}
                          className="p-[3px] bg-red-600 hover:bg-red-800 rounded  cursor-pointer"
                        >
                          <MdDeleteOutline className="text-white text-xl"></MdDeleteOutline>
                        </div>
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
      {/* MODAL EDITAR ELEMENT */}
      <ModalEditInventary
        setInventary={setInventary}
        elementEditable={elementEditable}
        openEditElement={openEditElement}
        setOpenEditElement={setOpenEditElement}
        setAlertEditItem={setAlertEditItem}
        setErrorAlertEditItem={setErrorAlertEditItem}
      ></ModalEditInventary>
      {/* MODAL ELIMINAR ELEMENT */}
      <ModalDeleteInventary
        setAlertDeleteItem={setAlertDeleteItem}
        seterrorDeleteiItem={seterrorDeleteiItem}
        setInventary={setInventary}
        elementEditable={elementEditable}
        openDeleteElement={openDeleteElement}
        setOpenDeleteElement={setOpenDeleteElement}
      ></ModalDeleteInventary>

      {/* USUARIOS */}
       {/* MODAL EDITAR User */}
       <ModalEditUsers
        setInventary={setUsers}
        elementEditable={elementEditable}
        openEditElement={openEditUser}
        setOpenEditElement={setOpenEditUser}
        setAlertEditItem={setAlertEditUser}
        setErrorAlertEditItem={setErrorAlertEditUser}
      ></ModalEditUsers>
      {/* MODAL ELIMINAR USER*/}
      <ModalDeleteUsers
        setAlertDeleteItem={setAlertDeleteUser}
        seterrorDeleteiItem={seterrorDeleteUser}
        setInventary={setUsers}
        elementEditable={elementEditable}
        openDeleteElement={openDeleteUser}
        setOpenDeleteElement={setOpenDeleteUser}
      ></ModalDeleteUsers>
    </>
  );
};
