import { queryClient } from "@/core/config/query-client.config";
import { QueryClient } from "@tanstack/query-core";
import { queryClientAtom } from "jotai-tanstack-query";
import { useHydrateAtoms } from "jotai/react/utils";
import { FC, PropsWithChildren } from "react";

export const HydrateAtoms: FC<
  PropsWithChildren & { queryClient: QueryClient }
> = ({ children }) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return children;
};
