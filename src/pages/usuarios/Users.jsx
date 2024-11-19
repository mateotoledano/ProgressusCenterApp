import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Title , Location, TableInventary, CustomInput, SnackbarDefault} from "../../components";
import { useGetAllUsers } from "../../service/auth/use-getAllUsers"; 
import { CiSearch } from "react-icons/ci";
export const Users = () => {
    const columnsTable = ["Nombre" , "Apellido" , "Email" , "Modificar"]
    // ALERTA AL EDITAR
    const [alertEditUser, setAlertEditUser] = useState(false);
    const [errorAlertEdiIUser, setErrorAlertEditUser] = useState(false);
    // ALERTA AL ELIMINAR
    const [alertDeleteUser, setAlertDeleteUser] = useState(false);
    const [errorDeleteUser, seterrorDeleteUser] = useState(false);

    //  USERS DEL BACK
    const [users, setUsers] = useState([]);
    // ESTADO PARA EL SKELETON
    const [loading, setLoading] = useState(true);
    // BUSCAR ELEMENTO
    const [findElement, setFindElement] = useState("");
    // Lógica del buscador
    const filteredUsers = users.filter(
      (item) =>
        item.nombre && // Verificar que item.nombre no sea null o undefined
        item.nombre.toLowerCase().includes(findElement.toLowerCase())
    );
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await useGetAllUsers();
          console.log(response , "response");
          
          setUsers(response.data);
        } catch (e) {
          console.log(e, "error");
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }, []);


    const handleChange = (e) => {
      setFindElement(e.target.value);
    };
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">

          <Location
            route={`Usuarios`}
            subroute={"Gestionar usuarios"}
          ></Location>

          <Title title={"Usuarios"}></Title>

        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        {/* ////////////////////////////////////////////// */}


        <section className="p-3 mb-4">
          <div className="md:flex md:justify-end">
            <div className="md:w-2/3  md:flex md:justify-end md:items-center md:gap-5">
              <div className="bg-red-500 w-[320px]">
                <CustomInput
                  classNameInput="md:p-1.5"
                  className="border-gray-300 md:p-0"
                  Icon={CiSearch}
                  placeholder="Buscar"
                  value={findElement}
                  onChange={handleChange}
                ></CustomInput>
              </div>
              
            </div>
          </div>
        </section>
        <TableInventary
          setAlertDeleteUser={setAlertDeleteUser}
          seterrorDeleteUser={seterrorDeleteUser}
          setAlertEditUser={setAlertEditUser}
          setErrorAlertEditUser={setErrorAlertEditUser}
          setUsers={setUsers}
          users = {true}
          arreglo={filteredUsers}
          arregloColumns={columnsTable}
          loading={loading}
          textSinEjercicios={"No se encontraron usuarios.."}
        ></TableInventary>
      </section>

       
     
   
      {/* ALERT EDITAR CORRECTAMENTE EL USER*/}
      <SnackbarDefault
        open={alertEditUser}
        setOpen={setAlertEditUser}
        message={"Item editado correctamente! "}
        severity={"success"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>
      {/* ALERT ERROR EDITAR EL USER */}
      <SnackbarDefault
        open={errorAlertEdiIUser}
        setOpen={setErrorAlertEditUser}
        message={"ha ocurrido un error intentelo nuevamente! "}
        severity={"error"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>

      {/* ALERT ELIMINAR EL user */}
      <SnackbarDefault
        open={alertDeleteUser}
        setOpen={setAlertDeleteUser}
        message={"Item borrado correctamente ! "}
        severity={"info"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>

      {/* ALERT ERRoR ELIMINAR EL user */}
      <SnackbarDefault
        open={errorDeleteUser}
        setOpen={seterrorDeleteUser}
        message={"ha ocurrido un error intentelo nuevamente! "}
        severity={"error"}
        position={{ vertical: "bottom", horizontal: "left" }}
      ></SnackbarDefault>
    </MainLayout>
  );
};
