import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { Board, DeleteBoardType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteBoardShema } from "../schema";

import { useMutationOptions } from "./useMutateOptions";
import { useDeleteBoard } from "./useDeleteBoard";
import { useBoard } from "./useBoard";

export const useDeleteBoardForm = () => {
  const { deleteBoardMutation } = useDeleteBoard();
  const activeBoard = useBoard() as Board;

  const formProps: UseFormProps<DeleteBoardType> = {
    defaultValues: {
      id: activeBoard.id,
    },
    resolver: zodResolver(DeleteBoardShema),
    shouldFocusError: true,
  };
  const form = useForm<DeleteBoardType>(formProps);
  const { setError } = form;
  const options = useMutationOptions<DeleteBoardType, DeleteBoardType>(
    null,
    setError
  );
  const onSubmit: SubmitHandler<DeleteBoardType> = (data) => {
    deleteBoardMutation.mutate(
      {
        id: data.id,
      },
      options
    );
  };

  return {
    onSubmit,
    form,
  };
};
