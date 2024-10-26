import React from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom"; // Cambiado a useNavigate para redirigir manualmente
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";
import { BsMenuButtonWide } from "react-icons/bs";
import { MdOutlineInventory } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";
import { GrPlan } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import clsx from "clsx";
import { useStoreMenu, useStoreUser } from "../../../store";

export const NavBar = () => {
  // CERRAR SESION
  const closeSession = useStoreUser((state) => state.clearToken);

  const location = useLocation();
  const path = location.pathname;
  const menu = useStoreMenu((state) => state.navBar);
  const close = useStoreMenu((state) => state.closeNavBar);
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("holaaaa");

    closeSession();
  };
  const routeNavigation = [
    {
      title: "Inicio",
      icon: <GoHome />,
      link: "/home",
    },
    {
      title: "Mi cuenta",
      icon: <CgProfile />,
      link: "/acount",
    },
    {
      title: "Membresias",
      icon: <FaRegAddressCard />,
      link: "/membership",
    },
    {
      title: "Planes",
      icon: <GrPlan />,
      link: "/plans",
    },
    {
      title: "Turnos",
      icon: <BsMenuButtonWide />,
      link: "/turns",
    },
    {
      title: "Inventario",
      icon: <MdOutlineInventory />,
      link: "/inventary",
    },
    {
      title: "Estadisticas",
      icon: <IoStatsChartOutline />,
      link: "/stats",
    },
    {
      title: "Notificaciones",
      icon: <IoMdNotificationsOutline />,
      link: "/notifications",
    },
  ];

  const handleLinkClick = (link) => {
    close();
    setTimeout(() => {
      navigate(link);
    }, 200);
  };

  return (
    <div className="">
      {menu && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-5" />
      )}
      {menu && (
        <div
          onClick={close}
          className="fade-in fixed top-0 cursor-pointer left-0 w-screen h-screen z-40 backdrop-filter backdrop-blur-sm"
        ></div>
      )}
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
        />
        <div className="flex flex-row-reverse justify-end gap-5 mt-5 mb-5 items-center ">
          <div className="cursor-pointer">
            <IoSearchOutline size={26} />
          </div>
          <div onClick={handleLogout} className="cursor-pointer ">
            <BiLogOut size={26} />
          </div>
        </div>
        {routeNavigation.map((item) => (
          <div
            key={item.link}
            onClick={() => handleLinkClick(item.link)}
            className={clsx(
              "flex items-center mt-7 p-1 trans-hover rounded-md hover:bg-gray-100 transition-all cursor-pointer",
              {
                "bg-customBlue text-customTextBlue font-semibold":
                  path === item.link,
              }
            )}
          >
            {item.icon}
            <span className="ml-3 text-lg md:text-xl">{item.title}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};
