import React from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
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
import useStoreUser from "../../../store/useStoreUser";
export const NavBar = () => {
  const closeSession = useStoreUser((state) => state.clearToken);
  const location = useLocation();
  const path = location.pathname;
  const logout = () => {
    closeSession();
  };
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
          className="fade-in fixed top-0 cursor-pointer left-0 w-screen h-screen z-40 backdrop-filter backdrop-blur-sm"
        ></div>
      )}
      {/* NAVBAR */}
      <nav
        className={clsx(
          "fixed p-5 left-0 top-0 w-[230px] md:w-[350px] min-h-screen bg-white z-40 shadow-2xl transform transition-all duration-300",
          { "-translate-x-full": !menu }
        )}
      >
        <IoCloseOutline
          size={30}
          className="absolute top-1 right-1 cursor-pointer"
          onClick={close}
        ></IoCloseOutline>
        <div className="flex flex-row-reverse justify-end gap-5 mt-5 mb-5 items-center ">
          <div className="cursor-pointer">
            <IoSearchOutline size={26}></IoSearchOutline>
          </div>
          <div onClick={logout} className="cursor-pointer ">
            <BiLogOut size={26}></BiLogOut>
          </div>
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
      </nav>
    </div>
  );
};
