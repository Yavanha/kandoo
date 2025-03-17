import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { Board, BoardFormType, UpdateBoardType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardSchema } from "../schema";
import { useAtomValue } from "jotai";
import { activeBoardAtom } from "../store/atoms";
import { useEditBoard } from "./useEditBoard";
import { useMutationOptions } from "./useMutateOptions";

export const useEditBoardForm = () => {
  const { updateBoardMutation } = useEditBoard();
  const activeBoard = useAtomValue(activeBoardAtom) as Board;

  const formProps: UseFormProps<BoardFormType> = {
    defaultValues: {
      name: activeBoard?.name,
      list: activeBoard?.columns.map(({ id: colId, title }) => ({
        colId,
        title,
      })),
    },
    resolver: zodResolver(BoardSchema),
    shouldFocusError: true,
  };
  const form = useForm<BoardFormType>(formProps);
  const {
    reset,
    setError,
    formState: { dirtyFields },
  } = form;
  const options = useMutationOptions<UpdateBoardType, BoardFormType>(
    reset,
    setError,
    {
      name: activeBoard.name,
      list: activeBoard.columns.map((item) => ({
        colId: item.id,
        title: item.title,
      })),
    }
  );
  const onSubmit: SubmitHandler<BoardFormType> = ({ name, list }) => {
    updateBoardMutation.mutate(
      {
        id: activeBoard.id,
        ...(dirtyFields.list && dirtyFields.list
          ? { columns: list.map(({ colId: id, title }) => ({ id, title })) }
          : {}),
        ...(dirtyFields.name ? { name } : {}),
      },
      options
    );
  };

  return {
    onSubmit,
    form,
  };
};
