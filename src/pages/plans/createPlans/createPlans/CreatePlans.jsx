import React, { useEffect, useState } from "react";
import { GrPlan } from "react-icons/gr";
import { BasicTable, Button, CustomInput } from "../../../../components";
import { IoSearchSharp } from "react-icons/io5";
import { useStoreUserData } from "../../../../store";
import { useGetAllExercises } from "../../../../service/plans/useGetExercises";
import { IoIosAddCircleOutline } from "react-icons/io";
import { SnackbarDefault } from "../../../../components";
import { useStorePlanCreado } from "../../../../store/useStorePlanCreado";
const columnsUser = [
  "Grupo Muscular",
  "Ejercicio",
  "Peso",
  "Series",
  "Repeticiones",
  "Ver",
  "Agregar",
];
const columnsTrainer = [
  "Musculos",
  "Ejercicio",
  "Descripcion",
  "Imagen",
  "Ver",
  "Agregar",
];
export const CreatePlans = ({ setAlertExerciseAdded }) => {
  const dataUser = useStoreUserData((state) => state.userData);
  const nameUser = dataUser.nombre;
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscador

  const [searchPlan, setSearchPlan] = useState("");
  const handleChange = (e) => {
    setSearchPlan(e.target.value);
  };
  useEffect(() => {
    const getExercises = async () => {
      try {
        const dataExercices = await useGetAllExercises();

        setExercises(dataExercices.data);
        setLoading(false);
      } catch (e) {
        console.log(e, "errores");
      }
    };
    getExercises();
  }, []);
  // Filtra los ejercicios según el valor de searchPlan
  const filteredExercises = exercises.filter((exercise) =>
    exercise.nombre.toLowerCase().includes(searchPlan.toLowerCase())
  );
  return (
    <>
      <div className="px-3 mt-0    flex flex-col md:flex-row md:justify-between   md:items-center">
        <div className="flex justify-start items-center gap-2 mb-4">
          <h2 className="text-xl md:text-2xl">{`Plan de ${nameUser}`}</h2>

          <GrPlan className="text-customNavBar text-sm md:text-2xl"></GrPlan>
        </div>

        <div className="flex justify-center items-center gap-1  md:w-1/3">
          <CustomInput
            className="focus:ring-customButtonGreen focus:border-customButtonGreen "
            value={searchPlan}
            onChange={handleChange}
            placeholder="Buscar ejercicio..."
            type="text"
          ></CustomInput>
          <button className="bg-customButtonGreen rounded p-2.5 md:p-2">
            <IoSearchSharp className="text-white  text-lg md:text-2xl font-semibold"></IoSearchSharp>
          </button>
        </div>
      </div>

      <div className="mt-3">
        <BasicTable
          setAlertExerciseAdded={setAlertExerciseAdded}
          loading={loading}
          arreglo={filteredExercises}
          arregloColumns={columnsTrainer}
          action="add"
          textSinEjercicios={"No se encontraron ejercicios en su busqueda"}
          
          admin={true}
        ></BasicTable>
      </div>
    </>
  );
};
