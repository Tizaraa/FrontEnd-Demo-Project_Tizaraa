import { PropsWithChildren } from "react";

import DashboardNavigation from "../DashboardNavigation";
// STYLED COMPONENT
import { DashboardShell } from "./styles";

export default function CustomerDashboardLayout({
 children,
}: PropsWithChildren) {
 return (
  <DashboardShell>
   <aside className="dash-aside">
    <DashboardNavigation />
   </aside>

   <div>{children}</div>
  </DashboardShell>
 );
}
