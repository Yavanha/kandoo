import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "jotai/react";
import { HydrateAtoms } from "./core/components";
import { queryClient } from "./core/config/query-client.config";
import { store } from "./core/config/store.config";

const router = createRouter({ routeTree, context: { queryClient, store } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <HydrateAtoms queryClient={queryClient}>
          <RouterProvider router={router} />
        </HydrateAtoms>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
