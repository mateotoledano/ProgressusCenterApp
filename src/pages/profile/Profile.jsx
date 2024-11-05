import React from "react";
import { MainLayout } from "../../layout/MainLayout";
import { CiEdit } from "react-icons/ci";
import { CgGym } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { Stack } from "../../components";
import { useStoreUserData } from "../../store";

export const Profile = () => {
  const dataUser = useStoreUserData((state) => state.userData);
  // FILTRAR LOS ROLES
  const roleUser = dataUser.roles.filter((role) => role != "SOCIO");

  return (
    <MainLayout>
      <div className="animate-fade-in-down bg-white md:mx-auto rounded shadow-xl w-full md:w-11/12 overflow-hidden mb-4">
        <div className="h-[190px] bg-gradient-to-r ">
          <img
            src="https://wallpapercave.com/wp/wp8077707.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-4 py-2 flex flex-col gap-3 pb-6">
          <div className="md:h-[150px] h-[90px] shadow-md w-[90px] md:w-[150px] rounded-full border-2 overflow-hidden -mt-14 border-white">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              className="w-full h-full rounded-full object-center object-cover"
            />
          </div>
          <div className="flex w-full gap-5 justify-between mt-3">
            <div>
              <h3 className="text-lg md:text-2xl text-slate-900 relative font-bold leading-6">
                {dataUser.nombre + " " + dataUser.apellido}
              </h3>
              <p className="text-xs md:text-base text-gray-600">
                {dataUser.email}
              </p>
            </div>

            <div className="flex items-center gap-1 md:gap-3 ">
              {roleUser.length == 0 ? (
                <span className="rounded-sm bg-green-100 px-2 py-1 md:px-3 md:py-2 text-xs md:text-base font-semibold text-green-900">
                  SOCIO
                </span>
              ) : (
                roleUser.map((role) => {
                  role == "ADMIN" ? (
                    <span className="rounded-sm bg-yellow-100 px-2 py-1 md:px-3 md:py-2 text-xs md:text-base font-semibold text-yellow-800">
                      ADMIN
                    </span>
                  ) : (
                    role ==
                    ""(
                      <span className="rounded-sm bg-yellow-100 px-2 py-1 md:px-3 md:py-2 text-xs md:text-base font-semibold text-yellow-800">
                        ADMIN
                      </span>
                    )
                  );
                })
              )}
            </div>
          </div>

          <div className="flex gap-5 mt-4">
            <button
              type="button"
              className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-customTextGreen px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 "
            >
              <CiEdit size={25} className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <Link
              to="/notifications"
              type="button"
              className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 hover:bg-gray-100  "
            >
              <div className=" relative cursor-pointer">
                <span className="absolute text-xs md:text-xs rounded-full px-1 font-bold  -top-1 bg-red-700 text-white md:-right-1 -right-3">
                  3
                </span>
                <IoMdNotificationsOutline className="w-5 h-5 md:w-6 md:h-6"></IoMdNotificationsOutline>
              </div>{" "}
            </Link>
          </div>

          <div className="flex flex-col items-center md:text-lg gap-3 mt-5 ">
            <h4 className="text-md font-medium leading-3 mt-6 pb-4 ">
              Planes/Membresias(activas)
            </h4>
            <Stack
              duracion="12 meses"
              titulo="Membresia anual"
              fechaFinalizacion="finaliza el 16/10/2024 "
            ></Stack>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
