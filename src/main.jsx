import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./providers/auth-context";
import { BusinessProvider } from "./providers/business-context";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BusinessProvider>
        <ThemeProvider>
          <App />
          <Toaster richColors />
        </ThemeProvider>
      </BusinessProvider>
    </AuthProvider>
  </StrictMode>
);
