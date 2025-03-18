import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { StoreJotaiType } from "../types";
interface RootRouteContext {
  queryClient: QueryClient;
  store: StoreJotaiType;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => <Outlet />,
});
