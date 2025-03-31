import { FieldValues, UseFormReset, UseFormSetError } from "react-hook-form";
import { Task } from "../types/task.type";
import { AxiosResponseError } from "@/core/types";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { isOpenDialogAtom } from "@/features/board/store/atoms";

export const useMutationOptions = <T, D extends FieldValues>(
  reset: UseFormReset<D> | null,
  setError: UseFormSetError<D>,
  resetValues?: D
) => {
  const setIsOpenDialog = useSetAtom(isOpenDialogAtom);
  const options: MutateOptions<
    Task,
    AxiosError<AxiosResponseError>,
    T,
    unknown
  > = {
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
