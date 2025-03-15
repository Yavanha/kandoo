import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { BoardFormType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardSchema } from "../schema";
import { useAtom, useSetAtom } from "jotai";
import { activeBoardAtom, isOpenBoardDialogAtom } from "../store/atoms";
import { useEditBoard } from "./useEditBoard";
import { GET_BOARDS_CACHE_KEY } from "../constants/constants";
import { useQueryClient } from "@tanstack/react-query";

export const useEditBoardForm = () => {
  const { updateBoardMutation } = useEditBoard();
  const [activeBoard, setActiveBoard] = useAtom(activeBoardAtom);
  const setIsOpenDialog = useSetAtom(isOpenBoardDialogAtom);
  const queryClient = useQueryClient();
  const formProps: UseFormProps<BoardFormType> = {
    defaultValues: {
      name: activeBoard?.name,
      list: activeBoard?.columns,
    },
    resolver: zodResolver(BoardSchema),
    shouldFocusError: true,
  };
  const form = useForm<BoardFormType>(formProps);
  const onSubmit: SubmitHandler<BoardFormType> = ({ name, list }) => {
    updateBoardMutation.mutate(
      {
        id: activeBoard?.id,
        columns: list,
        name: name,
      },
      {
        onSuccess: (data) => {
          form.reset({
            name: activeBoard?.name,
            list: activeBoard?.columns,
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
