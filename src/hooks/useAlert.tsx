import { useContext } from "react";
import AlertContext, { AlertContextValue } from "../contexts/AlertContext";

const useAlert = (): AlertContextValue => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export default useAlert;