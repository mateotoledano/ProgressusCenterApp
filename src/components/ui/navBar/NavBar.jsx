import React from "react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";
import { BsMenuButtonWide } from "react-icons/bs";
import { MdOutlineInventory } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";
import { GrPlan } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import clsx from "clsx";
import useStoreMenu from "../../../store/useStoreMenu";
export const NavBar = () => {
  const location = useLocation();
  const path = location.pathname;

  const routeNavigation = [
    {
      title: "Inicio",
      icon: <GoHome></GoHome>,
      link: "/home",
    },
    {
      title: "Mi cuenta",
      icon: <CgProfile></CgProfile>,
      link: "/acount",
    },
    {
      title: "Membresias",
      icon: <FaRegAddressCard></FaRegAddressCard>,
      link: "/membership",
    },
    {
      title: "Planes",
      icon: <GrPlan></GrPlan>,
      link: "/plans",
    },
    {
      title: "Turnos",
      icon: <BsMenuButtonWide></BsMenuButtonWide>,
      link: "/turns",
    },
    {
      title: "Inventario",
      icon: <MdOutlineInventory></MdOutlineInventory>,
      link: "/inventary",
    },
    {
      title: "Estadisticas",
      icon: <IoStatsChartOutline></IoStatsChartOutline>,
      link: "/stats",
    },
    {
      title: "Notificaciones",
      icon: <IoMdNotificationsOutline></IoMdNotificationsOutline>,
      link: "/notifications",
    },
  ];
  const menu = useStoreMenu((state) => state.navBar);
  const close = useStoreMenu((state) => state.closeNavBar);
  return (
    <div className="">
      {/* BLACK BACKGROUND */}
      {menu && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-10" />
      )}

      {/* BLUR */}
      {menu && (
        <div
          onClick={close}
          className="fade-in fixed top-0 cursor-pointer left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        ></div>
      )}

      <nav
        className={clsx(
          "fixed p-5 left-0 top-0 w-[230px] md:w-[350px] min-h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          { "-translate-x-full": !menu }
        )}
      >
        <IoCloseOutline
          size={35}
          className="absolute top-5 right-1 cursor-pointer"
          onClick={close}
        ></IoCloseOutline>
        <div className="relative mt-10">
          <IoSearchOutline
            size={22}
            className="absolute  bottom-2 "
          ></IoSearchOutline>
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-8 py-1 pr-10 border-b-2 text-lg border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        {routeNavigation.map((item) => {
          return (
            <Link
              to={item.link}
              key={item.link}
              className={clsx(
                "flex items-center mt-7 p-1  rounded-md hover:bg-gray-100 transition-all ",
                {
                  "bg-customBlue text-customTextBlue font-semibold":
                    path == item.link,
                }
              )}
            >
              {item.icon}
              <span className="ml-3 text-lg  p-0 ">{item.title}</span>
            </Link>
          );
        })}

        {/* <Link
          href={"/"}
          className="flex items-center mt-7 p-2 rounded-md hover:bg-gray-100 transition-all "
        >
          <IoTicketOutline size={20}></IoTicketOutline>
          <span className="ml-3 text-lg ">Ordenes</span>
        </Link>
        <Link
          href={"/"}
          className="flex items-center mt-7 p-2 rounded-md hover:bg-gray-100 transition-all "
        >
          <IoLogInOutline size={20}></IoLogInOutline>
          <span className="ml-3 text-lg ">Ingresar</span>
        </Link>
        <Link
          href={"/"}
          className="flex items-center mt-7 p-2 rounded-md hover:bg-gray-100 transition-all "
        >
          <IoLogOutOutline size={20}></IoLogOutOutline>
          <span className="ml-3 text-lg ">Salir</span>
        </Link>

        <div className="h-px w-full bg-gray-200 my-5"></div>

        <Link
          href={"/"}
          className="flex items-center mt-7 p-2 rounded-md hover:bg-gray-100 transition-all "
        >
          <IoShirtOutline size={20}></IoShirtOutline>
          <span className="ml-3 text-lg ">Products</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center mt-7 p-2 rounded-md hover:bg-gray-100 transition-all "
        >
          <IoTicketOutline size={20}></IoTicketOutline>
          <span className="ml-3 text-lg ">Ordenes</span>
        </Link>

        <Link
          href={"/"}
          className="flex items-center mt-7 p-2 rounded-md hover:bg-gray-100 transition-all "
        >
          <IoPeopleOutline size={20}></IoPeopleOutline>
          <span className="ml-3 text-lg ">Usuarios</span>
        </Link> */}
      </nav>
    </div>
  );
};
