import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import useStoreMenu from "../../../store/useStoreMenu";
import { Link } from "react-router-dom";
export const TopMenu = () => {
  const navBar = useStoreMenu((state) => state.navBar);
  const openNavBar = useStoreMenu((state) => state.openNavBar);

  return (
    <div className="bg-customNavBar md:mb-5 p-3 md:py-3 shadow-xl sticky top-0 flex z-30 justify-between items-end md:items-center font-semibold text-lg text-white">
      <div className="flex justify-center items-center">
        <button>
          <IoMenuSharp
            className="w-8 h-8 md:w-7 md:h-7"
            onClick={openNavBar}
            size={22}
          ></IoMenuSharp>
        </button>
      </div>
      <div className="flex justify-center md:justify-start md:ml-2 w-full items-start mb-1 md:items-center ">
        <h2 className="text-xl md:text-2xl">Progressus</h2>
      </div>

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
          <span className="hidden lg:block text-lg font-normal ">Mariano</span>
        </Link>
      </div>
    </div>
  );
};
