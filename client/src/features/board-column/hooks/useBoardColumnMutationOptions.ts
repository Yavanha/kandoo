import { AxiosResponseError } from "@/core/types";
import { MutateOptions } from "@tanstack/query-core";
import { AxiosError } from "axios";
import { FieldValues, UseFormReset, UseFormSetError } from "react-hook-form";
import { BoardColumn } from "../types";
import { isBoardColumnCreateFormActiveAtom } from "@/features/board/store/atoms";
import { useSetAtom } from "jotai";

export const useBoardColumnMutationOptions = <D extends FieldValues>(
  reset: UseFormReset<D> | null,
  setError: UseFormSetError<D>,
  resetValues?: D
) => {
  const setIsBoardColumnCreateFormActiveAtom = useSetAtom(
    isBoardColumnCreateFormActiveAtom
  );
  const options:
    | MutateOptions<
        BoardColumn,
        AxiosError<AxiosResponseError, unknown>,
        D,
        unknown
      >
    | undefined = {
    onSuccess: () => {
      if (reset && resetValues) {
        reset(resetValues);
      }
      setIsBoardColumnCreateFormActiveAtom(false);
    },
    onError: (error) => {
      const errorData = error.response?.data;
      if (errorData) {
        setError("root", {
          message: error.response?.data.message,
        });
      }
    },
  };

  return options;
};
