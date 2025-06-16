import { useEffect } from "react";
import api from "@/lib/axios";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useBusiness } from "@/providers/business-context";

function DashboardLayout() {
  const location = useLocation();
  const currentLocation = location.pathname.split("/").filter(Boolean).pop() || "";
  const { setBusiness } = useBusiness();

  useEffect(() => {
    api
      .get("/negocio/get-by-id/7")
      .then((response) => {
        const { data } = response.data;
        setBusiness(data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al cargar los datos del negocio");
      });
  }, [setBusiness]);

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
