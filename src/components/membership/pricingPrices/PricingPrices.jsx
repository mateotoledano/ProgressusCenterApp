import React, { useEffect, useState } from "react";
import gym from "/gym.svg";
import { CgGym } from "react-icons/cg";

import { useGetAllUsers } from "../../../service/auth/use-getAllUsers";
import { useGetMemberships } from "../../../service/membership/useGetMembership";
import { useCreateRequestPayment } from "../../../service/membership/useCreateRequestPayment";
import { LoadingSkeleton } from "../../ui/skeleton/LoadingSkeleton";
import { ModalAceptPayment } from "../modalAceptPaymen/ModalAceptPayment";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useSpinnerStore, useStoreUserData } from "../../../store";
import { useRegisterPayment } from "../../../service/membership/useRegisterPayment";
import { Alert } from "../../ui/alert/Alert";
import { useGetRequestPaymentSocio } from "../../../service/membership/useGetRequestPaymentSocio";
import { useCancelRequestPayment } from "../../../service/membership/useCancelRequestPayment";

import { Stack } from "../../ui/stack/Stack";
import { SelectNavegable } from "../selectNavegable/SelectNavegable";

import { ButtonSpinner } from "../../ui/buttons/ButtonSpinner";
import { TablePagos } from "../tablePagos/TablePagos";
import { Title } from "../../ui/title/Title";
const arregloColumns = ["Membresia", "Fecha", "Precio"];
const arregloRows = [
  {
    membresia: "Anual",
    fecha: "2024-01-01",
    precio: "$12000",
  },
  {
    membresia: "Semestral",
    fecha: "2024-01-01",
    precio: "$7000",
  },
  {
    membresia: "Mensual",
    fecha: "2024-01-01",
    precio: "$1500",
  },
  {
    membresia: "Trimestral",
    fecha: "2024-01-01",
    precio: "$4000",
  },
];

export const PricingPrices = ({
  setMesaggePlanElegido,
  setAlertConfirmRequest,
  setAlertCancelPayment,
  setAlertError,
  setAlertPlanElegido,
}) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useStoreUserData((state) => state.userData);
  const [dataPedido, setDataPedido] = useState(null);
  // ROL DE USER

  const roleUser = userData.roles[0];
  //PLANES QUE AGREGAR EL DE LA VENTANILLA
  const [planElegido, setPlanElegido] = useState(null);

  // Buscador de user
  const [allUsers, setAllUsers] = useState([]);
  const [dataUserBuscado, setDataUserBuscado] = useState(null);
  //  MODAL PARA CONFIRMAR PAGO
  const [openModal, setOpenModal] = useState(false);
  // CONFIGURAR FECHA PARA MOSTRAR EN EL STACK PANTALLA DE ADMIN
  const fechaHora = dataPedido?.fechaCreacion;
  // LOADER AL REALIZAR LA SOLICITUD
  const [loadingRequest, setLoadingRequest] = useState(false);
  const fecha = fechaHora ? new Date(fechaHora).toLocaleDateString() : "";
  const hora = fechaHora ? new Date(fechaHora).toLocaleTimeString() : "";
  // LOADING DEL TABLE
  const [loadingTable, setLoadingTable] = useState(false);
  // SPINNER HASTA QUE TRAIGAN TODOS LOS USERA
  const openSppiner = useSpinnerStore((state) => state.showSpinner);
  const closeSpinner = useSpinnerStore((state) => state.hideSpinner);
  // TRAER MEMBRESIAS

  useEffect(() => {
    const traerTodosLosUsers = async () => {
      openSppiner();
      try {
        const response = await useGetAllUsers();
        setAllUsers(response.data);
      } catch (e) {
        console.log(e, "errores");
      } finally {
        closeSpinner();
      }
    };
    const traerMembresias = async () => {
      try {
        const response = await useGetMemberships();

        setCards(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e, "errores");
        setLoading(false);
      }
    };
    traerMembresias();
    traerTodosLosUsers();
  }, []);

  // useEffect para traer dataPedido cuando cambia dataUserBuscado
  useEffect(() => {
    const traerDataPedido = async () => {
      setLoadingTable(true);
      if (!dataUserBuscado || !dataUserBuscado.identityUserId) return;

      try {
        const requestPayment = await useGetRequestPaymentSocio(
          dataUserBuscado.identityUserId
        );

        if (requestPayment?.data?.value?.value) {
          setDataPedido(
            requestPayment.data.value.value.historialSolicitudDePagos
          );
        } else {
          setDataPedido(null);
        }
      } catch (e) {
        console.log(e, "Error al traer dataPedido");
        setDataPedido(null);
      } finally {
        setLoadingTable(false);
      }
    };

    traerDataPedido();
  }, [dataUserBuscado]); // Se ejecuta cada vez que cambia dataUserBuscado

  // ENVIAR SOLICITUD DE PAGO
  const handleBuy = async (membresiaId, tipoDePagoId, idUser) => {
    setLoadingRequest(true);

    try {
      const response = await useCreateRequestPayment(
        membresiaId,
        tipoDePagoId,
        idUser
      );

      if (response && response.status === 200) {
        setOpenModal(true);
      } else {
        setAlertError(true);
      }
    } catch (error) {
      console.error("Error en lenviar la solicitud de pago", error);
    } finally {
      setLoadingRequest(false);
    }
  };

  // CANCELAR SOLICITUD DE PAGO DEL LADO DE VENTANILLA
  const handleCancelRequest = async () => {
    setAlertCancelPayment(true);
    setPlanElegido(null);
    setDataUserBuscado(null);

    // try {

    //   const requestPayment = await useGetRequestPaymentSocio(
    //     dataUserBuscado.identityUserId
    //   );

    //   const cancelPayment = await useCancelRequestPayment(
    //     requestPayment.data.value.value.id
    //   );

    //   if (cancelPayment.status === 200) {
    //     console.log("enteraaaa");
    //     setAlertCancelPayment(true);
    //     setPlanElegido(null);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };
  const elegirPlan = (card) => {
    setPlanElegido(card);
    setAlertPlanElegido(true);
    setMesaggePlanElegido(card.nombre);
  };
  console.log(allUsers , "allusers");
  
  return (
    <div
      className={`flex flex-col flex-wrap justify-center items-start md:items-start md:justify-around ${
        dataUserBuscado !== null ? "gap-0" : "gap-4"
      } md:gap-5 md:flex-row w-full  `}
    >
      {loading ? (
        <LoadingSkeleton
          variant="rectangular"
          className={"w-full "}
          count={4}
          width={400}
          height={300}
        />
      ) : (
        cards.map((card) => {
          return (
            <div
              key={card.id}
              className=" md:m-5 p-0 md:p-0 w-full my-5 md:w-1/3 md:my-4 transition duration-300 transform hover:scale-105 "
            >
              <div className="relative group ">
                <div className="absolute -inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-top justify-start space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {card.nombre}
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-gray-900">
                    ${card.precio}
                    <span className="text-lg font-normal text-gray-600"></span>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center text-start text-sm">
                      <svg
                        className="w-5 h-5 text-customTextBlue mr-2 flex-shriFnk-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {card.descripcion}
                    </li>
                  </ul>
                  {roleUser === "ADMIN" ? (
                    <button
                      onClick={() => elegirPlan(card)}
                      className="w-full py-3 font-bold text-white bg-customTextGreen rounded-lg"
                    >
                      Agregar Plan
                    </button>
                  ) : (
                    <></>
                  )}
                  {card.id == 3 && (
                    <div className="absolute -top-16 right-0 -mt-4 -mr-6 w-16 h-16 float-animation">
                      <CgGym className="w-full h-full object-cover rounded-full " />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
      {roleUser === "ADMIN" &&
        (planElegido ? (
          <div className="flex flex-col md:mx-5 px-2 md:px-0 items-center justify-center w-full">
            <label
              htmlFor=""
              className="text-xl mb-3  text-customTextGreen font-semibold"
            >
              Membresia seleccionada
            </label>
            <Stack
              className={"w-full   md:w-full md:m-5"}
              titulo={planElegido.nombre}
              duracion={`${planElegido.mesesDuracion} meses `}
              fechaFinalizacion={`$ ${planElegido.precio}`}
              classNameText={"md:text-3xl text-customGreenNavBar"}
            ></Stack>
          </div>
        ) : (
          <div className="flex flex-col md:mx-5 px-2 md:px-0 items-center justify-center w-full">
            <label
              htmlFor=""
              className="text-xl mb-3 text-customTextGreen  font-semibold"
            >
              Membresia seleccionada
            </label>
            <Stack
              className={"w-full   md:w-full md:m-5"}
              titulo={"Ningun plan elegido"}
            ></Stack>
          </div>
        ))}

      {roleUser === "ADMIN" && (
        <div className=" w-full h-2 md:h-4 bg-customGray "></div>
      )}
      {/*BUTTON PARA REGISTRAR PAGO DEL LADO DEL QUE ATIENDE EL GYM */}
      {/* HARDCODE  */}
      {roleUser === "ADMIN" && (
        <div className="w-full justify-center md:px-5">
          <div className="w-full flex justify-center mb-7">
            <label
              htmlFor=""
              className="text-xl text-end  text-customTextGreen font-semibold"
            >
              Dar de alta
            </label>
          </div>
          <section className="flex flex-col gap-6 items-center justify-center">
            <div className="w-full flex-col md:flex-row flex justify-between items-center mt-0  gap-4  ">
              <div className="flex flex-col mb-1 md:flex-row md:items-center gap-4">
                <label htmlFor="" className="md:text-xl font-semibold">
                  Nombre del cliente :{" "}
                </label>
                <div className="flex item gap-2">
                  <SelectNavegable
                    label={"Seleccione un cliente"}
                    options={allUsers}
                    onSelect={setDataUserBuscado}
                  ></SelectNavegable>
                </div>
              </div>
              {planElegido && dataUserBuscado && (
                <div className="flex gap-14 md:gap-8 ">
                  <ButtonSpinner
                    loading={loadingRequest}
                    onClick={() =>
                      handleBuy(
                        planElegido.id,
                        1,
                        dataUserBuscado.identityUserId
                      )
                    }
                    label={"Aceptar pago"}
                  ></ButtonSpinner>
                  <ButtonSpinner
                    onClick={handleCancelRequest}
                    className="bg-gray-600"
                    label={"Cancelar "}
                  ></ButtonSpinner>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
      {roleUser === "ADMIN" && (
        <div className=" w-full h-2 md:h-4 bg-customGray "></div>
      )}
      {roleUser === "ADMIN" && (
        <div className="flex px-5 w-full justify-start md:items-start items-center flex-col ">
          {dataUserBuscado && roleUser === "ADMIN" ? (
            <>
              <section className="flex items-center md:flex-row mt-4 md:mt-0 md:gap-2 justify-center flex-col">
                <span className="md:text-xl font-semibold">{`Ultimos pagos de `}</span>
                <span className="md:text-xl font-bold text-customTextGreen ">{` ${
                  dataUserBuscado &&
                  dataUserBuscado.nombre + " " + dataUserBuscado.apellido
                }`}</span>
              </section>
              <span className="md:text-base font-light">
                {dataUserBuscado.email}
              </span>
              <div className="w-full my-6 md:my-16 ">
                <TablePagos
                  loading={loadingTable}
                  arregloColumns={arregloColumns}
                  arreglo={arregloRows}
                  textSinEjercicios={"No hay user seleccionado"}
                ></TablePagos>
              </div>
            </>
          ) : (
            <div className="flex justify-center my-11 items-center mb-16 md:mb-20 w-full gap-1">
              <span className="md:text-xl text-gray-500 font-semibold">
                Ningun cliente seleccionado
              </span>
              <IoIosInformationCircleOutline
                fontWeight={700}
                className="md:text-2xl  text-customTextBlue  font-bold"
              ></IoIosInformationCircleOutline>
            </div>
          )}
          <ModalAceptPayment
            setAlertError={setAlertError}
            setOpen={setOpenModal}
            open={openModal}
            dataUserBuscado={dataUserBuscado}
            setAlertConfirmRequest={setAlertConfirmRequest}
          ></ModalAceptPayment>
        </div>
      )}
    </div>
  );
};
