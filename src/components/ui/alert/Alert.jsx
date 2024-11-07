import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Alert = ({
  message,
  type = "default",
  position,
  autoclose,
  theme,
}) => {
  if (!message) return null;

  const notify = () => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      default:
        toast(message);
    }
  };

  useEffect(() => {
    if (message) {
      notify();
    }
  }, [message]);

  return (
    <div>
      <ToastContainer position={position} theme={theme} autoClose={autoclose} />
    </div>
  );
};
