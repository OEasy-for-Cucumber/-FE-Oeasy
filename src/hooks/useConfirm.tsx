import ConfirmContext, { ConfirmContextValue } from "@/contexts/ConfirmContext";
import { useContext } from "react";
const useConfirm = (): ConfirmContextValue => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return context;
};

export default useConfirm;
