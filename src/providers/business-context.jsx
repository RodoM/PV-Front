import { createContext, useContext, useState } from "react";

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [business, setBusiness] = useState(null);

  const clearBusiness = () => {
    setBusiness(null);
  };

  return (
    <BusinessContext.Provider value={{ business, setBusiness, clearBusiness }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return context;
};
