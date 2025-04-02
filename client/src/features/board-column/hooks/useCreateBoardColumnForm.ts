import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateBoardColumn } from "./useCreateBoardColumn";
import { BoardColumnSchema } from "../schema";
import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { CreateBoardColumn } from "../types";
import { useBoardColumnMutationOptions } from "./useBoardColumnMutationOptions";
import { useBoard } from "@/features/board/hooks";
import { Board } from "@/features/board/types";

export const useCreateBoardColumnForm = () => {
  const { createBoardColumnMutation } = useCreateBoardColumn();
  const activeBoard = useBoard() as Board;
  const defaultValues = {
    title: "",
  };

  const formProps: UseFormProps<CreateBoardColumn> = {
    ...defaultValues,
    resolver: zodResolver(BoardColumnSchema),
    shouldFocusError: true,
  };

  const form = useForm<CreateBoardColumn>(formProps);
  const { reset, setError } = form;
  const options = useBoardColumnMutationOptions<CreateBoardColumn>(
    reset,
    setError,
    defaultValues
  );

  const onSubmit: SubmitHandler<CreateBoardColumn> = ({ title }) => {
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
