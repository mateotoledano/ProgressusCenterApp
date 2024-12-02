import React, { useEffect, useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { CustomInput } from "../ui/input/CustomInput";
import { useCreateGruopMuscle } from "../../service/exercices/useCreateGruopMuscle";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { useGetAllMuscleGroups } from "../../service/exercices/useGetAllMuscleGroups";
import { Title } from "../ui/title/Title";
import { useEditGroup } from "../../service/exercices/useEditGroup";
export const ModalEditModalGroupMuscle = ({
  open,
  setOpen,
  setGroupMuscles,

  itemEditable,
  setOpenAlertEditGroup,
}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (itemEditable) {
      setForm({
        name: itemEditable?.nombre || "",
        description: itemEditable?.descripcion || "",
        image: itemEditable?.imagenGrupoMuscular || "",
      });
    }
  }, [itemEditable]); // Se ejecuta cada vez que cambia `itemEditable`

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const editGroup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responseEditGroup = await useEditGroup(itemEditable.id, form);
      if (
        (responseEditGroup && responseEditGroup.status === 200) ||
        responseEditGroup.status === 201
      ) {
        setForm({ name: "", description: "", image: "" });
        const responseGruposMusculares = await useGetAllMuscleGroups();
        setGroupMuscles(responseGruposMusculares?.data);
        setOpen(false);
        setOpenAlertEditGroup(true);
      }
    } catch (e) {
      console.error(e, "error al editar grupo muscular");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <form className="flex flex-col items-center gap-5" onSubmit={editGroup}>
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
            value={form.image}
            type="text"
            placeholder="Url de la imagen..."
            name="image"
            onChange={handleChange}
          />
        </div>
        <ButtonSpinner
          type="submit"
          className="w-2/3"
          label="Editar grupo muscular"
          loading={loading}
        />
      </form>
    </ModalLayout>
  );
};
