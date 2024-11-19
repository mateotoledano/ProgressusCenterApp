



import React, { useState } from "react";
import { ModalLayout } from "../../../layout/ModalLayout";
import { MdDeleteOutline } from "react-icons/md";
import { ButtonSpinner } from "../../ui/buttons/ButtonSpinner";
import { useDeleteItem } from "../../../service/inventary/useDeleteItem";
import { useGetInventary } from "../../../service/inventary/useGetInventary";
export const ModalDeleteUsers = ({
  openDeleteElement,
  setOpenDeleteElement,
  setInventary,
  elementEditable,
  setAlertDeleteItem,
  seterrorDeleteiItem,
}) => {
  if (!elementEditable) return null;

  // LOADING DEL BUTTON
  const [loading, setLoading] = useState(false);
  const deleteItem = async () => {
    setLoading(true);
    try {
      const responseDelete = await useDeleteItem(elementEditable.id);
      console.log(responseDelete, "resp del delete");
      if (responseDelete && responseDelete.data.statusCode == 200) {
        // llamamos de nuevo al endpoint para poder setearlo de nuevo
        const actualizarInventary = await useGetInventary();
        setInventary(actualizarInventary.data.value);

        setOpenDeleteElement(false);

        setAlertDeleteItem(true);
      } else {
        seterrorDeleteiItem(true);
      }
    } catch (e) {
      console.log(e, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ModalLayout
      Icon={MdDeleteOutline}
      open={openDeleteElement}
      setOpen={setOpenDeleteElement}
    >
      <div className="flex justify-center items-center gap-1 mb-4">
        <span className="font-semibold text-xl  text-center">
          Eliminar
          <span className="font-bold text-xl ml-1 text-center text-red-600">
            {elementEditable.nombre} ?
          </span>
        </span>
      </div>
      <div className="flex justify-center">
        <ButtonSpinner
          onClick={deleteItem}
          loading={loading}
          label="Eliminar Item"
          className="bg-red-600"
        ></ButtonSpinner>
      </div>
    </ModalLayout>
  );
};
