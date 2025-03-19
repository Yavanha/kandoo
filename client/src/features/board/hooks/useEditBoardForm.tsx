import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { Board, BoardFormType, UpdateBoardType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardSchema } from "../schema";
import { useEditBoard } from "./useEditBoard";
import { useMutationOptions } from "./useMutateOptions";
import { useBoard } from "./useBoard";
import { buildPatchOperation } from "@/core/lib";

export const useEditBoardForm = () => {
  const { updateBoardMutation } = useEditBoard();
  const activeBoard = useBoard() as Board;

  const formProps: UseFormProps<BoardFormType> = {
    defaultValues: {
      name: activeBoard?.name,
      list: activeBoard?.columns.map(({ id: itemId, title }) => ({
        itemId,
        title,
      })),
    },
    resolver: zodResolver(BoardSchema),
    shouldFocusError: true,
  };
  const form = useForm<BoardFormType>(formProps);
  const { reset, setError } = form;
  const options = useMutationOptions<UpdateBoardType, BoardFormType>(
    reset,
    setError,
    {
      name: activeBoard.name,
      list: activeBoard.columns.map((item) => ({
        itemId: item.id,
        title: item.title,
      })),
    }
  );
  const onSubmit: SubmitHandler<BoardFormType> = (data) => {
    const { list, name } = data;

    const operations = buildPatchOperation(
      {
        name: activeBoard.name,
        columns: activeBoard.columns.map(({ title }) => ({
          title,
        })),
      },
      {
        name,
        columns: list.map(({ title }) => ({
          title,
        })),
      }
    );
    updateBoardMutation.mutate(
      {
        id: activeBoard.id,
        operations,
      },
      options
    );
  };

  return {
    onSubmit,
    form,
  };
};
