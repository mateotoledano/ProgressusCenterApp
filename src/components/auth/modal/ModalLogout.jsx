import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { RiLogoutBoxLine } from "react-icons/ri";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { useStoreUser, useStoreUserData, useStoreMenu } from "../../../store";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../ui/buttons/Button";
import { useMembershipStore } from "../../../store/useStoreMembership";
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
  boxShadow: 20,
  p: 2,
};
export const ModalLogout = ({ openModalLogout, setOpenModalLogout }) => {
  const closeSession = useStoreUser((state) => state.clearToken);
  const clearUserData = useStoreUserData((state) => state.clearUserData);
  const closeNavBar = useStoreMenu((state) => state.closeNavBar);
  const setMembershipData = useMembershipStore((state) => state.setMembershipData);
  const navigate = useNavigate();
  const handleClose = () => setOpenModalLogout(false);
  const handleLogout = () => {
    closeSession();
    clearUserData();
    closeNavBar(false);
    setMembershipData(null);
    navigate("/");
  };

  return (
    <div>
      <Modal
        open={openModalLogout}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center mb-3">
            <Typography
              id="modal-modal-title"
              fontWeight="500"
              variant="h6"
              component="h2"
            >
              ¿Seguro que quieres salir de tu cuenta?
            </Typography>
          </div>
          <div className=" flex justify-center">
            <Button
              onClick={handleLogout}
              Icon={RiLogoutBoxLine}
              classNameIcon=""
              label="Salir"
              className="bg-red-600 hover:bg-red-700 flex items-center gap-1 px-1"
            ></Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

// const Fade = React.forwardRef(function Fade(props, ref) {
//   const {
//     children,
//     in: open,
//     onClick,
//     onEnter,
//     onExited,
//     ownerState,
//     ...other
//   } = props;
//   const style = useSpring({
//     from: { opacity: 0 },
//     to: { opacity: open ? 1 : 0 },
//     config: { tension: 300, friction: 40 }, // Ajusta estos valores para probar
//     onStart: () => {
//       if (open && onEnter) {
//         onEnter(null, true);
//       }
//     },
//     onRest: () => {
//       if (!open && onExited) {
//         onExited(null, true);
//       }
//     },
//   });

//   return (
//     <animated.div ref={ref} style={style} {...other}>
//       {React.cloneElement(children, { onClick })}
//     </animated.div>
//   );
// });

// Fade.propTypes = {
//   children: PropTypes.element.isRequired,
//   in: PropTypes.bool,
//   onClick: PropTypes.any,
//   onEnter: PropTypes.func,
//   onExited: PropTypes.func,
//   ownerState: PropTypes.any,
// };

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: window.innerWidth < 700 ? "76%" : 800,
//   maxWidth: 400,
//   bgcolor: "#E6F7FF",
//   border: "1px solid #1890FF",
//   borderRadius: "8px",
//   boxShadow: 24,
//   p: 2,
// };

// export const ModalLogout = ({ openModalLogout, setOpenModalLogout }) => {
//   const closeSession = useStoreUser((state) => state.clearToken);
//   const clearUserData = useStoreUserData((state) => state.clearUserData);
//   const navigate = useNavigate();
//   const handleClose = () => setOpenModalLogout(false);
//   const handleLogout = () => {
//     closeSession();
//     clearUserData();
//     navigate("/");
//   };
//   return (
//     <div>
//       <Modal
//         aria-labelledby="spring-modal-title"
//         aria-describedby="spring-modal-description"
//         open={openModalLogout}
//         onClose={handleClose}
//         closeAfterTransition
//         slots={{ backdrop: Backdrop }}
//         slotProps={{
//           backdrop: {
//             TransitionComponent: Fade,
//           },
//         }}
//       >
//         <Fade in={openModalLogout}>
//           <Box sx={style}>
//             <Typography id="spring-modal-title" variant="h6" component="h2">
//               Estas seguro de que quieres cerrar sesion ?
//             </Typography>
//             <Button className="bg-red-700" Icon={RiLogoutBoxLine}></Button>
//           </Box>
//         </Fade>
//       </Modal>
//     </div>
//   );
// };
