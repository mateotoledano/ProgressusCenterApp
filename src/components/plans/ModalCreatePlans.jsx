import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "../ui/buttons/Button";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { IoIosTimer } from "react-icons/io";
import { CustomInput } from "../ui/input/CustomInput";
import { useStoreUserData } from "../../store";
import { useStorePlanCreado } from "../../store/useStorePlanCreado";
import { useCreatePlan } from "../../service/plans/useCreatePlan";
import { useAddExercises } from "../../service/plans/useCreatePlan";
import { ButtonSpinner } from "../ui/buttons/ButtonSpinner";
const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth < 700 ? "76%" : 800,
  maxWidth: 400,
  bgcolor: "#E6F7FF",
  border: "1px solid #1890FF",
  borderRadius: "8px",
  boxShadow: 24,
  p: 2,
};

export const ModalCreatePlans = ({
  open,
  setOpen,
  setAlertCreate,
  setErrorServer,
}) => {
  const dataUser = useStoreUserData((state) => state.userData);
  const planCreado = useStorePlanCreado((state) => state.planCreado);
  const clearPlanActual = useStorePlanCreado((state) => state.clearPlan);
  // loading del button
  const [loading, setLoading] = useState(false);
  const nameUser = dataUser.nombre;
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    objetivoDelPlanId: 1,
    diasPorSemana: null,
    dueñoId: dataUser.identityUserId,
  });
  const handleClose = () => setOpen(false);
  const onSubmitSendPlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // CREAR PLAN PRIMERAMENTE
      const responseSendPlan = await useCreatePlan(form);
      let idPlan;
      let responseAddExercices;

      // SI ES STATUS 200 AGREGA LOS EJERCICIOS QUE AGREGO EL USUARIO
      if (responseSendPlan.status == "200") {
        idPlan = responseSendPlan.data.id;
        responseAddExercices = await useAddExercises(idPlan, planCreado);
        console.log(responseAddExercices, "resp añadir ejercicios");
      }

      // SI ES CORRECTO EL AGREGAR EJERCICIOS CIERRA EL MODAL Y MANDA LOS DATOS AL BACKEND
      if (
        responseAddExercices &&
        responseAddExercices.status == "200" &&
        responseSendPlan &&
        responseSendPlan.status == "200"
      ) {
        setAlertCreate(true);
        setOpen(false);
        clearPlanActual();
      } else {
        console.log("Error en la creación del plan o en el agregar ejercicios");
        setErrorServer(true);
      }
    } catch (error) {
      console.error("Error al crear el plan o agregar ejercicios:", error);
      setErrorServer(true);
    } finally {
      setLoading(false);
      // Este bloque se ejecuta siempre, haya o no error
      // Aquí puedes poner tareas como resetear el estado de carga, cerrar el spinner, etc.
      console.log("Proceso de creación de plan finalizado");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value, 10);

    if (name === "diasPorSemana" && (numericValue < 1 || numericValue > 7)) {
      return; // Ignora valores fuera del rango
    }

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form
              onSubmit={onSubmitSendPlan}
              className="flex flex-col justify-center items-center text-center gap-3"
            >
              {/* <div className="w-full p-[2px] absolute top-0 justify-start">
                <IoIosTimer size={28}></IoIosTimer>
              </div> */}
              <CustomInput
                required={true}
                name={"nombre"}
                value={form.nombre}
                placeholder={"Nombre del Plan"}
                onChange={handleChange}
              ></CustomInput>
              <CustomInput
                required={true}
                name={"descripcion"}
                value={form.descripcion}
                placeholder={"Descripcion"}
                onChange={handleChange}
              ></CustomInput>
              <CustomInput
                required={true}
                type="number"
                placeholder={"Dias por semana"}
                name={"diasPorSemana"}
                value={form.diasPorSemana}
                onChange={handleChange}
              ></CustomInput>
              <ButtonSpinner
                label="Crear Plan"
                type="submit"
                loading={loading}
                className=""
              ></ButtonSpinner>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
