import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function useToast() {
  return {
    showToast: (message = "", type = "success") =>
      toast[type](message, { position: toast.POSITION.TOP_LEFT }),
    ToastContainer,
  };
}
