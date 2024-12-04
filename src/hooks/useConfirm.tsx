import { useContext } from "react";
import ConfirmContext, { ConfirmContextValue } from "../contexts/ConfirmContext";

const useConfirm = (): ConfirmContextValue => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
};

export default useConfirm;
