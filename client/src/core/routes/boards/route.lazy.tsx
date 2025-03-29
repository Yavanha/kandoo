import { BoardDialog } from "@/features/board/components";

import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

import { MainHeader } from "@/core/layout/MainHeader";

export const Route = createLazyFileRoute("/boards")({
  component: Index,
});

export function Index() {
  return (
    <>
      <MainHeader />
      <Outlet />
      <BoardDialog />
    </>
  );
}
