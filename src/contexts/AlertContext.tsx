import React, { createContext, useState, ReactNode } from "react";
import Alert from "../components/common/Alert";

interface AlertOptions {
  message: string;
  subMessage?: string;
}

export interface AlertContextValue {
  showAlert: (options: AlertOptions) => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [subMessage, setSubMessage] = useState<string | undefined>(undefined);

  const showAlert = ({ message, subMessage }: AlertOptions) => {
    setMessage(message);
    setSubMessage(subMessage);
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Alert isVisible={isVisible} message={message} subMessage={subMessage} onClose={handleClose} />
    </AlertContext.Provider>
  );
};

export default AlertContext;
