import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { useStoreUserData } from "../../store";
import { useGetTurns } from "../../service/turns/use-getTurns";
import { useDataUser } from "../../service/auth/use-dataUser";
import gif from "/Progressus_G5.gif";
import { Button, Title, Footer, LoadingSkeleton } from "../../components";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const email = useStoreUserData((state) => state.email);
  const dataUser = useStoreUserData((state) => state.userData);
  const setAllDataUser = useStoreUserData((state) => state.setUserData);
  const [turnosReservados, setTurnosReservados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const nameUser = dataUser.nombre;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await useDataUser(email);
        setAllDataUser(userResponse.data);

        if (userResponse.data.identityUserId) {
          const turnsResponse = await useGetTurns(
            userResponse.data.identityUserId
          );
          setTurnosReservados(turnsResponse.data.value);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [email, setAllDataUser]);

  return (
    <MainLayout>
      <div className="animate-fade-in-down w-full flex flex-col justify-start gap-1">
        <div className="bg-white mx-3 mt-4 md:mt-0 md:m-0 md:mx-8 p-2 rounded shadow-sm">
          <Title
            title={`Hola, ${nameUser || "Usuario"} !`}
            className="p-4 text-center w-full justify-center md:justify-start"
          />
        </div>

        <div className="mx-3 md:m-0 md:mx-8 md:p-2 rounded shadow-sm flex justify-center items-center">
          <img
            src={gif}
            className={`md:py-2 ${
              dataUser && dataUser.email === "frantrainer15@gmail.com"
                ? "md:w-4/5"
                : "md:w-3/5"
            }`}
            alt="Progressus"
          />
        </div>

        {isLoading ? (
          <LoadingSkeleton
            className={"w-full"}
            count={1}
            width={800}
            height={50}
          /> // Mostrar Skeleton mientras carga
        ) : turnosReservados.length > 0 ? (
          turnosReservados.map((turno, index) => {
            const fecha = new Date(turno.fechaReserva);
            const opciones = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);

            return (
              <div
                key={index}
                className="bg-white mx-3 md:m-0 md:mx-8 p-2 rounded shadow-sm gap-1 flex flex-col md:flex-col justify-center items-center"
              >
                <div className="flex flex-col items-center md:flex-row gap-1">
                  <Title title={"Tu próximo turno es el día: "} />
                  <Title
                    className="text-customNavBar font-bold"
                    title={fechaFormateada.toUpperCase()}
                  />
                  <Title
                    className="text-customNavBar font-bold md:hidden"
                    title={`${turno.horaInicio} hs`}
                  />
                </div>
                <Title
                  className="hidden md:block text-customNavBar font-bold"
                  title={`${turno.horaInicio} hs`}
                />
                <Link to={"/turns"}>
                  <Button
                    label={"Administrar mis turnos"}
                    className="py-1 px-2 text-sm md:text-base"
                  />
                </Link>
              </div>
            );
          })
        ) : (
          dataUser.email !== "frantrainer15@gmail.com" &&
          turnosReservados &&
          dataUser && (
            <div className="bg-white mx-3 md:m-0 md:mx-8 p-2 rounded shadow-sm gap-1 flex md:flex-col justify-center items-center">
              <Title
                title={"No tienes turnos reservados"}
                className="text-base"
              />
              <Link to={"/turns"}>
                <Button label={"Reservar"} className="py-1 px-2 text-base" />
              </Link>
            </div>
          )
        )}
      </div>
    </MainLayout>
  );
};
