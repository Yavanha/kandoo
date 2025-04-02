import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { DeleteBoardType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteBoardShema } from "../schema";

import { useBoardMutationOptions } from "./useBoardMutationOptions";
import { useDeleteBoard } from "./useDeleteBoard";
import { useBoard } from "./useBoard";
import { BoardNotFoundException } from "../exceptions";

export const useDeleteBoardForm = () => {
  const { deleteBoardMutation } = useDeleteBoard();
  const activeBoard = useBoard();
  if (!activeBoard) {
    throw new BoardNotFoundException();
  }

  const formProps: UseFormProps<DeleteBoardType> = {
    defaultValues: {
      id: activeBoard.id,
    },
    resolver: zodResolver(DeleteBoardShema),
    shouldFocusError: true,
  };
  const form = useForm<DeleteBoardType>(formProps);
  const { setError } = form;
  const options = useBoardMutationOptions<DeleteBoardType, DeleteBoardType>(
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
