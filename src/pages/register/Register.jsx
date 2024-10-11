import React, { useState } from "react";
import { Checkbox } from "../../components/ui/input/Checkbox";
import { Button, CustomInput } from "../../components";
import { FiUser } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { registerUser } from "../../service/auth/use-register";
export const Register = () => {
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
  console.log(formRegister);

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
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
    }
    if (!check) {
      formErrors.checkbox = "Debe aceptar los términos y servicios.";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const newProduct = await registerUser(
        formRegister.email,
        formRegister.password
      );
      console.log("Producto creado:", newProduct);
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
      <div className="w-full flex justify-center flex-col items-center md:w-1/3 ">
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
        {errors.name && (
          <span className="text-red-500 w-full text-start font-medium flex justify-start items-center text-sm">
            {errors.name}
            <MdErrorOutline width={15} />
          </span>
        )}
      </div>
      <div className="w-full flex justify-center flex-col items-center md:w-1/3 ">
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
          <span className="text-red-500 w-full text-start font-medium flex justify-start items-center text-sm">
            {errors.lastname}
            <MdErrorOutline width={15} />
          </span>
        )}
      </div>
      <div className="w-full flex justify-center flex-col items-center md:w-1/3 ">
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
        {errors.email && (
          <span className="text-red-500 w-full text-start font-medium flex justify-start items-center text-sm">
            {errors.email}
            <MdErrorOutline width={15} />
          </span>
        )}
      </div>
      <div className="w-full flex justify-center flex-col items-center md:w-1/3 ">
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
          <span className="text-red-500 w-full text-start font-medium flex justify-start items-center text-sm">
            {errors.password}
            <MdErrorOutline width={15} />
          </span>
        )}
      </div>
      <div className="w-full flex justify-center flex-col items-center md:w-1/3 ">
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
          <span className="text-red-500 w-full text-start font-medium flex justify-start items-center text-sm">
            {errors.repassword}
            <MdErrorOutline width={15} />
          </span>
        )}
      </div>

      <div className="hidden  md:flex w-1/3 flex-wrap justify-start pt-12  ">
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
          <span className="text-red-500 w-full text-start font-medium flex justify-start items-center text-sm">
            {errors.checkbox}
            <MdErrorOutline width={15} />
          </span>
        )}
      </div>

      {/* Checkbox */}
      <div className="w-full flex justify-center flex-col items-center md:w-2/3 md:justify-start  ">
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
    </form>
  );
};
