import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "../ui/buttons/Button";

import { CgGym } from "react-icons/cg";
import { useSpring, animated } from "@react-spring/web";
import { IoIosTimer } from "react-icons/io";
import { CustomInput } from "../ui/input/CustomInput";
import { useStoreUserData } from "../../store";
import { useStorePlanCreado } from "../../store/useStorePlanCreado";
import { useCreatePlan } from "../../service/plans/useCreatePlan";
import { useAddExercises } from "../../service/plans/useCreatePlan";
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

export const ModalAddToPlan = ({
  open,
  setOpen,
  setAlertExerciseAdded,
  ejercicioAgregado,
}) => {
  const dataUser = useStoreUserData((state) => state.userData);
  const planCreado = useStorePlanCreado((state) => state.planCreado);

  const setPlanCreado = useStorePlanCreado((state) => state.setPlanCreado);
  const updateExercise = useStorePlanCreado((state) => state.updateExercise);

  const nameUser = dataUser.nombre;
  const [form, setForm] = useState({
    numeroDiaDelPlan: null,
    ordenDelEjercicio: null,
    series: null,
    repeticiones: null,
  });
 
  const handleClose = () => setOpen(false);
  const onSubmitSendPlan = async (e) => {
    e.preventDefault();
    setPlanCreado(ejercicioAgregado);
    updateExercise(ejercicioAgregado.id, form);
    setOpen(false);
    setAlertExerciseAdded(true);
    // RESETEAR EL FORM
    setForm({
      numeroDiaDelPlan: null,
      ordenDelEjercicio: null,
      series: null,
      repeticiones: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

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
              <div className="w-full p-[2px] absolute top-0 justify-start">
                <CgGym size={32}></CgGym>
              </div>
              <h1 className="text-xl">
                {ejercicioAgregado && ejercicioAgregado.nombre}
              </h1>
              <CustomInput
                required={true}
                type="number"
                name={"numeroDiaDelPlan"}
                value={form.numeroDiaDelPlan}
                placeholder={"Dia al que pertenece"}
                onChange={handleChange}
              ></CustomInput>
              <CustomInput
                required={true}
                name={"ordenDelEjercicio"}
                value={form.ordenDelEjercicio}
                placeholder={"Orden en el que va el ejercicio"}
                type="number"
                onChange={handleChange}
              ></CustomInput>
              <CustomInput
                required={true}
                type="number"
                placeholder={"Series"}
                name={"series"}
                value={form.series}
                onChange={handleChange}
              ></CustomInput>
              <CustomInput
                required={true}
                type="number"
                placeholder={"Repeticiones"}
                name={"repeticiones"}
                value={form.repeticiones}
                onChange={handleChange}
              ></CustomInput>
              <Button
                label="Agregar al Plan"
                type="submit"
                className="px-[7px] py-[5px] md:px-2 md:py-2 text-sm md:text-sm"
              ></Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
