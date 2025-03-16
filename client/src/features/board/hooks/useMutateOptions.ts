import { UseFormReset, UseFormSetError } from "react-hook-form";
import { Board, BoardFormType } from "../types";
import { AxioResponsError } from "@/core/types";
import { MutateOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { isOpenBoardDialogAtom } from "../store/atoms";

export const useMutationOptions = <T>(
  reset: UseFormReset<BoardFormType>,
  setError: UseFormSetError<BoardFormType>,
  resetValues: BoardFormType
) => {
  const setIsOpenDialog = useSetAtom(isOpenBoardDialogAtom);
  const options:
    | MutateOptions<Board, AxiosError<AxioResponsError, unknown>, T, unknown>
    | undefined = {
    onSuccess: () => {
      reset(resetValues);
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
