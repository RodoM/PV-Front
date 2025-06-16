import { UserSearch, Store, Settings2, ChartSpline, Package, Tag, MapPin } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useBusiness } from "@/providers/business-context";

const data = {
  routes: [
    {
      title: "Resumen",
      url: "/dashboard/resumen",
      icon: ChartSpline,
    },
    {
      title: "Productos",
      url: "/dashboard/productos",
      icon: Package,
    },
    {
      title: "Ventas",
      url: "/dashboard/ventas",
      icon: Tag,
    },
    {
      title: "Puestos de Venta",
      url: "/dashboard/puestos",
      icon: MapPin,
    },
    {
      title: "Empleados",
      url: "/dashboard/empleados",
      icon: UserSearch,
    },
    {
      title: "Configuraciones",
      url: "/dashboard/configuraciones",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { business } = useBusiness();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Store className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">
                    {business ? <>{business.nombre}</> : <>Cargando...</>}
                  </span>
                  <span className="text-xs">{business?.email || ""}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.routes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
