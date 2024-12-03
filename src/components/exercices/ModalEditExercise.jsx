import React, { useEffect, useState } from "react";
import { ModalLayout } from "../../layout/ModalLayout";
import { CustomInput } from "../ui/input/CustomInput";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
import { ErrorAuth } from "../ui/errorAuth/ErrorAuth";
import {
  useAddMuscleToExercise,
  useCreateExercise,
} from "../../service/exercices/useCreateExercise";
import { CheckboxesTags } from "../ui/CheckboxesTags/CheckboxesTags";
import { useGetAllExercises } from "../../service/plans/useGetExercises";
import { useEditExercise } from "../../service/exercices/useCreateExercise";
export const ModalEditExercise = ({
  open,
  setOpen,
  muscles,
  setExercices,
  setAlertExerciseEdit,
  itemEditable,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorAddExercise, setErrorAddExercise] = useState(false);
  const [idExerciseCreado, setIdExerciseCreado] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    imagenMaquina: "",
    videoEjercicio: "",
  });

  const initialFormState = {
    nombre: "",
    descripcion: "",
    imagenMaquina: "",
    videoEjercicio: "",
  };

  // Actualiza el formulario con los valores de itemEditable al abrir el modal
  useEffect(() => {
    setErrorAddExercise(false);
    if (itemEditable && open) {
      setForm({
        nombre: itemEditable.nombre || "",
        descripcion: itemEditable.descripcion || "",
        imagenMaquina: itemEditable.imagenMaquina || "",
        videoEjercicio: itemEditable.videoEjercicio || "",
      });
    } else if (!open) {
      setForm(initialFormState);
      setSelectedOptions([]);
    }
  }, [itemEditable, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const editExercise = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responseEditExercise = await useEditExercise(itemEditable.id, form);
      if (
        responseEditExercise &&
        (responseEditExercise.status === 200 ||
          responseEditExercise.status === 201)
      ) {
        const responseAddMuscles = await useAddMuscleToExercise(
          selectedOptions,
          itemEditable.id
        );
        if (responseAddMuscles && responseAddMuscles.status === 200) {
          const responseExercices = await useGetAllExercises();
          setExercices(responseExercices?.data);
          setOpen(false);
          setForm(initialFormState);
          setAlertExerciseEdit(true);
        } else {
          setErrorAddExercise(true);
        }
      } else {
        setErrorAddExercise(true);
      }
    } catch (e) {
      console.error("Error al agregar ejercicio", e);
      setErrorAddExercise(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={editExercise}
      >
        <div className="flex flex-col justify-center items-center gap-0 mb-0">
          <span className="font-semibold text-xl">Editar Ejercicio</span>
          <span className="font-bold text-xl text-center text-customTextGreen">
            {itemEditable?.nombre}
          </span>
        </div>
        <div className="w-full">
          <label className="font-semibold text-start w-full" htmlFor="nombre">
            Nombre del ejercicio
          </label>
          <CustomInput
            required={true}
            placeholder="Nombre del ejercicio"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="w-full">
          <label
            className="font-semibold text-start w-full"
            htmlFor="descripcion"
          >
            Descripción del ejercicio
          </label>
          <CustomInput
            required={true}
            placeholder="Descripción del ejercicio"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>
        <CheckboxesTags
          options={muscles}
          label="Musculos del ejercicio"
          placeholder="Elegir.."
          getOptionLabel={(option) => option.nombre}
          onChange={(values) => setSelectedOptions(values)}
        />
        <div className="w-full">
          <label
            className="font-semibold text-start w-full"
            htmlFor="imagenMaquina"
          >
            Imagen de la máquina
          </label>
          <CustomInput
            required={true}
            type="text"
            placeholder="URL de la imagen..."
            name="imagenMaquina"
            value={form.imagenMaquina}
            onChange={handleChange}
          />
        </div>

        <div className="w-full">
          <label
            className="font-semibold text-start w-full"
            htmlFor="videoEjercicio"
          >
            Video del ejercicio
          </label>
          <CustomInput
            required={true}
            type="text"
            placeholder="URL del video..."
            name="videoEjercicio"
            value={form.videoEjercicio}
            onChange={handleChange}
          />
        </div>

        <ButtonSpinner
          type="submit"
          className="w-1/2"
          label="Editar ejercicio"
          loading={loading}
        />

        {errorAddExercise && (
          <ErrorAuth
            messageError={"Ha ocurrido un error, intentelo nuevamente"}
            className="flex justify-center"
          />
        )}
      </form>
    </ModalLayout>
  );
};
