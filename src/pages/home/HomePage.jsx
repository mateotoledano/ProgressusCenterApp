import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { useStoreUser, useStoreMenu, useStoreUserData } from "../../store";
import { useGetTurns } from "../../service/turns/use-getTurns";
import { useDataUser } from "../../service/auth/use-dataUser";
import gif from "/Progressus_G5.gif";
import { Button, Title, Footer } from "../../components";
import { Link } from "react-router-dom";
export const HomePage = () => {
  const email = useStoreUserData((state) => state.email);
  const dataUser = useStoreUserData((state) => state.userData);

  const setAllDataUser = useStoreUserData((state) => state.setUserData);
  const [turnosReservados, setTurnosReservados] = useState([]);
  const nameUser = dataUser.nombre;
  const dateTurn = "18 de octubre a las 15 hs";
  useEffect(() => {
    try {
      const dataUser = async () => {
        const data = await useDataUser(email);

        setAllDataUser(data.data);
      };
      dataUser();
    } catch (e) {
      console.log(e, "errores");
    }
    const traerTurnos = async () => {
      try {
        const response = await useGetTurns(dataUser.identityUserId);

        setTurnosReservados(response.data.value);
      } catch (error) {
        console.error("Error al traer los turnos:", error);
      }
    };
    traerTurnos();
  }, []);
  console.log(turnosReservados, "turnos reservados");

  return (
    <MainLayout>
      <div className="animate-fade-in-down w-full   flex flex-col justify-start gap-1">
        <div className="bg-white mx-3 mt-4 md:mt-0 md:m-0 md:mx-8 p-2 rounded shadow-sm">
          <Title
            title={`Hola, ${nameUser} !`}
            className={"p-4 text-center w-full justify-center md:justify-start"}
          ></Title>
        </div>
        <div className=" mx-3 md:m-0 md:mx-8 md:p-2 rounded shadow-sm flex justify-center items-center ">
          <img src={gif} className="md:w-3/5 md:py-2" alt="Progressus" />
        </div>
        {turnosReservados.length > 0 ? (
          turnosReservados.map((turno, index) => {
            const fecha = new Date(turno.fechaReserva);
            const opciones = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);
            console.log(turno, "turn");

            return (
              <div
                key={index}
                className="bg-white mx-3 md:m-0 md:mx-8 p-2 rounded shadow-sm gap-1 flex flex-col md:flex-col justify-center items-center"
              >
                <div className="flex flex-col items-center  md:flex-row  gap-1">
                  <Title title={"Tu próximo turno es el día:  "}> </Title>
                  <Title
                    className="text-customNavBar font-bold"
                    title={fechaFormateada.toUpperCase()}
                  ></Title>
                  <Title
                    className="text-customNavBar font-bold md:hidden"
                    title={`${turno.horaInicio} hs`}
                  ></Title>
                </div>
                <Title
                    className="hidden md:block text-customNavBar font-bold "
                    title={`${turno.horaInicio} hs`}
                  ></Title>
                <Link to={"/turns"}>
                  <Button
                    label={"Administrar mis turnos"}
                    className="py-1 px-2 text-sm md:text-base "
                  ></Button>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="bg-white mx-3 md:m-0 md:mx-8 p-2 rounded shadow-sm gap-1 flex md:flex-col justify-center items-center">
            <Title
              title={"No tienes turnos reservados"}
              className={"text-base"}
            ></Title>
            <Link to={"/turns"}>
              <Button
                label={"Reservar"}
                className="py-1 px-2 text-base"
              ></Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
