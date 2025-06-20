import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./providers/auth-context";
import { BusinessProvider } from "./providers/business-context";
import { RefreshProvider } from "./providers/refresh-context";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BusinessProvider>
        <RefreshProvider>
          <ThemeProvider>
            <App />
            <Toaster richColors />
          </ThemeProvider>
        </RefreshProvider>
      </BusinessProvider>
    </AuthProvider>
  </StrictMode>
);
