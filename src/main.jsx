import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./providers/auth-context";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster richColors />
    </AuthProvider>
  </StrictMode>
);
