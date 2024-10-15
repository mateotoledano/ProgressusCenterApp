import { useState } from "react";
import "./App.css";
import { Login } from "./pages";
import { Register } from "./pages";
import useStoreSelectAuth from "./store/useStoreSelectAuth";
// import vectorWorld from "/Vector.png";
import logoProgressus from "/progressus.png";
import { LayoutLoginRegister } from "./layout/LayoutLoginRegiste";
function App() {
  const selectedAuth = useStoreSelectAuth((state) => state.auth);
  const setSelectedLogin = useStoreSelectAuth((state) => state.authLogin);
  const setSelectedRegister = useStoreSelectAuth((state) => state.authRegister);

  return (
    <LayoutLoginRegister>
      <div className="animate-fade-in-down w-full min-h-screen items-center  justify-center p-4 bg-[#F0F2F5] md:flex  md:flex-col md:items-start md:justify-start ">
        <div className="flex flex-col gap-4 items-center justify-center  md:mt-0 md:w-full ">
          <img className="w-2/5 md:w-[195px]" src={logoProgressus} alt="" />
          <div className="flex justify-center gap-12 w-full md:gap-24">
            <span
              onClick={() => setSelectedLogin()}
              className={`transition-all font-bold cursor-pointer p-1  ${
                selectedAuth === "login" &&
                "border-b-2 border-customTextGreen text-customTextGreen md:text-lg"
              }`}
            >
              Ingresar
            </span>
            <span
              onClick={() => setSelectedRegister()}
              className={`transition-all font-bold cursor-pointer p-1 ${
                selectedAuth === "register" &&
                "border-b-2 border-customTextGreen text-customTextGreen md:text-lg"
              }`}
            >
              Registrarse
            </span>
          </div>
          {selectedAuth === "login" ? <Login></Login> : <Register></Register>}
        </div>
      </div>
    </LayoutLoginRegister>
  );
}

export default App;
