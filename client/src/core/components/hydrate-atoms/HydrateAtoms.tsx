import { QueryClient } from "@tanstack/query-core";
import { queryClientAtom } from "jotai-tanstack-query";
import { useHydrateAtoms } from "jotai/react/utils";
import { FC, PropsWithChildren } from "react";

export const HydrateAtoms: FC<
  PropsWithChildren & { queryClient: QueryClient }
> = ({ children, queryClient }) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return children;
};
