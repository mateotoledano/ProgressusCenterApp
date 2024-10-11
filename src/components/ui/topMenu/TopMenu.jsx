import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import useStoreMenu from "../../../store/useStoreMenu";
export const TopMenu = () => {
  const navBar = useStoreMenu((state) => state.navBar);
  const openNavBar = useStoreMenu((state) => state.openNavBar);

  return (
    <div className="bg-customNavBar p-3 md:py-3 shadow-2xl flex justify-between items-end md:items-center font-semibold text-lg text-white">
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
        <div className="flex items-center gap-2 ">
          <img
            className="w-10  md:w-10 rounded-full cursor-pointer"
            src="https://s3-alpha-sig.figma.com/img/d3cb/19c0/a69c0dc2445bb8e7c73edd99c09aef09?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=L21pN7pKDHji-Ziq~z4rgbPFHAxXHF-uMTzwHZM6~Eta79vxm-N0huPHOiwJFO-8uAgK9~VLtm976PvvnXWqJjjivHSgLTWkxy~289FgrxQF6OcjLjr6APZifcowqsU9mBIPeSqpUssC2KguEAMvW5u9xnajX05DIfXkEl3bIOhIZL2koKjdonfoFIscZca2YV8nMQoq7lEX2A5ekplmDVN5UA9AoRQ0BfeKfAWIXfHfCFjfnnbIa~iBAGpM2B4Zwul6wO4O~R5sFdfW9Fv5KvuO7GLS1kJfbK3O4~7xvXB7H25JcRBs6rkItxYFKwIiGcoR3GhkK3D8IVmygEO1nA__"
            alt="Rounded avatar"
          />
          <span className="hidden lg:block text-lg font-normal ">Mariano</span>
        </div>
      </div>
    </div>
  );
};
