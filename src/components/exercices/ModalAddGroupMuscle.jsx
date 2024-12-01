import React, { useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { CustomInput } from "../ui/input/CustomInput";
import { useCreateGruopMuscle } from "../../service/exercices/useCreateGruopMuscle";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useGetAllMuscleGroups } from "../../service/exercices/useGetAllMuscleGroups";

export const ModalAddGroupMuscle = ({ open, setOpen, setGroupMuscles }) => {
  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });
  const initialFormState = {
    name: "",
    description: "",
    image: "", 
  };

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "file" ? files[0] : value, 
    }));
  };

  const addGroup = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    try {
      const responseAddGroup = await useCreateGruopMuscle(form);
      console.log(responseAddGroup, "grupo añadido");

      if (
        (responseAddGroup && responseAddGroup.status == 200) ||
        responseAddGroup.status == 201
      ) {
        //  TRAER GRUPOS MUSCULARES
        setForm(initialFormState);
        const responseGruposMusculares = await useGetAllMuscleGroups();
        setGroupMuscles(responseGruposMusculares?.data);
        setOpen(false);
      }
    } catch (e) {
      console.error(e, "error al agregar musculo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <form className="flex flex-col  items-center gap-5" onSubmit={addGroup}>
        <div className="w-full">
          <label className="font-semibold text-start w-full" htmlFor="name">
            Nombre del grupo muscular
          </label>
          <CustomInput
            required={true}
            placeholder="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <label
            className="font-semibold text-start w-full"
            htmlFor="description"
          >
            Descripción del grupo muscular
          </label>
          <CustomInput
            required={true}
            placeholder="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <label className="font-semibold text-start w-full" htmlFor="image">
            Imagen del grupo muscular
          </label>
          <CustomInput
            type="text"
            placeholder="Url de la imagen..."
            name="image"
            onChange={handleChange}
          />
        </div>
        <ButtonSpinner
          type="submit"
          className="w-1/2"
          label=" Agregar grupo "
          loading={loading}
        ></ButtonSpinner>
      </form>
    </ModalLayout>
  );
};
