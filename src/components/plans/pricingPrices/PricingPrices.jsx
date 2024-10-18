import React from "react";
import gym from "/gym.svg";
import { CgGym } from "react-icons/cg";
export const PricingPrices = () => {
  const cards = [
    {
      title: "Membresia Mensual",
      price: 10000,
      popular: false,
      list: [
        "Entrada a todas las secciones del gym",
        "Acceso a una clase grupal mensual gratis",
        "Descuento del 5% en la tienda del gimnasio",
      ],
    },
    {
      title: "Membresia Trimestral",
      price: 20000,
      popular: false,
      list: [
        "Entrada a todas las secciones del gym",
        "Acceso a dos clases grupales mensuales gratis",
        "Una sesión de asesoramiento nutricional gratuita",
      ],
    },
    {
      title: "Membresia Semestral",
      price: 40000,
      popular: true,
      list: [
        "Entrada a todas las secciones del gym",
        "Acceso ilimitado a clases grupales",
        "Tres sesiones de entrenamiento personal gratis",
        "Descuento del 10% en productos de la tienda del gimnasio",
      ],
    },
    {
      title: "Membresia Anual",
      price: 80000,
      popular: false,
      list: [
        "Entrada a todas las secciones del gym",
        "Acceso ilimitado a clases grupales",
        "Cinco sesiones de entrenamiento personal gratis",
        "Descuento del 15% en la tienda del gimnasio",
        "Una evaluación física gratuita al año",
      ],
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center md:items-start gap-10 md:gap-5 md:flex-row w-full">
      {cards.map((card) => {
        return (
          <div
            key={card.title}
            class="max-w-sm  w-full transition duration-300 transform hover:scale-105"
          >
            <div class="relative group ">
              <div class="absolute -inset-0 bg-gradient-to-r  from-green-600 to-blue-600 rounded-lg blur opacity-20 group-hover:opacity-80 transition duration-1000 group-hover:duration-200"></div>
              <div class="relative px-7 py-6 bg-white ring-1  ring-gray-900/5 rounded-lg leading-none flex flex-col items-top justify-start space-y-6">
                <div class="flex justify-between items-center">
                  <span class="text-lg font-bold text-gray-900">
                    {card.title}
                  </span>
                  {card.popular && (
                    <span class="px-3 py-1 text-sm text-white bg-customTextBlue rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <div class="text-4xl font-bold text-gray-900">
                  ${card.price}
                  <span class="text-lg font-normal text-gray-600"></span>
                </div>
                <ul className="space-y-3">
                  {card.list.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center text-start text-sm"
                    >
                      <svg
                        className="w-5 h-5 text-customTextBlue mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {item} {/* Aquí muestras el contenido del item */}
                    </li>
                  ))}
                </ul>

                <button class="w-full py-3 font-bold text-white bg-customTextGreen rounded-lg">
                  Elegir plan
                </button>
                {card.popular && (
                  <div class="absolute -top-16 right-0 -mt-4 -mr-6 w-16 h-16 float-animation">
                    <CgGym className="w-full h-full object-cover rounded-full "></CgGym>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
