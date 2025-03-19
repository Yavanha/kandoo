import { compare } from "@kandoo/shared";

export const buildPatchOperation = <T extends object>(source: T, update: T) => {
  return compare(source, update);
};
