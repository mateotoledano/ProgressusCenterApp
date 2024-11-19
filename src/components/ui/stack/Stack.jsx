import { CgGym } from "react-icons/cg";

export const Stack = ({
  titulo,
  duracion,
  fechaFinalizacion,
  className,
  Icon,
  classNameText
}) => {
  return (
    <div
      className={`flex items-center cursor-pointer gap-2 md:gap-6 px-2 mx-3 md:px-2 py-2 bg-customBlue rounded border w-full ${className}`}
    >
      {Icon ? <Icon size={25}></Icon> : <CgGym size={30} />}
      <div className="leading-3">
        <p className="text-sm md:text-lg font-bold text-slate-600">{titulo}</p>
        <span className="text-sm md:text-lg text-slate-600">{duracion}</span>
        {/* <span className="text-sm md:text-lg text-slate-600">estado:Pendiente</span> */}
      </div>
      <p className={`${classNameText} text-sm md:text-xl text-black  font-semibold ml-auto `}>
        {fechaFinalizacion}
      </p>
    </div>
  );
};
