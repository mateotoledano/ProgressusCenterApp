import React, { useEffect, useState } from "react";
import gym from "/gym.svg";
import { CgGym } from "react-icons/cg";

import { useCreatePreference } from "../../../service/membership/useCreatePreference";
import { SnackbarDefault } from "../../ui/snackbar/Snackbar";
import { useGetMemberships } from "../../../service/membership/useGetMembership";
import { useCreateRequestPayment } from "../../../service/membership/useCreateRequestPayment";
import { LoadingSkeleton } from "../../ui/skeleton/LoadingSkeleton";
import { useStoreUserData } from "../../../store";
import { useRegisterPayment } from "../../../service/membership/useRegisterPayment";
import { Alert } from "../../ui/alert/Alert";
import { useGetRequestPaymentSocio } from "../../../service/membership/useGetRequestPaymentSocio";
import { useCancelRequestPayment } from "../../../service/membership/useCancelRequestPayment";
import { Title } from "../../ui/title/Title";
import { Stack } from "../../ui/stack/Stack";
import { CustomInput } from "../../ui/input/CustomInput";
import { IoSearchSharp } from "react-icons/io5";
import { useDataUser } from "../../../service/auth/use-dataUser";
export const PricingPrices = ({
  setAlertCreateRequest,
  setAlertConfirmRequest,
  setAlertCancelPayment,
  setAlertUsuarioEncontrado,
}) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useStoreUserData((state) => state.userData);
  const [dataPedido, setDataPedido] = useState(null);

  //PLANES QUE AGREGAR EL DE LA VENTANILLA
  const [planElegido, setPlanElegido] = useState(null);

  // Buscador de user

  const [emailUser, setEmailUser] = useState("");
  const [dataUserBuscado, setDataUserBuscado] = useState();

  const handleChange = (e) => {
    setEmailUser(e.target.value);
  };
  console.log(emailUser, "emailUser");

  // CONFIGURAR FECHA PARA MOSTRAR EN EL STACK PANTALLA DE ADMIN
  const fechaHora = dataPedido?.fechaCreacion;

  const fecha = fechaHora ? new Date(fechaHora).toLocaleDateString() : "";
  const hora = fechaHora ? new Date(fechaHora).toLocaleTimeString() : "";

  // TRAER MEMBRESIAS
  useEffect(() => {
    const traerMembresias = async () => {
      try {
        const response = await useGetMemberships();
        console.log(response.data, "dataaaa");

        setCards(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e, "errores");
        setLoading(false);
      }
    };
    const traerDataPedido = async () => {
      try {
        // HARDCODE
        const requestPayment = await useGetRequestPaymentSocio(
          "1acd1716-2710-4e7f-96f1-488de2f6423e"
        );
        console.log(requestPayment.data, "requestPaymeny");
        setDataPedido(requestPayment.data.value.value);
        //////////////////////
      } catch (e) {
        console.log(e);
      }
    };
    traerMembresias();
    traerDataPedido();
  }, []);

  // ENVIAR SOLICITUD DE PAGO
  const handleBuy = async (membresiaId, tipoDePagoId, idUser) => {
    setAlertCreateRequest(false);
    try {
      const response = await useCreateRequestPayment(
        membresiaId,
        tipoDePagoId,
        idUser
      );

      if (response.status === 200) {
        setAlertCreateRequest(true);
      }
    } catch (error) {
      console.error("Error en lenviar la solicitud de pago", error);
    }
  };
  console.log(planElegido, "plan elegido");

  // CONFIRMAR PAGO DEL LADO DE VENTANILLA
  const handleRegisterPayment = async () => {
    setAlertConfirmRequest(false);
    try {
      await handleBuy(planElegido.id, 1, dataUserBuscado.identityUserId);
      // HARDCODE
      const requestPayment = await useGetRequestPaymentSocio(
        dataUserBuscado.identityUserId
      );
      console.log(requestPayment.data, "requestPaymeny");
      setDataPedido(requestPayment.data.value.value);
      //////////////////////
      const registerPayment = await useRegisterPayment(
        requestPayment.data.value.value.id
      );
      if (registerPayment.status === 200) {
        console.log("enteraaaa");
        setAlertConfirmRequest(true);
        setDataPedido(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // CANCELAR SOLICITUD DE PAGO DEL LADO DE VENTANILLA
  const handleCancelRequest = async () => {
    setAlertCancelPayment(false);
    try {
      // HARDCODE
      const requestPayment = await useGetRequestPaymentSocio(
        dataUserBuscado.identityUserId
      );

      ////////////////////////////////
      const cancelPayment = await useCancelRequestPayment(
        requestPayment.data.value.value.id
      );

      if (cancelPayment.status === 200) {
        console.log("enteraaaa");
        setAlertCancelPayment(true);
        setPlanElegido(null);
      }
    } catch (e) {
      console.log(e);
    }
  };
  // traerDataDelUser para obtener el id
  const traerDataUser = async () => {
    const response = await useDataUser(emailUser);
    console.log(response, "response ");
    if (response && response.status == "200") {
      setDataUserBuscado(response.data);
    } else {
      setAlertUsuarioEncontrado(true);
      setDataUserBuscado(null);
    }
  };

  return (
    <div className="flex flex-col flex-wrap justify-center items-center md:items-start md:justify-around gap-8 md:gap-5 md:flex-row w-full">
      {loading ? (
        <LoadingSkeleton
          variant="rectangular"
          className={"w-4/5 md:w-full"}
          count={4}
          width={400}
          height={300}
        />
      ) : (
        cards.map((card) => {
          return (
            <div
              key={card.id}
              className="max-w-sm p-5 md:p-0 w-full md:my-4 transition duration-300 transform hover:scale-105"
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
                        className="w-5 h-5 text-customTextBlue mr-2 flex-shrink-0"
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
                  {userData.email === "frantrainer15@gmail.com" ? (
                    <button
                      onClick={() => setPlanElegido(card)}
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
      {/*BUTTON PARA REGISTRAR PAGO DEL LADO DEL QUE ATIENDE EL GYM */}
      {/* HARDCODE  */}
      {userData.email === "frantrainer15@gmail.com" && (
        <div className="w-full justify-center ">
          <section className="flex flex-col gap-6 items-center justify-center">
            <Title title={"Solicitudes de pago"}></Title>
            <div className="w-full flex justify-center mt-0 items-center gap-1  ">
              <CustomInput
                className="w-1/2 focus:ring-customButtonGreen focus:border-customButtonGreen "
                value={emailUser}
                onChange={handleChange}
                placeholder="Email del cliente..."
                type="text"
              ></CustomInput>
              <button
                onClick={traerDataUser}
                className="bg-customButtonGreen rounded p-2.5 md:p-2"
              >
                <IoSearchSharp className="text-white  text-lg md:text-2xl font-semibold"></IoSearchSharp>
              </button>
            </div>
            {planElegido ? (
              <Stack
                titulo={planElegido.nombre}
                duracion={`${planElegido.mesesDuracion} meses `}
                fechaFinalizacion={`$ ${planElegido.precio}`}
                classNameText={"md:text-3xl text-customGreenNavBar"}
              ></Stack>
            ) : (
              <Stack titulo={"Ningun plan asignado"}></Stack>
            )}
            {dataUserBuscado && (
              <span className="text-xl font-semibold">{`Solicitud de pago de : ${
                dataUserBuscado &&
                dataUserBuscado.nombre + " " + dataUserBuscado.apellido
              }`}</span>
            )}
          </section>
          {planElegido && dataUserBuscado && (
            <div className="flex justify-center mt-5 gap-24">
              <button
                onClick={handleRegisterPayment}
                className="py-1 px-1 md:py-3 font-bold md:w-1/3 text-white bg-customTextBlue rounded-lg"
              >
                Registrar Pago
              </button>
              {/*BUTTON PARA CANCELAR SOLICITUD DE PAGO DEL LADO DEL QUE ATIENDE EL GYM */}
              <button
                onClick={handleCancelRequest}
                className="py-1 px-1 md:py-3 font-bold md:w-1/3 text-white bg-red-600 rounded-lg"
              >
                Cancelar Pago
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
