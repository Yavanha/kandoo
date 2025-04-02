import { FieldValues, UseFormReset, UseFormSetError } from "react-hook-form";
import { Board } from "../types";
import { AxiosResponseError } from "@/core/types";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { isOpenDialogAtom } from "../store/atoms";

export const useBoardMutationOptions = <T, D extends FieldValues>(
  reset: UseFormReset<D> | null,
  setError: UseFormSetError<D>,
  resetValues?: D
) => {
  const setIsOpenDialog = useSetAtom(isOpenDialogAtom);
  const options:
    | MutateOptions<Board, AxiosError<AxiosResponseError, unknown>, T, unknown>
    | undefined = {
    onSuccess: () => {
      if (reset && resetValues) {
        reset(resetValues);
      }
      setIsOpenDialog(false);
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
