import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

import { MainHeader } from "@/core/layout/MainHeader";
import { AppDialog } from "@/widgets/app-dialog";

export const Route = createLazyFileRoute("/boards")({
  component: Index,
});

export function Index() {
  return (
    <>
      <MainHeader />
      <Outlet />
      <AppDialog />
    </>
  );
}
