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
export const ModalAddExercise = ({
  open,
  setOpen,
  muscles,
  setExercices,
  setAlertExerciseCreate,
}) => {
  const [loading, setLoading] = useState(false);
  const [errorAddExercise, setErrorAddExercise] = useState(false);
  const [idExerciseCreado, setIdExerciseCreado] = useState();
  //   OPCIONES DE MUSCULOS
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
  useEffect(() => {
    setErrorAddExercise(false);
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const addExercise = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const responseExercise = await useCreateExercise(form);
      if (
        responseExercise &&
        (responseExercise.status === 200 || responseExercise.status === 201)
      ) {
        const exerciseId = responseExercise.data.id;
        setIdExerciseCreado(exerciseId);
        const responseAddMuscles = await useAddMuscleToExercise(
          selectedOptions,
          exerciseId
        );
        if (responseAddMuscles && responseAddMuscles.status == 200) {
          // TRAER EJERCICIOS
          const responseExercices = await useGetAllExercises();
          setExercices(responseExercices?.data);
          setOpen(false);
          setForm(initialFormState);
          setAlertExerciseCreate(true);
        } else {
          setErrorAddExercise(true);
        }
        console.log(responseAddMuscles, "añadido musculos");
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
      <form className="flex flex-col items-center gap-5" onSubmit={addExercise}>
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
        ></CheckboxesTags>
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
          label="Agregar ejercicio"
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
