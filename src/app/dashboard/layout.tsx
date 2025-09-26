import type { ReactNode } from "react";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { cookies } from "next/headers";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const layout = cookies().get("react-resizable-panels:layout");
    const collapsed = cookies().get("react-resizable-panels:collapsed");
    
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
    const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <SidebarProvider defaultOpen>
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarNav />
        </Sidebar>
        <SidebarInset>
            {children}
        </SidebarInset>
    </SidebarProvider>
  );
}
