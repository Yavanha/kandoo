import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { BoardFormType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardSchema } from "../schema";
import { useAtomValue, useSetAtom } from "jotai";
import { activeBoardAtom, isOpenBoardDialogAtom } from "../store/atoms";
import { useEditBoard } from "./useEditBoard";

export const useEditBoardForm = () => {
  const { updateBoardMutation } = useEditBoard();
  const activeBoard = useAtomValue(activeBoardAtom);
  const setIsOpenDialog = useSetAtom(isOpenBoardDialogAtom);

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
        onSuccess: () => {
          form.reset({
            name: activeBoard?.name,
            list: activeBoard?.columns,
          });
          setIsOpenDialog(false);
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
