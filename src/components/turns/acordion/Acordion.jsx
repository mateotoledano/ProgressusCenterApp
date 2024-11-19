import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { ModalTurns } from "../modalTurns/ModalTurns";
import { useTraerTurnosPorHora } from "../../../service/turns/useTraerTurnosPorHora";
import { useEffect } from "react";

// Recibiendo props en el componente
export const Acordion = ({
  title,
  content,
  onClick,
  setOpenAlert,
  setOpenAlertError,
  turnosReservados,
  setTurnosReservados,
  setAlertHoraError,
}) => {
  const [reservasPorHora, setReservasPorHora] = React.useState({});
  const [open, setOpen] = React.useState(false);

  // MANEJO DE HORARIOS
  const [horaInicio, setHorario] = React.useState("");
  const [horaFinal, setHoraFinal] = React.useState("");

  // Obtener la fecha actual en el formato YYYY-MM-DD
  const obtenerFechaActual = () => {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fecha = obtenerFechaActual();
  console.log(turnosReservados, "turnosReservados");

  // TRAER RESERVAS POR HORA
  const fetchReservas = async (hora) => {
    try {
      const response = await useTraerTurnosPorHora(fecha, `${hora}:00`);
      console.log(response, "respondesee");

      const cantidadReservada = response ? response.data.length : 0; // Ajusta `cantidad` según la respuesta real de la API

      setReservasPorHora((prev) => ({
        ...prev,
        [hora]: cantidadReservada,
      }));
    } catch (error) {
      console.log("Error al traer los turnos reservados", error);
    }
  };

  useEffect(() => {
    content.forEach((hora) => fetchReservas(hora));
  }, [content, fecha]);

  const onChangeHora = (cont, index) => {
    setHorario(cont);

    // Verificar si es la última hora del turno
    if (index === content.length - 1) {
      const [hours, minutes] = cont.split(":");
      const nextHour = `${String(parseInt(hours) + 1).padStart(
        2,
        "0"
      )}:${minutes}`;
      setHoraFinal(nextHour);
    } else {
      setHoraFinal(content[index + 1]);
    }

    setOpen(true);
  };

  // Función para comparar la hora en formato HH:mm
  const formatHora = (hora) => {
    return hora.substring(0, 5); // Retorna solo la parte HH:mm
  };

  // Función para verificar si la hora del botón está reservada
  const isHoraReservada = (hora) => {
    const horaFormateada = formatHora(hora); // Formatear la hora para compararla
    // Verificar si alguno de los turnos reservados tiene la misma hora
    return turnosReservados.some(
      (turno) => formatHora(turno.horaInicio) === horaFormateada
    );
  };

  return (
    <div className="w-full">
      <Accordion>
        <AccordionSummary
          expandIcon={<IoIosArrowDown className="text-customTextBlue" />}
          aria-controls="panel-content"
          id="panel-header"
          onClick={onClick}
        >
          <div className="flex items-center gap-3">
            <IoSettingsOutline size={22} className="text-customTextBlue" />
            <h2 className="text-base md:text-lg font-semibold">{title}</h2>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-5">
            {content.map((cont, index) => {
              // Verificar si la hora está reservada
              const isDisabled = isHoraReservada(cont);

              return (
                <button
                  key={cont}
                  className={`bg-green-50 rounded-lg md:p-2 p-2 px-1 flex justify-between cursor-pointer hover:bg-customNavBar hover:text-white transition-all ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !isDisabled && onChangeHora(cont, index)} 
                  disabled={isDisabled}
                >
                  <div className="flex flex-row-reverse items-center justify-start gap-3">
                    <span className="text-base md:text-lg font-semibold">
                      {`${cont} hs`}
                    </span>
                    <CgGym size={24} />
                  </div>
                  <span className="font-semibold">
                    {reservasPorHora[cont] || 0}/40
                  </span>
                </button>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
      <ModalTurns
        turnosReservados={turnosReservados}
        setTurnosReservados={setTurnosReservados}
        setOpenAlert={setOpenAlert}
        setOpenAlertError={setOpenAlertError}
        open={open}
        setOpen={setOpen}
        horaInicio={horaInicio}
        horaFinal={horaFinal}
        setAlertHoraError={setAlertHoraError}
      />
    </div>
  );
};
