import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import {
  Acordion,
  Alert,
  Button,
  Location,
  Stack,
  Title,
  GridAlertsTurns,
} from "../../components";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { CgDanger } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";

import { FaRegCalendarCheck } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { useGetTurns } from "../../service/turns/use-getTurns";
import { useDeleteTurns } from "../../service/turns/use-deleteTurn";
import { useSpinnerStore, useStoreUserData } from "../../store";
dayjs.locale("es");

export const Turns = () => {
  const turnos = [
    {
      title: "Turno Mañana",
      horarios: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"],
    },
    {
      title: "Turno Tarde",
      horarios: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
    },
    {
      title: "Turno Noche",
      horarios: ["19:00", "20:00", "21:00", "22:00"],
    },
  ];
  const dataUser = useStoreUserData((state) => state.userData);
  const [turnosReservados, setTurnosReservados] = useState([]);

  // SPINNER LOGIN
  const { showSpinner, hideSpinner } = useSpinnerStore();
  // DIA FROMATEADO
  const today = dayjs().format("dddd, D [de] MMMM [de] YYYY");
  // ALERT AL ELMINAR RESERVA
  const [alertDelete, setAlertDelete] = useState(false);
  // MANEJO DEL ALERT AL RESERVAR TURNO
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertError, setOpenAlertError] = useState(false);
  // ALERTA AL SELECCIONAR HORA ANTES DE LA ACTUAL
  const [alertHoraError, setAlertHoraError] = useState(false);
  //ALERT PARA NO RESERVAR DOS VECES EL MISMO HORARIO
  const [alertDuplicatedTurn, setAlertDuplicatedTurn] = useState(false);
  useEffect(() => {
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

  const handleDeleteTurn = async () => {
    showSpinner();
    try {
      const response = await useDeleteTurns(dataUser.identityUserId);
      if (response.status == "200") {
        setAlertDelete(true);

        // Esperar a que la alerta se cierre antes de actualizar los turnos
        const updatedTurns = await useGetTurns(dataUser.identityUserId);
        setTurnosReservados(updatedTurns.data.value);
      }
    } catch (e) {
      console.log(e);
    } finally {
      hideSpinner();
    }
  };

  return (
    <MainLayout>
      <section className="animate-fade-in-down bg-white md:mx-auto   rounded shadow-xl w-full md:w-11/12 p-4 overflow-hidden mb-20">
        <section className="w-full md:flex items-start md:mt-0 gap-0  ">
          <div className="flex flex-col md:border-r  md:pr-5 items-center justify-center gap-4 w-full mt-0 md:w-1/4 ">
            <div className="flex flex-col w-full justify-center md:items-start md:gap-3">
              <Location
                route={"Turnos"}
                subroute={"Reservar Turnos"}
              ></Location>
              <Title title={"Reserva tu turno"}></Title>
              <span className="text-customTextBlue text-base md:text-xl font-medium">
                {today}
              </span>
            </div>
            {turnos.map((turno, index) => (
              <Acordion
                setAlertDuplicatedTurn={setAlertDuplicatedTurn}
                setAlertHoraError={setAlertHoraError}
                openAlert={openAlert}
                openAlertError={openAlertError}
                // PARA ACTUALIZAR TURNOS RESERVADOS
                setTurnosReservados={setTurnosReservados}
                turnosReservados={turnosReservados}
                //////////////////////
                setOpenAlert={setOpenAlert}
                setOpenAlertError={setOpenAlertError}
                key={index}
                title={turno.title}
                content={turno.horarios}
              />
            ))}
          </div>
          <section className="md:w-3/4  md:px-4  ">
            <div className="md:mt-0 mt-3 flex w-full gap-5 flex-col justify-center items-center">
              <Title
                className={""}
                title={"Mis turnos"}
                icon={<IoIosTimer />}
              ></Title>
              {turnosReservados.length > 0 ? (
                turnosReservados.map((turn) => {
                  const fechaReserva = turn.fechaReserva.split("T")[0];

                  const [year, month, day] = fechaReserva.split("-");
                  const fechaFormateada = `${day}-${month}-${year}`; // Formato '07-11-2024'

                  const fechaObj = new Date(year, month - 1, day); // Los meses en JavaScript son de 0 a 11

                  const diasSemana = [
                    "Domingo",
                    "Lunes",
                    "Martes",
                    "Miércoles",
                    "Jueves",
                    "Viernes",
                    "Sábado",
                  ];
                  const diaSemana = diasSemana[fechaObj.getDay()];

                  // Extraer solo la hora y los minutos de 'horaInicio' y 'horaFin'
                  const horaInicioFormateada = turn.horaInicio.substring(0, 5); // "07:00"
                  const horaFinFormateada = turn.horaFin.substring(0, 5); // "08:00"

                  // pasamos la hora a num
                  const hora = parseInt(turn.horaInicio.split(":")[0], 10);

                  //  título según la hora
                  let tituloTurno = "";
                  if (hora >= 6 && hora < 12) {
                    tituloTurno = "Turno mañana";
                  } else if (hora >= 12 && hora < 18) {
                    tituloTurno = "Turno tarde";
                  } else {
                    tituloTurno = "Turno noche";
                  }

                  return (
                    <Stack
                      key={turn.id}
                      titulo={tituloTurno}
                      duracion={`${horaInicioFormateada} hs - ${horaFinFormateada} hs`}
                      fechaFinalizacion={`${diaSemana}, ${fechaFormateada}`}
                    ></Stack>
                  );
                })
              ) : (
                <Stack
                  Icon={CgDanger}
                  titulo={"No tienes turnos reservados"}
                ></Stack>
              )}
              {turnosReservados.length > 0 && (
                <div className="w-full flex justify-end">
                  <Button
                    onClick={handleDeleteTurn}
                    Icon={MdDeleteOutline}
                    className="px-[6px] py-[3px] flex items-center gap-1 bg-red-600 hover:bg-red-700 text-sm md:text-base"
                    label={`${
                      turnosReservados.length == 1
                        ? `Eliminar turno`
                        : `Eliminar Turnos`
                    }`}
                  ></Button>
                </div>
              )}
            </div>
          </section>
        </section>
      </section>
      {/* ALERTAS AL GUARDAR , ELIMINAR , TURNO NO DISPONIBLE Y TURNO DUPLICADO */}

      <GridAlertsTurns
        setAlertDelete={setAlertDelete}
        alertDelete={alertDelete}
        openAlert={openAlert}
        openAlertError={openAlertError}
        alertHoraError={alertHoraError}
        setAlertHoraError={setAlertHoraError}
        alertDuplicatedTurn={alertDuplicatedTurn}
        setAlertDuplicatedTurn={setAlertDuplicatedTurn}
      ></GridAlertsTurns>
    </MainLayout>
  );
};
