// ConfirmContext.tsx
import React, { createContext, useState, ReactNode } from "react";
import Confirm from "../components/common/Confirm";

export interface ConfirmContextValue {
  showConfirm: (options: { message: string; subMessage?: string; onConfirm: () => void }) => void;
}

const ConfirmContext = createContext<ConfirmContextValue | undefined>(undefined);

export const ConfirmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [subMessage, setSubMessage] = useState<string | undefined>(undefined);
  const [onConfirmCallback, setOnConfirmCallback] = useState<() => void>(() => {});

  const showConfirm = ({
    message,
    subMessage,
    onConfirm
  }: {
    message: string;
    subMessage?: string;
    onConfirm: () => void;
  }) => {
    setMessage(message);
    setSubMessage(subMessage);
    setOnConfirmCallback(() => onConfirm);
    setIsVisible(true);
  };

  const handleConfirm = () => {
    onConfirmCallback();
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <ConfirmContext.Provider value={{ showConfirm }}>
      {children}
      <Confirm
        isVisible={isVisible}
        message={message}
        subMessage={subMessage}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
};

export default ConfirmContext;
