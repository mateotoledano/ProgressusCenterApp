import React, { useState, useEffect } from "react";
import { ModalLayout } from "../../../layout/ModalLayout";
import { MdOutlineEdit } from "react-icons/md";
import { ButtonSpinner } from "../../ui/buttons/ButtonSpinner";
import { CustomInput } from "../../ui/input/CustomInput";
import { useGetInventary } from "../../../service/inventary/useGetInventary";
import { useEditItem } from "../../../service/inventary/useEditItem";
export const ModalEditUsers = ({
  openEditElement,
  setOpenEditElement,
  elementEditable,
  setInventary,
  setAlertEditItem,
  setErrorAlertEditItem,
}) => {
  if (!elementEditable) return null;

  const [form, setForm] = useState({
    nombre: elementEditable.nombre,
    rol: elementEditable?.roles?.[0] || "SOCIO",
  });
  // LOADING DEL BUTTON
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Resync form with elementEditable if it changes externally
    setForm({
      nombre: elementEditable.nombre || "",
      rol: elementEditable?.roles?.[0] || "SOCIO",
    });
  }, [elementEditable]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const onSubmitEditItem = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const responseEditItem = await useEditItem(
        form.nombre,
        form.descripcion,
        form.estado,
        elementEditable.id
      );

      if (responseEditItem && responseEditItem.status == 200) {
        setForm({
          nombre: "",
          descripcion: "",
          estado: "Correcto",
        });
        // llamamos de nuevo al endpoint para poder setearlo de nuevo
        const actualizarInventary = await useGetInventary();
        setInventary(actualizarInventary.data.value);
        // cerramos modal
        setOpenEditElement(false);
        //Mostramos alert
        setAlertEditItem(true);
      } else {
        setErrorAlertEditItem(true);
      }
    } catch (e) {
      console.log(e, "errores");
    } finally {
      setLoading(false);
    }
  };
  console.log(form, "fomr en modal de users");
  return (
    <ModalLayout
      Icon={MdOutlineEdit}
      open={openEditElement}
      setOpen={setOpenEditElement}
    >
      <div className="flex flex-col justify-center items-center gap-0 mb-4">
        <span className="font-semibold text-xl">Editar Usuario:</span>
        <span className="font-bold text-xl text-center text-customTextGreen">
          {elementEditable.nombre} {elementEditable.apellido}
        </span>
      </div>
      <form
        onSubmit={onSubmitEditItem}
        className="flex flex-col justify-center items-center text-center gap-2"
      >
        <label className="font-semibold text-start w-full" htmlFor="">
          Nombre del Item:
        </label>
        <CustomInput
          classNameInput=""
          required={true}
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        ></CustomInput>

        <label className="font-semibold text-start w-full" htmlFor="">
          Estado del item:
        </label>
        <select
          name="rol"
          value={form.rol}
          onChange={handleChange}
          className="border font-medium border-gray-300 rounded outline-none p-2 w-full"
          required
        >
          <option value="SOCIO">SOCIO</option>

          <option value="ENTRENADOR">ENTRENADOR</option>
        </select>

        <ButtonSpinner
          label="Editar Item"
          type="submit"
          loading={loading}
        ></ButtonSpinner>
      </form>
    </ModalLayout>
  );
};
