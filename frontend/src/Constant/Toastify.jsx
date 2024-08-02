import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const success = (msg, autoClose = 2000, position = "top-right") =>
  toast.success(msg, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: false,
    progress: undefined,
  });

export const failed = (msg, autoClose = 2000, position = "top-right") => {
  if (msg == "Unauthorized") {
    // store.dispatch(userlogout())
  } else {
    toast.error(msg, {
      position,
      autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: false,
      progress: undefined,
    });
  }
};

export const info = (msg, autoClose = 2000, position = "top-right") => {
  const toastId = 'unique-toast-id';
  const existingToast = toast.isActive(toastId);
  if (existingToast) {
    toast.update(existingToast, {
      render: msg,
    });
  } else {
    toast.info(msg, {
      toastId,
      position,
      autoClose,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: false,
      progress: undefined,
    });
  }
};

