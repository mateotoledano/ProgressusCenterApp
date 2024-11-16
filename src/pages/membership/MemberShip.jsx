import { MainLayout } from "../../layout/MainLayout";
import { useLocation } from "react-router-dom";
import { SnackbarDefault } from "../../components";
import { useState } from "react";
import { Title, Location, PricingPrices, Alert } from "../../components";
import { useStoreUserData } from "../../store";
import { Stack } from "@mui/material";
export const MemberShip = () => {
  const [alertCreateRequest, setAlertCreateRequest] = useState(false);
  const [alertConfirmRequest, setAlertConfirmRequest] = useState(false);
  const [alertCancelPayment, setAlertCancelPayment] = useState(false);
  const [alertUserEncontrado, setAlertUsuarioEncontrado] = useState(false);
  const userData = useStoreUserData((state) => state.userData);
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          {/* HARDCODE */}
          <Location
            route={`Membresia`}
            subroute={
              userData.email === "frantrainer15@gmail.com" ? "" : `Abonar`
            }
          ></Location>

          <Title
            title={
              userData.email === "frantrainer15@gmail.com"
                ? "Gestion de membresias"
                : `Membresia`
            }
          ></Title>
          {/* ///////////////////////////// */}
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>

        <div className=" mt-2">
          <PricingPrices
            setAlertCreateRequest={setAlertCreateRequest}
            setAlertConfirmRequest={setAlertConfirmRequest}
            setAlertCancelPayment={setAlertCancelPayment}
            setAlertUsuarioEncontrado={setAlertUsuarioEncontrado}
          ></PricingPrices>
        </div>
      </section>

      {/* <SnackbarDefault
        open={alertCreateRequest}
        setOpen={setAlertCreateRequest}
        severity="info"
        message="Su solicitud de pago se realizo y se encuentra en estado pandiente! "
        position={{ vertical: "center", horizontal: "center" }}
      ></SnackbarDefault> */}

      <SnackbarDefault
        open={alertConfirmRequest}
        setOpen={setAlertConfirmRequest}
        severity="success"
        message="Pago confirmado ! "
        position={{ vertical: "center", horizontal: "center" }}
      ></SnackbarDefault>

      <SnackbarDefault
        position={{ vertical: "center", horizontal: "center" }}
        open={alertCancelPayment}
        setOpen={setAlertCancelPayment}
        message="Pago cancelado con exito !"
        severity="info"
        // theme="dark"
        // type="info"
        // position="bottom-center"
        // autoclose={5000}
        // message="Pago cancelado con exito ! "
      ></SnackbarDefault>

      <SnackbarDefault
        open={alertUserEncontrado}
        setOpen={setAlertUsuarioEncontrado}
        message={"El email no corresponde a ningun usuario"}
        severity={"warning"}
      ></SnackbarDefault>
    </MainLayout>
  );
};
