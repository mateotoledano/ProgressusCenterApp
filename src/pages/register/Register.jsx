import React, { useState } from "react";

import {
  Button,
  CustomInput,
  ErrorAuth,
  ModalVerificationAuth,
  Checkbox,
} from "../../components";
import { FiUser } from "react-icons/fi";

import { RiLockPasswordLine } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { registerUser } from "../../service/auth/use-register";
import { useAuthValidation } from "../../service/auth/use-authValidation";
export const Register = () => {
  const [errorEmailBack, setErrorEmailBack] = useState(false);
  const [errorPasswordBack, setErrorPasswordBack] = useState([]);
  const [open, setOpen] = useState(false);

  const [check, setChecked] = useState(false);
  const [formRegister, setFormRegister] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    repassword: "",
    check: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleCheck = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    if (isChecked) {
      setErrors({
        ...errors,
        checkbox: "",
      });
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (errorEmailBack) {
      setErrorEmailBack(false);
    }
    if (errorPasswordBack) {
      setErrorPasswordBack(false);
    }
    //  VALIDACION PARTE DEL FRONT
    let formErrors = {};
    if (!formRegister.name) {
      formErrors.name = "El campo nombre es obligatorio.";
    }
    if (!formRegister.lastname) {
      formErrors.lastname = "El campo apellido es obligatorio.";
    }
    if (!formRegister.email) {
      formErrors.email = "El campo email es obligatorio.";
    }
    if (!formRegister.password) {
      formErrors.password = "El campo contraseña es obligatorio.";
    }
    if (!formRegister.repassword) {
      formErrors.repassword = "El campo repetir contraseña es obligatorio.";
    } else {
      if (formRegister.password !== formRegister.repassword) {
        formErrors.repassword = "Las contraseñas no coinciden.";
      }
    }
    if (!check) {
      formErrors.checkbox = "Debe aceptar los términos y servicios.";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const user = await registerUser(
        formRegister.email,
        formRegister.password
      );
      console.log(user, "userrrrrr");

      // ENVIAR EMAIL DE VERIFICACION
      if (user.status == "200") {
        setOpen(true);
        useAuthValidation(formRegister.email);
      }

      // VALIDACION PARTE DEL BACK
      if (user.DuplicateUserName) {
        setErrorEmailBack(true);
      }

      let passwordErrors = [];

      if (user.PasswordRequiresNonAlphanumeric) {
        passwordErrors.push(
          "La contraseña debe contener al menos un carácter no alfanumérico."
        );
      }

      if (user.PasswordRequiresDigit) {
        passwordErrors.push(
          "La contraseña debe tener al menos un dígito ('0'-'9')."
        );
      }

      if (user.PasswordRequiresUpper) {
        passwordErrors.push(
          "La contraseña debe tener al menos una mayúscula ('A'-'Z')."
        );
      }
      if (user.PasswordRequiresLower) {
        passwordErrors.push(
          "La contraseña debe tener al menos una minuscula ('a'-'z')."
        );
      }
      if (user.PasswordTooShort) {
        passwordErrors.push("La contraseña debe tener al menos 6 caracteres.");
      }

      if (passwordErrors.length > 0) {
        setErrorPasswordBack(passwordErrors);
      } else {
        setErrorPasswordBack([]);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmitRegister}
      className="w-3/4 mb-6 animate-fade-in-right flex flex-col justify-center items-center md:mb-2 mt-4 md:mt-2 md:gap-3  md:flex-row md:flex-wrap  md:justify-center "
    >
      {/* Inputs */}
      <div className="w-full flex justify-center flex-col items-center md:w-1/3 md:mx-8 ">
        <label
          className="text-start  w-full text-lg font-normal flex justify-start items-center "
          htmlFor=""
        >
          Nombre
        </label>

        <CustomInput
          iconColor={"text-customTextGreen"}
          className="my-1"
          onChange={handleChange}
          placeholder="Ingrese su nombre"
          type="text"
          name="name"
          Icon={FiUser}
        ></CustomInput>
        {errors.name && <ErrorAuth messageError={errors.name}></ErrorAuth>}
      </div>
      <div className="w-full flex justify-center flex-col items-center md:w-1/3  md:mx-8">
        <label
          className="text-start  w-full text-lg font-normal flex justify-start items-center "
          htmlFor=""
        >
          Apellido
        </label>
        <CustomInput
          iconColor={"text-customTextGreen"}
          className="my-1"
          onChange={handleChange}
          placeholder="Ingrese su apellido"
          type="text"
          name="lastname"
          Icon={FiUser}
        ></CustomInput>
        {errors.lastname && (
          <ErrorAuth messageError={errors.lastname}></ErrorAuth>
        )}
      </div>
      <div className="w-full flex justify-center flex-col items-center md:w-1/3  md:mx-8">
        <label
          className="text-start  w-full text-lg font-normal flex justify-start items-center "
          htmlFor=""
        >
          Email
        </label>
        <CustomInput
          iconColor={"text-customTextGreen"}
          className="my-1  "
          onChange={handleChange}
          placeholder="Ingrese su email"
          type="email"
          name="email"
          Icon={MdOutlineMail}
        ></CustomInput>
        {errors.email && <ErrorAuth messageError={errors.email}></ErrorAuth>}
        {errorEmailBack && (
          <span className="text-red-500 w-full text-start font-medium flex justify-start items-center text-sm">
            El correo ya existe.
            <MdErrorOutline width={15} />
          </span>
        )}
      </div>
      <div className="w-full flex justify-center flex-col items-center md:w-1/3  md:mx-8">
        <label
          className="text-start  w-full text-lg font-normal flex justify-start items-center "
          htmlFor=""
        >
          Contraseña
        </label>
        <CustomInput
          iconColor={"text-customTextGreen"}
          onChange={handleChange}
          className="my-1"
          placeholder="Ingrese su contraseña"
          type="password"
          name="password"
          Icon={RiLockPasswordLine}
        ></CustomInput>
        {errors.password && (
          <ErrorAuth messageError={errors.password}></ErrorAuth>
        )}
        {errorPasswordBack.length > 0 &&
          errorPasswordBack.map((error) => (
            <span className="text-red-500 w-full text-start font-medium flex justify-start items-center text-sm">
              {error}
              <MdErrorOutline width={15} />
            </span>
          ))}
      </div>
      <div className="w-full flex justify-center flex-col items-center md:w-1/3  md:mx-8">
        <label
          className="text-start  w-full text-lg font-normal flex justify-start items-center "
          htmlFor=""
        >
          Repetir contraseña
        </label>
        <CustomInput
          iconColor={"text-customTextGreen"}
          onChange={handleChange}
          className="my-1 "
          placeholder="Repita su contraseña"
          type="password"
          name="repassword"
          Icon={RiLockPasswordLine}
        ></CustomInput>
        {errors.repassword && (
          <ErrorAuth messageError={errors.repassword}></ErrorAuth>
        )}
      </div>

      <div className="hidden  md:flex w-1/3 flex-wrap justify-start pt-12   md:mx-8">
        <div className="flex gap-2  items-center  ">
          <Checkbox check={check} onChange={handleCheck}></Checkbox>
          <span>
            Acepto los{" "}
            <a href="" className="underline text-customTextGreen">
              terminos y servicios
            </a>
          </span>
        </div>
        {errors.checkbox && (
          <ErrorAuth messageError={errors.checkbox}></ErrorAuth>
        )}
      </div>

      {/* Checkbox */}
      <div className="w-full flex justify-center flex-col items-center md:w-2/3 md:justify-start  md:mx-8 ">
        <div className="flex gap-2 justify-start  w-full items-center md:justify-start md:w-full md:hidden">
          <Checkbox check={check} onChange={handleCheck}></Checkbox>
          <span>
            Acepto los{" "}
            <a href="" className="underline text-customTextGreen">
              terminos y servicios
            </a>
          </span>
        </div>

        {errors.checkbox && (
          <span className="text-red-500 w-full text-start font-medium flex justify-start items-center text-sm md:hidden">
            {errors.checkbox}
            <MdErrorOutline width={15} />
          </span>
        )}
        <Button type="submit" label="Registrarse"></Button>
      </div>
      {/* MODAL PARA VERIFICAR EL CORREO */}
      <ModalVerificationAuth
        setOpen={setOpen}
        open={open}
        email={formRegister.email}
      ></ModalVerificationAuth>
    </form>
  );
};
