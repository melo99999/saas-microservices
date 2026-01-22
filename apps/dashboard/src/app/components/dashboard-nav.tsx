"use client";

import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  Settings,
  Package,
  Calendar,
  Smartphone,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <h2 className="text-lg font-semibold">Acme Inc</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <a href="/" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/devices"}>
              <a href="/devices" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>Devices</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Customers</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <a href="#">Active Users</a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                  <a href="#">User Management</a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>Products</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Calendar</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
