import { CgGym } from "react-icons/cg";

export const Stack = ({ titulo, duracion, fechaFinalizacion , className }) => {
  return (
    <div className={`flex items-center cursor-pointer gap-2 md:gap-6 px-1 md:px-1 py-2 bg-customBlue rounded border w-full ${className}`}>
      <CgGym size={30} />
      <div className="leading-3">
        <p className="text-xs md:text-lg font-bold text-slate-600">{titulo}</p>
        <span className="text-xs md:text-lg text-slate-600">{duracion}</span>
      </div>
      <p className=" text-xs md:text-base text-black  font-medium ml-auto ">
        {fechaFinalizacion}
      </p>
    </div>
  );
};
