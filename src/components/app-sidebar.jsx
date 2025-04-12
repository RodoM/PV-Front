import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
  ChartSpline,
  Package,
  Tag,
  MapPin,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { BusinessSwitcher } from "@/components/business-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Rodo 😎",
    email: "rodomeroi@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  businesses: [
    {
      name: "Negocio 1",
      logo: GalleryVerticalEnd,
    },
    {
      name: "Negocio 2",
      logo: AudioWaveform,
    },
    {
      name: "Negocio 3",
      logo: Command,
    },
  ],
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
      title: "Configuraciones",
      url: "/dashboard/configuraciones",
      icon: Settings2,
    }
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BusinessSwitcher businesses={data.businesses} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.routes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
