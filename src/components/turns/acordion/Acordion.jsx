import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { ModalTurns } from "../modalTurns/ModalTurns";
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
  setAlertDuplicatedTurn,
}) => {
  const [open, setOpen] = React.useState(false);

  // MANEJO DE HORARIOS
  const [horaInicio, setHorario] = React.useState("");
  const [horaFinal, setHoraFinal] = React.useState("");

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

  return (
    <div className="w-full">
      {/* Cambiamos el fondo según si está seleccionado o no */}
      <Accordion>
        <AccordionSummary
          expandIcon={<IoIosArrowDown className="text-customTextBlue" />}
          aria-controls="panel-content"
          id="panel-header"
          onClick={onClick}
        >
          <div className="flex items-center gap-3">
            <IoSettingsOutline size={22} className="text-customTextBlue" />
            <h2 className="text-base md:text-lg font-semibold">{title} </h2>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-5">
            {content.map((cont, index) => (
              <div
                key={cont}
                className="bg-green-50 rounded-lg md:p-2 p-2 px-1 flex justify-between cursor-pointer hover:bg-customNavBar hover:text-white transition-all"
                onClick={() => onChangeHora(cont, index)}
              >
                <div className="flex flex-row-reverse items-center justify-start gap-3">
                  <span
                    key={index}
                    className="text-base md:text-lg  font-semibold  "
                  >
                    {cont}
                  </span>
                  <CgGym size={24}></CgGym>
                </div>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      <ModalTurns
        setAlertDuplicatedTurn={setAlertDuplicatedTurn}
        turnosReservados={turnosReservados}
        setTurnosReservados={setTurnosReservados}
        setOpenAlert={setOpenAlert}
        setOpenAlertError={setOpenAlertError}
        open={open}
        setOpen={setOpen}
        horaInicio={horaInicio}
        horaFinal={horaFinal}
        setAlertHoraError={setAlertHoraError}
      ></ModalTurns>
    </div>
  );
};
