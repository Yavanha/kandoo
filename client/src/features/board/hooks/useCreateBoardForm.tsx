import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { BoardFormType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardSchema } from "../schema";
import { useCreateBoard } from "./useCreateBoard";
import { useSetAtom } from "jotai";
import { activeBoardAtom, isOpenBoardDialogAtom } from "../store/atoms";
import { useQueryClient } from "@tanstack/react-query";
import { GET_BOARDS_CACHE_KEY } from "../constants/constants";

export const useCreateBoardForm = () => {
  const { createBoardMutation } = useCreateBoard();
  const setIsOpenDialog = useSetAtom(isOpenBoardDialogAtom);
  const queryClient = useQueryClient();
  const setActiveBoard = useSetAtom(activeBoardAtom);

  const formProps: UseFormProps<BoardFormType> = {
    defaultValues: {
      name: "",
      list: [],
    },
    resolver: zodResolver(BoardSchema),
    shouldFocusError: true,
  };
  const form = useForm<BoardFormType>(formProps);
  const onSubmit: SubmitHandler<BoardFormType> = ({ name, list }) => {
    createBoardMutation.mutate(
      {
        columns: list,
        name: name,
      },
      {
        onSuccess: (data) => {
          form.reset({
            name: "",
            list: [],
          });
          setIsOpenDialog(false);
          setActiveBoard(data);
          queryClient.invalidateQueries({ queryKey: [GET_BOARDS_CACHE_KEY] });
        },
        onError: (error) => {
          const errorData = error.response?.data;
          if (errorData) {
            form.setError("root", {
              message: error.response?.data.message,
            });
          }
        },
      }
    );
  };

  return {
    onSubmit,
    form,
  };
};
