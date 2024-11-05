import React from "react";
import { FaFacebookF, FaRegAddressCard } from "react-icons/fa";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { BiLogoPinterestAlt } from "react-icons/bi";
import logo from "/progressus.png";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { GrPlan } from "react-icons/gr";
import { BsMenuButtonWide } from "react-icons/bs";
import { MdOutlineInventory } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Title } from "../title/Title";
export const Footer = () => {
  const iconsTab = [
    { icon: <FaFacebookF /> },
    { icon: <AiOutlineTwitter /> },
    { icon: <AiFillYoutube /> },
    { icon: <BiLogoPinterestAlt /> },
  ];
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
  return (
    <>
      <footer className="bg-customGreenLigth shadow-top font-sans dark:bg-gray-900 mt-6 md:mt-14">
        <div className="container md:px-0 px-2 py-2 mx-auto">
          <section className="flex flex-col md:flex-row w-full justify-between items-end text-gray-800 md:gap-0 gap-4">
            <div className="flex justify-center md:justify-start   w-full md:w-1/3 items-end md:items-center gap-5  ">
              <img src={logo} className="w-[80px] md:w-[125px]" alt="" />
              <div className="font-medium md:text-base text-sm">
                <p className=" w-full ">🏋️ Entrenamiento personalizado</p>
                <p className=" w-full ">💪 Cumple tus metas</p>
                <p className=" w-full ">⭐ Calidad y dedicación</p>
              </div>

              {/* <h2 classNameName="hidden md:block text-xl md:text-2xl">Progressus</h2> */}
            </div>

            <div className="flex flex-col w-full justify-end mt-4 md:mt-0 items-center text-center  md:w-1/3">
              <div className="flex flex-row justify-between md:gap-0 gap-10 md:flex-col md:justify-start ">
                <div className="flex flex-col justify-end ">
                  <span className="font-semibold p-1">Lunes a Viernes </span>
                  <span>08:00 am - 22:00 pm </span>
                </div>
                <div className="flex flex-col justify-end  ">
                  <span className="font-semibold p-1">Sabados </span>
                  <span>08:00 am - 12:00 am </span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 md:mt-0 mt-3   flex gap-28 md:gap-10 justify-center   md:justify-end  font-semibold items-end">
              <div className="flex flex-col items-start justify-end">
                {routeNavigation.slice(0, 4).map((route, index) => (
                  <Link
                    to={route.link}
                    key={index}
                    className="text-start  transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500"
                  >
                    {route.title}{" "}
                    {/* Ajusta esto según la propiedad que quieras mostrar */}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col items-start justify-end">
                {routeNavigation.slice(4, 8).map((route, index) => (
                  <Link
                    to={route.link}
                    key={index}
                    className="text-start  transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500"
                  >
                    {route.title}{" "}
                    {/* Ajusta esto según la propiedad que quieras mostrar */}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <hr className="my-2 border-customTextGreen md:mt-5 dark:border-gray-700 h-2" />

          <div className="sm:flex md:justify-between md:flex-row-reverse sm:items-center sm:justify-between ">
            <div className="flex justify-center md:justify-end gap-4 hover:cursor-pointer">
              <a className="" href="">
                <img
                  src="https://www.svgrepo.com/show/475692/whatsapp-color.svg"
                  width="30"
                  height="30"
                  alt="fb"
                  className="transition-transform duration-300 hover:scale-110 hover:opacity-80"
                />
              </a>

              <a
                target="_blank"
                href="https://www.instagram.com/progressuscenter24?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              >
                <img
                  src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg"
                  width="30"
                  height="30"
                  alt="inst"
                  className="transition-transform duration-300 hover:scale-110 hover:opacity-80"
                />
              </a>
            </div>
            <p className="font-medium pt-3 md:pt-0 text-gray-700 text-start md:text-center text-sm md:text-lg md:p-0">
              © 2024 Progressus. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
