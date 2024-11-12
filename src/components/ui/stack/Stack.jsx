import { CgGym } from "react-icons/cg";

export const Stack = ({
  titulo,
  duracion,
  fechaFinalizacion,
  className,
  Icon,
}) => {
  return (
    <div
      className={`flex items-center cursor-pointer gap-2 md:gap-6 px-2 md:px-2 py-2 bg-customBlue rounded border w-full ${className}`}
    >
      {Icon ? <Icon size={25}></Icon> : <CgGym size={30} />}
      <div className="leading-3">
        <p className="text-sm md:text-lg font-bold text-slate-600">{titulo}</p>
        <span className="text-sm md:text-lg text-slate-600">{duracion}</span>
        {/* <span className="text-sm md:text-lg text-slate-600">estado:Pendiente</span> */}
      </div>
      <p className=" text-sm md:text-base text-black  font-medium ml-auto ">
        {fechaFinalizacion}
      </p>
    </div>
  );
};
