import { useEffect } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/providers/auth-context";
import { useBusiness } from "@/providers/business-context";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { toast } from "sonner";

function DashboardLayout() {
  const { user } = useAuth();
  const { setBusiness } = useBusiness();
  const location = useLocation();
  const currentLocation = location.pathname.split("/").filter(Boolean).pop() || "";

  useEffect(() => {
    api
      .get("/business/data")
      .then((response) => {
        const { data } = response.data;
        setBusiness(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al cargar los datos del negocio");
      });
  }, [setBusiness]);

  if (user.role !== "Owner" && user.role !== "Admin") {
    return <Navigate to="/puestos" />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 !h-4" />
            <div className="capitalize">{currentLocation}</div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;
