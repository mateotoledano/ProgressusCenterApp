import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { Title, Location, Button } from "../../components";
import { IoMdAdd } from "react-icons/io";
import { TableExercices } from "../../components/exercices/TableExercices";
import { useGetAllMuscles } from "../../service/exercices/useGetAllMuscles";
import { useGetAllMuscleGroups } from "../../service/exercices/useGetAllMuscleGroups";
import { ModalAddGroupMuscle } from "../../components";
import { CgGym } from "react-icons/cg";
import { useGetAllExercises } from "../../service/plans/useGetExercises";
export const Exercices = () => {
  const [selectNav, setSelectNav] = useState("Grupo muscular");
  const [textButton, setTextButton] = useState("grupo muscular");
  const [loading, setLoading] = useState(false);
  const [gruposMusculares, setGruposMusculares] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const [exercices, setExercices] = useState([]);

  // MODAL PARA AGREGAR EJERCICIO
  const [openModalAgregarPlan, setOpenModalAgregarGrupo] = useState(false);
  useEffect(() => {
    const fetchExercices = async () => {
      setLoading(true);
      try {
        //  TRAER GRUPOS MUSCULARES
        const responseGruposMusculares = await useGetAllMuscleGroups();
        setGruposMusculares(responseGruposMusculares?.data);
        // TRAER MUSCULOS
        const responseAllMuscles = await useGetAllMuscles();
        console.log(responseAllMuscles, "resp all muscles");

        setMuscles(responseAllMuscles?.data);
        // TRAER EJERCICIOS
        const responseExercices = await useGetAllExercises();
        setExercices(responseExercices?.data);
      } catch (e) {
        console.log(e, "errores");
      } finally {
        setLoading(false);
      }
    };
    fetchExercices();
  }, []);
  const arregloColumnsExercices = [
    "Nombre",
    "Descripcion",
    "Musculos por ejercicio",
    "Acciones",
  ];
  const arregloGropuMuscle = [
    "Nombre",
    "Descripcion",
    "Musculos del grupo",
    "Imagen",
    "Acciones",
  ];
  const arregloMuscles = [
    "Nombre",
    "Descripcion",
    "Grupo muscular",
    "Imagen",
    "Acciones",
  ];
  console.log(gruposMusculares, "grupos musc", muscles, "muscles");
  const addElement = () => {
    if (selectNav === "Grupo muscular") {
      setOpenModalAgregarGrupo(true);
    }
  };
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white  rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-20">
        <div className="b p-3">
          <Location
            route={`Ejercicios`}
            subroute={"Crear ejercicios"}
          ></Location>

          <Title title={"Ejercicios"}></Title>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>
        {/* ////////////////////////////////////////////// */}
        <div className="p-3 mb-3 w-full flex flex-col  justify-center md:justify-center items-center gap- md:gap-5  ">
          <div className="p-3 mb-0 w-full flex justify-center md:justify-center items-center gap-5 md:gap-12  ">
            <span
              onClick={() => {
                setSelectNav("Grupo muscular");
                setTextButton("Grupo muscular");
              }}
              className={`transition-all font-bold cursor-pointer p-1  ${
                selectNav === "Grupo muscular" &&
                "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
              }`}
            >
              Grupo muscular
            </span>

            <span
              onClick={() => {
                setSelectNav("Musculo");
                setTextButton("Musculo");
              }}
              className={`transition-all font-bold cursor-pointer p-1 ${
                selectNav === "Musculo" &&
                "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
              }`}
            >
              Musculo
            </span>
            <span
              onClick={() => {
                setSelectNav("Ejercicio");
                setTextButton("Ejercicio");
              }}
              className={`transition-all font-bold cursor-pointer p-1 ${
                selectNav === "Ejercicio" &&
                "border-b-2 border-customTextBlue text-customTextBlue md:text-lg"
              }`}
            >
              Ejercicio
            </span>
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-between w-full">
            {/* <div className="w-full flex justify-start gap-1 items-center">
              <Title
                className={
                  "  underline flex justify-start mb-1 text-customTextGreen w-full text-start "
                }
                title={"Todos los ejercicios"}
              >
                {" "}
              </Title>
              <CgGym className="text-3xl"></CgGym>
            </div> */}
            <div className="flex mt-3 md:mt-0 justify-end w-full">
              <Button
                onClick={addElement}
                className="flex  justify-start items-center gap-1 "
                Icon={IoMdAdd}
                label={`Añadir ${textButton}`}
              ></Button>
            </div>
          </div>
        </div>
        {selectNav === "Grupo muscular" ? (
          <TableExercices
            arregloColumns={arregloGropuMuscle}
            selectNav={selectNav}
            arreglo={gruposMusculares}
          ></TableExercices>
        ) : selectNav === "Musculo" ? (
          <TableExercices
            arreglo={muscles}
            arregloColumns={arregloMuscles}
            selectNav={selectNav}
          ></TableExercices>
        ) : (
          <TableExercices
            selectNav={selectNav}
            loading={loading}
            arregloColumns={arregloColumnsExercices}
            arreglo={exercices}
          ></TableExercices>
        )}
      </section>
      {/* MODAL PARA AGREGAR GRUPO MUSCULAR */}
      <ModalAddGroupMuscle
        open={openModalAgregarPlan}
        setGroupMuscles = {setGruposMusculares}
        setOpen={setOpenModalAgregarGrupo}
      ></ModalAddGroupMuscle>
    </MainLayout>
  );
};
