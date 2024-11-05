import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useStoreUserData } from "../../../store";
import logo from "/progressus.png";
import { useStoreMenu } from "../../../store";
import { Link } from "react-router-dom";
export const TopMenu = () => {
  //ABRIR EL NAVBAR
  const openNavBar = useStoreMenu((state) => state.openNavBar);
  const dataUser = useStoreUserData((state) => state.userData);
  const firstName = dataUser.nombre ? dataUser.nombre.split(" ")[0] : "";
  return (
    <div className="bg-customNavBar md:mb-5 p-2 md:py-2 shadow-xl sticky top-0 flex z-30 justify-between items-center md:items-center font-semibold text-lg text-white">
      <div className="flex justify-center items-center">
        <button>
          <IoMenuSharp
            className="w-8 h-7 md:w-7 md:h-7 cursor-pointer"
            onClick={openNavBar}
            size={22}
          ></IoMenuSharp>
        </button>
      </div>
      <Link
        to={"/home"}
        className="flex justify-center md:justify-start md:ml-2 w-full items-start md:items-center gap-2 mb-1 r "
      >
        <img src={logo} className="w-[55px] md:w-[65px]" alt="" />
        {/* <h2 className="hidden md:block text-xl md:text-2xl">Progressus</h2> */}
      </Link>

      <div className="flex justify-center items-center gap-3 md:gap-8 md:w-1/4 md:justify-end">
        {/* Buscar en desktop */}
        <div className="hidden  md:flex justify-center items-center ">
          <button>
            <IoSearchSharp
              className="w-9 h-9 md:w-7 md:h-7"
              size={22}
            ></IoSearchSharp>
          </button>
        </div>

        <div className=" hidden  md:block relative cursor-pointer">
          <span className="absolute text-xs rounded-full px-1 font-bold -top-1 bg-red-700 text-white -right-1">
            3
          </span>
          <IoMdNotificationsOutline className="w-9 h-9 md:w-7 md:h-7"></IoMdNotificationsOutline>
        </div>
        <Link to="/acount" className="flex items-center gap-2 cursor-pointer">
          <img
            className="w-10  md:w-10 rounded-full cursor-pointer"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="Rounded avatar"
          />
          <span className="hidden lg:block text-lg font-semibold ">
            {firstName}
          </span>
        </Link>
      </div>
    </div>
  );
};
