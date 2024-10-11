import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { Button, CustomInput } from "../../components";
import { RiLockPasswordLine } from "react-icons/ri";
import { Checkbox } from "../../components/ui/input/Checkbox";
import { MdErrorOutline } from "react-icons/md";

export const Login = () => {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [check, setChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!formLogin.email) {
      formErrors.email = "El campo email es obligatorio.";
    }
    if (!formLogin.password) {
      formErrors.password = "El campo contraseña es obligatorio.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log("Formulario enviado:", formLogin);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-3/4 animate-fade-in-right flex flex-col justify-center items-center  md:w-1/3  md:gap-2 md:items-center  mt-4"
    >
      {/* Inputs */}

      <CustomInput
        iconColor={"text-customTextGreen"}
        onChange={handleChange}
        className=""
        placeholder="Usuario"
        Icon={FiUser}
        name="email"
        type="email"
      />
      {errors.email && (
        <span className="text-red-500 w-full text-start font-medium flex justify-start items-center text-sm">
          {errors.email}
          <MdErrorOutline width={15} />
        </span>
      )}

      <CustomInput
        iconColor={"text-customTextGreen"}
        onChange={handleChange}
        placeholder="Contraseña"
        name="password"
        type="password"
        Icon={RiLockPasswordLine}
      />
      {errors.password && (
        <span className="text-red-500 w-full text-start font-medium flex justify-start items-center text-sm">
          {errors.password}
          <MdErrorOutline width={15} />
        </span>
      )}

      {/* Checkbox */}
      <div className="w-full flex justify-start gap-2 items-center mt-2">
        <Checkbox check={check} onChange={handleCheck} />
        <span>Recordarme</span>
      </div>

      <Button type="submit" label="Ingresar" />
    </form>
  );
};
