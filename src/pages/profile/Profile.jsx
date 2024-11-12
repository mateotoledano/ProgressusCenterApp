import React, { useEffect, useState } from "react";
import { MainLayout } from "../../layout/MainLayout";

import { Stack } from "../../components";
import { useStoreUserData } from "../../store";
import { useGetRequestPaymentSocio } from "../../service/membership/useGetRequestPaymentSocio";

export const Profile = () => {
  const dataUser = useStoreUserData((state) => state.userData);
  const [dataMembership, setDataMembership] = useState(null);
  const [allMembership, setAllMembership] = useState(null);

  const roleUser = dataUser.roles.filter((role) => role != "SOCIO");
  console.log(dataUser, "data user");

  useEffect(() => {
    try {
      const traerMembresiaActiva = async () => {
        const response = await useGetRequestPaymentSocio(
          dataUser.identityUserId
        );
        if (response.data?.value?.value) {
          setDataMembership(response.data.value.value);
          setAllMembership(
            response.data.value.value.historialSolicitudDePagos || []
          );
        }
      };
      traerMembresiaActiva();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const lastMembership =
    Array.isArray(allMembership) && allMembership.length > 0
      ? allMembership[allMembership.length - 1]
      : null;
  console.log(lastMembership, "last membership");

  let fechaDondeSeActivoMembresia;
  let mesesDuracionMembresia;
  if (
    lastMembership &&
    lastMembership.estadoSolicitud.nombre === "Confirmado"
  ) {
    fechaDondeSeActivoMembresia = new Date(lastMembership.fechaCambioEstado);
    mesesDuracionMembresia = dataMembership.membresia.mesesDuracion;
  }

  // Calcular la fecha de finalización de la membresía
  let fechaFinalizacionMembresia = null;
  if (fechaDondeSeActivoMembresia && mesesDuracionMembresia) {
    // Sumar los meses a la fecha de activación
    fechaFinalizacionMembresia = new Date(fechaDondeSeActivoMembresia);
    fechaFinalizacionMembresia.setMonth(
      fechaFinalizacionMembresia.getMonth() + mesesDuracionMembresia
    );
  }

  // Formatear la fecha de finalización (opcional)
  const fechaFinal = fechaFinalizacionMembresia
    ? `${fechaFinalizacionMembresia.getDate()}/${
        fechaFinalizacionMembresia.getMonth() + 1
      }/${fechaFinalizacionMembresia.getFullYear()}`
    : "Fecha no disponible";

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
              {/* HARDCODE */}
              {dataUser.email === "frantrainer15@gmail.com" ? (
                <span className="rounded-sm bg-yellow-100 px-2 py-1 md:px-3 md:py-2 text-xs md:text-base font-semibold text-yellow-800">
                  ADMIN
                </span>
              ) : roleUser.length === 0 ? (
                <span className="rounded-sm bg-green-100 px-2 py-1 md:px-3 md:py-2 text-xs md:text-base font-semibold text-green-900">
                  SOCIO
                </span>
              ) : (
                roleUser.map((role) => {
                  return role === "ADMIN" ? (
                    <span
                      key={role}
                      className="rounded-sm bg-yellow-100 px-2 py-1 md:px-3 md:py-2 text-xs md:text-base font-semibold text-yellow-800"
                    >
                      ADMIN
                    </span>
                  ) : null;
                })
              )}
            </div>
          </div>
          {/* HARDCODE */}
          {dataUser.email !== "frantrainer15@gmail.com" && (
            <div className="flex flex-col items-center md:text-lg gap-3 mt-5 ">
              <h4 className="text-md font-medium leading-3 mt-6 pb-4 ">
                Membresias(activas)
              </h4>
              {allMembership &&
              Array.isArray(allMembership) &&
              allMembership.length > 0 &&
              lastMembership.estadoSolicitud.nombre === "Confirmado" ? (
                <Stack
                  duracion={`${mesesDuracionMembresia} ${
                    mesesDuracionMembresia === 1 ? "mes" : "meses"
                  }`}
                  titulo={`${dataMembership.membresia.nombre}`}
                  fechaFinalizacion={`finaliza el ${fechaFinal}`}
                />
              ) : (
                <Stack titulo="No tienes membresias activas" />
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
