import { FieldValues, UseFormReset, UseFormSetError } from "react-hook-form";
import { AxiosResponseError } from "@/core/types";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { Task } from "../types";
import { closeModalAtom } from "@/widgets/app-dialog/atoms";

export const useTaskMutationOptions = <T, D extends FieldValues>(
  reset: UseFormReset<D> | null,
  setError: UseFormSetError<D>,
  resetValues?: D
) => {
  const closeModal = useSetAtom(closeModalAtom);
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
      closeModal();
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
