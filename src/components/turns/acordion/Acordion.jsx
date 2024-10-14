import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
import { CgGym } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { Button } from "../../ui/buttons/Button";

// Recibiendo props en el componente
export const Acordion = ({ title, content, isSelected, onClick }) => {
  console.log(isSelected, "seleciiconawd");

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
              <div className="bg-green-50 rounded md:p-1 px-1 flex justify-between">
                <div className="flex flex-row-reverse items-center justify-start gap-3">
                  <span
                    key={index}
                    className="text-base md:text-lg  font-semibold border "
                  >
                    {cont}
                  </span>
                  <CgGym size={23}></CgGym>
                </div>
                <div>
                  <Button
                    label="Elegir turno"
                    className="px-[7px] py-[5px]  md:px-2 md:py-1  bg-customTextBlue text-sm md:text-lg  hover:bg-blue-600"
                  ></Button>
                </div>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
