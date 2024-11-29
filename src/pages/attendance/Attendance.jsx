import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { useSpinnerStore } from "../../store";
import {
  ButtonSpinner,
  SelectNavegable,
  SnackbarDefault,
  Title,
  Location
} from "../../components";
import { useGetAllUsers } from "../../service/auth/use-getAllUsers";
import { useSendAsist } from "../../service/users/useSendAsist";

export const Attendance = () => {
  const [userAsistencia, setUserAsistencia] = useState("");
  const [confirmAsist, setConfirmAsist] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [users, setUsers] = useState([]);
  const [cancelAsist, setCacnelAsist] = useState(false);
  const showSpinner = useSpinnerStore((state) => state.showSpinner);
  const hideSpinner = useSpinnerStore((state) => state.hideSpinner);
  // BUSCAR ELEMENTO
  const [findElement, setFindElement] = useState("");

  useEffect(() => {
    showSpinner();
    const fetchUsers = async () => {
      try {
        const response = await useGetAllUsers();
        const socios = response.data.filter((user) =>
            user.roles.includes("SOCIO")
          );
    
        setUsers(socios);
      } catch (e) {
        console.log(e, "error");
      } finally {
        hideSpinner();
      }
    };
    fetchUsers();
  }, []);

  // CANCELAR ASISTENCIA
  const cancelAsistencia = () => {
    setCacnelAsist(true); // Mostrar el spinner
    setTimeout(() => {
      setUserAsistencia(""); // Cancelar la asistencia
      setCacnelAsist(false); // Ocultar el spinner
    }, 1000); // 2 segundos
  };
  // ACEPTAR ASISTENCIA
  const sendAsistencia = async () => {
    setConfirmAsist(true);

    try {
      const responseSendAsist = await useSendAsist(
        userAsistencia.identityUserId
      );
      console.log(responseSendAsist, "response send");
      if (responseSendAsist && responseSendAsist.status == 200) {
        setAlertSuccess(true);
        setTimeout(() => {
          setUserAsistencia("");
        }, 500);
      } else {
        setAlertError(true);
      }
    } catch (e) {
      console.log(e, "errorrrrs");
    } finally {
      setConfirmAsist(false);
    }
  };
  return (
    <MainLayout>
      {/* REGISTRAR ASISTENCIA */}
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location
            route={`Asistencia`}
            subroute={"Marcar asistencia"}
          ></Location>

          <Title title={"Registrar asistencia"}></Title>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        {/* ////////////////////////////////////////////// */}
        <div className="flex flex-col mt-3 gap-5 w-full   justify-center items-center">
          <SelectNavegable
            label={"Elegir usuario"}
            options={users}
            onSelect={setUserAsistencia}
          ></SelectNavegable>
          <div className=" mb-8 flex flex-col justify-center items-center py-4 gap-3 mx-16 rounded">
            <div className="flex justify-center flex-col">
              <Title
                className={"text-customTextBlue w-full text-center "}
                title={
                  userAsistencia && userAsistencia.nombre
                    ? userAsistencia.nombre + " " + userAsistencia.apellido
                    : `Usuario...`
                }
              ></Title>
              <span className="text-center text-gray-600 text-base">
                {userAsistencia && userAsistencia.email
                  ? userAsistencia.email
                  : ""}
              </span>
            </div>
            <img
              className=" w-3/4 md:w-1/2"
              src="https://th.bing.com/th/id/OIP.xHh0kvbL7QYHxwJrvVjIZAHaHa?rs=1&pid=ImgDetMain"
              alt=""
            />
            <div className="flex w-full flex-col md:flex-row items-center md:gap-12 md:justify-beetwen md:mx-8">
              <ButtonSpinner
                label="Confirmar Asistencia"
                onClick={sendAsistencia}
                loading={confirmAsist}
                className="w-3/4 md:w-1/2"
              ></ButtonSpinner>
              <ButtonSpinner
                onClick={cancelAsistencia}
                label="Cancelar"
                className="w-3/4 md:w-1/2 bg-red-700"
                loading={cancelAsist}
              ></ButtonSpinner>
            </div>
          </div>
        </div>
      </section>

      {/* ALERT ERRORR!! CONFIRMAR ASISTENCIA */}
      <SnackbarDefault
        message={
          "No se encontró ninguna reserva válida para este usuario en el horario actual."
        }
        open={alertError}
        setOpen={setAlertError}
        severity={"warning"}
      ></SnackbarDefault>

      {/* ALERT success  CONFIRMAR ASISTENCIA */}
      <SnackbarDefault
        message={"Asistencia confirmada correctamente !"}
        open={alertSuccess}
        setOpen={setAlertSuccess}
        severity={"success"}
      ></SnackbarDefault>
    </MainLayout>
  );
};
