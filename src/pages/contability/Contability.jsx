import React, { useEffect, useState, useMemo } from "react";
import { MainLayout } from "../../layout/MainLayout";
import {
  ButtonSpinner,
  Location,
  TableContability,
  Title,
  DatePickerr,
} from "../../components";
import { PiPiggyBankDuotone } from "react-icons/pi";
import { FaRegFilePdf } from "react-icons/fa6";
import { useGetContability } from "../../service/contability/useGetContability";
import dayjs from "dayjs";

export const Contability = () => {
  const [contability, setContability] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM"));
  const [filteredData, setFilteredData] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  const minDate = dayjs("2020-01-01");
  const maxDate = dayjs().endOf("year");

  useEffect(() => {
    const fetchContability = async () => {
      try {
        const responseContability = await useGetContability();
        if (responseContability && responseContability.status === 200) {
          setContability(responseContability.data);
        }
      } catch (e) {
        console.log(e, "error");
      } finally {
        setSkeleton(false);
      }
    };
    fetchContability();
  }, []);

  // Filtrar los datos basados en el mes y año seleccionado
  useEffect(() => {
    const filtered = contability.filter((item) => {
      const itemMonthYear = dayjs(item.fechaPago).format("YYYY-MM");
      return itemMonthYear === selectedDate;
    });
    setFilteredData(filtered);
  }, [contability, selectedDate]); // Refiltrar cuando los datos de contabilidad o el mes/año seleccionados cambian

  const columns = ["Nombre", "Fecha", "Descripcion", "Monto"];

  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          {/* HARDCODE */}
          <Location route={`Contabilidad`} subroute={"Reportes"}></Location>
          <Title title={"Contabilidad"}></Title>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        <section className="p-3 mb-4">
          <div className="flex w-full justify-between flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1 md:gap-3">
              <Title title={"Pagos en efectivo del ultimo mes"}></Title>
              <PiPiggyBankDuotone className="text-xl md:text-3xl"></PiPiggyBankDuotone>
            </div>
            <div className=" hidden md:block">
              <ButtonSpinner
                className="flex items-center justify-between gap-3 w-full"
                label="Descargar PDF"
                Icon={FaRegFilePdf}
              ></ButtonSpinner>
            </div>
          </div>
        </section>

        <div className="w-full p-3 flex flex-col gap-5">
          <div className="w-1/2 md:w-1/3">
            <DatePickerr
              label="Seleccionar año y mes"
              minDate={minDate}
              maxDate={maxDate}
              selectedDate={selectedDate}
              setSelectedDate={(date) => {
                // Al seleccionar una fecha, guardamos solo el mes y el año
                setSelectedDate(dayjs(date).format("YYYY-MM"));
              }}
            ></DatePickerr>
          </div>
        </div>

        {/* Pasamos los datos filtrados al componente TableContability */}
        <TableContability
          loading={skeleton}
          data={filteredData}
          columns={columns}
        ></TableContability>
        <div className=" mt-3 block p-3 md:hidden ">
          <ButtonSpinner
            className="flex items-center justify-between gap-3"
            label="Descargar PDF"
            Icon={FaRegFilePdf}
          ></ButtonSpinner>
        </div>
      </section>
    </MainLayout>
  );
};
