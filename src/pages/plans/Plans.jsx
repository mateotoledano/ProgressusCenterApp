import React, { useState } from "react";
import { MainLayout } from "../../layout/MainLayout";
import { IoSearchSharp } from "react-icons/io5";

import { GrPlan } from "react-icons/gr";
import {
  Title,
  Location,
  PricingPrices,
  CustomInput,
  Button,
} from "../../components";

export const Plans = () => {
  const [searchPlan, setSearchPlan] = useState("");
  const handleChange = (e)=>{
       setSearchPlan(e.target.value)
  }
  console.log(searchPlan, "search");
  
  return (
    <MainLayout>
      <section className="animate-fade-in-down md:mx-auto bg-white rounded shadow-xl w-full md:w-11/12  overflow-hidden mb-4 flex flex-col ">
        <div className="b p-3 ">
          <Location route={"Planes"} subroute={"Crear Plan"}></Location>
          <Title title={"Crear Plan de Entrenamiento"}></Title>
        </div>
        {/* DIVISION GRAY */}
        <div className="w-full h-2 md:h-4 bg-customGray"></div>

        <div className="p-3 mt-0  flex flex-col md:flex-row md:justify-between  md:items-center">
          <div className="flex justify-start items-center gap-2">
            <h2 className="md:text-xl">{`Plan de Mariano`}</h2>
            <GrPlan className="text-customNavBar text-sm md:text-xl"></GrPlan>
          </div>
          <div className="flex justify-center items-center gap-1 mt-3 md:w-1/3">
            <CustomInput value={searchPlan} onChange={handleChange} placeholder="Buscar ejercicio..."  type="text"></CustomInput>
            <button className="bg-customButtonGreen p-2 md:p-2  rounded">
              <IoSearchSharp className="text-white  text-lg md:text-2xl font-semibold"></IoSearchSharp>{" "}
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
