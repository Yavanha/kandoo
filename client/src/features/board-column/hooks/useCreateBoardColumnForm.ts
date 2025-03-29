import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBoardColumn } from "./useCreateBoardColumn";
import { BoardColumnSchema } from "../schema";
import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { CreateBoardColumnType } from "../types";
import { useMutationOptions } from "./useMutateOptions";
import { useBoard } from "@/features/board/hooks";
import { Board } from "@/features/board/types";

export const useCreateBoardColumnForm = () => {
  const { createBoardColumnMutation } = useCreateBoardColumn();
  const activeBoard = useBoard() as Board;
  const defaultValues = {
    title: "",
  };

  const formProps: UseFormProps<CreateBoardColumnType> = {
    ...defaultValues,
    resolver: zodResolver(BoardColumnSchema),
    shouldFocusError: true,
  };

  const form = useForm<CreateBoardColumnType>(formProps);
  const { reset, setError } = form;
  const options = useMutationOptions<CreateBoardColumnType>(
    reset,
    setError,
    defaultValues
  );

  const onSubmit: SubmitHandler<CreateBoardColumnType> = ({ title }) => {
    createBoardColumnMutation.mutate(
      {
        boardId: activeBoard.id,
        title,
      },
      options
    );
  };

  return {
    onSubmit,
    form,
  };
};
