import React, { useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useDeleteGroup } from "../../service/exercices/useDeleteGroup";
import { useGetAllMuscleGroups } from "../../service/exercices/useGetAllMuscleGroups";
export const ModalDeleteItem = ({
  open,
  setOpen,
  elementEditable,
  setGroupMuscles,
}) => {
  console.log("entra quqoioiiieascac");
  const [loading, setLoading] = useState(false);
  const deleteItem = async () => {
    setLoading(true);
    try {
      const deleteRes = await useDeleteGroup(elementEditable.id);
      console.log(deleteRes, "delet eres");

      if ((deleteRes && deleteRes.status == 200) || deleteRes.status == 201) {
        const responseGruposMusculares = await useGetAllMuscleGroups();
        setGroupMuscles(responseGruposMusculares?.data);
        setOpen(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <div className="flex justify-center items-center gap-1 mb-4">
        <span className="font-semibold text-xl  text-center">
          Eliminar
          <span className="font-bold text-xl ml-1 text-center text-red-600">
            {elementEditable?.nombre} ?
          </span>
        </span>
      </div>
      <div className="flex justify-center">
        <ButtonSpinner
          loading={loading}
          onClick={deleteItem}
          label="Eliminar Grupo muscular"
          className="bg-red-600"
        ></ButtonSpinner>
      </div>
    </ModalLayout>
  );
};
