import React, { useState } from "react";
import { ModalLayout } from "../../../layout/ModalLayout";
import { MdDeleteOutline } from "react-icons/md";
import { ButtonSpinner } from "../../ui/buttons/ButtonSpinner";

import { useGetInventary } from "../../../service/inventary/useGetInventary";
import { useDeleteUser } from "../../../service/auth/use-deleteUser";
import { useGetAllUsers } from "../../../service/auth/use-getAllUsers";
export const ModalDeleteUsers = ({
  openDeleteElement,
  setOpenDeleteElement,
  setUsers,
  elementEditable,
  setAlertDeleteItem,
  seterrorDeleteiItem,
}) => {
  if (!elementEditable) return null;
  console.log(elementEditable, "element editabñle");

  // LOADING DEL BUTTON
  const [loading, setLoading] = useState(false);
  const deleteItem = async () => {
    setLoading(true);
    try {
      console.log(elementEditable.identityUserId);

      const responseDelete = await useDeleteUser(
        elementEditable.identityUserId
      );

      if (responseDelete && responseDelete.status == 200) {
        // llamamos de nuevo al endpoint para poder setearlo de nuevo
        const actualizarUsers = await useGetAllUsers();
        setUsers(actualizarUsers.data);

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
          ¿Estas seguro de eliminar a
          <span className="font-bold text-xl ml-1 text-center text-red-600">
            {elementEditable && elementEditable.nombre}{" "}
            {elementEditable && elementEditable.apellido}?
          </span>
        </span>
      </div>
      <div className="flex justify-center">
        <ButtonSpinner
          onClick={deleteItem}
          loading={loading}
          label="Eliminar usuario"
          className="bg-red-600"
        ></ButtonSpinner>
      </div>
    </ModalLayout>
  );
};
