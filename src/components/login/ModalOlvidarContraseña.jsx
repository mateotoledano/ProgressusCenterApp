import React, { useState, useEffect } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { RiLockPasswordLine } from "react-icons/ri";
import { Title } from "../ui/title/Title";
import { MdOutlineMailOutline } from "react-icons/md";
import { CustomInput } from "../ui/input/CustomInput";
import { ErrorAuth } from "../ui/errorAuth/ErrorAuth";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { sendCodeRecuperarPassword } from "../../service/auth/use-sendCodeRecuperarPassword";
import { ModalPonerCode } from "./ModalPonerCode";

export const ModalOlvidarContraseña = ({ open, setOpen }) => {
  const [email, setEmail] = useState("");
  const [load, setLoad] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [validationError, setValidationError] = useState("");
 const [openPonerCode ,  setOpenPonerCode] = useState(false)
  // Función para validar emails
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Resetear errores cuando el modal se abre o cierra
  useEffect(() => {
    if (!open) {
      setEmail("");
      setAlertError(false);
      setValidationError("");
    }
  }, [open]);

  const onChange = (e) => {
    setEmail(e.target.value);
    setValidationError("");
  };

  const handleButtonClick = async () => {
    if (!email) {
      setValidationError("El correo no puede estar vacío.");
      return;
    }
    if (!isValidEmail(email)) {
      setValidationError("Por favor ingrese un correo válido.");
      return;
    }

    setLoad(true);
    try {
      const responseSendCode = await sendCodeRecuperarPassword(email);
      if (responseSendCode && responseSendCode.status === 200) {
        setOpenPonerCode(true)
     
      } else {
        setAlertError(true);
      }
    } catch (e) {
      console.log(e, "errores al enviar código");
    } finally {
      setLoad(false);
    }
  };

  return (
    <ModalLayout Icon={RiLockPasswordLine} open={open} setOpen={setOpen}>
      <form className="flex flex-col gap-3">
        <div className="flex justify-center items-start mr-2 md:mr-3">
          <Title
            className={"text-medium md:text-lg"}
            title={"Ingrese su email"}
          ></Title>
        </div>
        <div>
          <CustomInput
            onChange={onChange}
            required={true}
            type="email"
            Icon={MdOutlineMailOutline}
            placeholder={"Email"}
            value={email}
          ></CustomInput>
          {validationError && (
            <ErrorAuth
              className="w-full flex justify-center"
              messageError={"Ingrese el email nuevamente"}
            ></ErrorAuth>
          )}
        </div>
        <div className="w-full flex justify-center">
          <ButtonSpinner
            onClick={handleButtonClick}
            type="button"
            loading={load}
            label="Enviar código de verificación"
          ></ButtonSpinner>
        </div>
      </form>
      <div className="flex justify-center items-center w-full">
        {alertError && (
          <ErrorAuth
            className="w-full flex justify-center"
            messageError={"Ha ocurrido un error, inténtelo nuevamente!"}
          ></ErrorAuth>
        )}
      </div>
      <ModalPonerCode setOpenCorreo = {setOpen} email={email} open={openPonerCode} setOpen={setOpenPonerCode}></ModalPonerCode>
    </ModalLayout>
  );
};
