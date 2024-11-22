import React, { useState, useEffect } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { Title } from "../ui/title/Title";
import ConfirmCode from "../auth/confirmCode/ConfirmCode";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
export const ModalPonerCode = ({ open, setOpen }) => {
  const [code, setCode] = useState(Array(4).fill(""));
  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <div className="flex flex-col justify-center items-center mr-2 md:mr-3">
        <Title
          className={"text-medium md:text-lg"}
          title={"Ingrese el codigo que enviamos a su email"}
        ></Title>
        <ConfirmCode code={code} setCode={setCode}></ConfirmCode>
        <ButtonSpinner></ButtonSpinner>
      </div>
    </ModalLayout>
  );
};
