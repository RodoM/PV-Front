import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth-context";
import api from "@/lib/axios";
import { toast } from "sonner";

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const { user } = useAuth();
  const [business, setBusiness] = useState(null);
  const [cashbox, setCashbox] = useState(null);
  const [loadingCashbox, setLoadingCashbox] = useState(false);

  const fetchCashBoxData = () => {
    setLoadingCashbox(true);
    api
      .get("/cashbox/data")
      .then((response) => {
        const { data } = response.data;
        setCashbox(data);
      })
      .finally(() => setLoadingCashbox(false));
  };

  const fetchBusinessData = () => {
    api
      .get("/business/data")
      .then((response) => {
        const { data } = response.data;
        setBusiness(data);
      })
      .catch(() => {
        toast.error("Error al cargar los datos del negocio");
      });
  };

  useEffect(() => {
    if (user && user.negocioId) {
      fetchBusinessData();
      fetchCashBoxData();
    }
  }, [setBusiness, user]);

  const clearBusiness = () => {
    setBusiness(null);
  };

  return (
    <BusinessContext.Provider
      value={{ business, setBusiness, clearBusiness, cashbox, loadingCashbox, fetchCashBoxData }}
    >
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
