import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { BoardFormType, UpdateBoardType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardSchema } from "../schema";
import { useEditBoard } from "./useEditBoard";
import { useBoardMutationOptions } from "./useBoardMutationOptions";
import { useBoard } from "./useBoard";
import { BoardColumn, UpdateBoardColumn } from "@/features/board-column";
import { useAtomValue } from "jotai";
import { removedFieldsAtom } from "../store/atoms";
import { transformeToNamedListeFormType } from "@/core/utils";
import { transformListFieldsToBoardColumnDelta } from "../utils";
import { BoardNotFoundException } from "@/features/board/exceptions";

export const useEditBoardForm = () => {
  const { updateBoardMutation } = useEditBoard();
  const activeBoard = useBoard();
  if (!activeBoard) {
    throw new BoardNotFoundException();
  }
  const removeColumnIds = useAtomValue(removedFieldsAtom);
  const defaultValues = transformeToNamedListeFormType<BoardColumn[]>(
    activeBoard.columns,
    activeBoard.name
  );

  const formProps: UseFormProps<BoardFormType> = {
    defaultValues,
    resolver: zodResolver(BoardSchema),
    shouldFocusError: true,
  };
  const form = useForm<BoardFormType>(formProps);

  const {
    reset,
    setError,
    formState: {
      dirtyFields: { list: isDirtyListField, name: isDirtyName },
    },
  } = form;
  const options = useBoardMutationOptions<UpdateBoardType, BoardFormType>(
    reset,
    setError,
    defaultValues
  );

  const onSubmit: SubmitHandler<BoardFormType> = ({
    name: nameField,
    list: columnFields,
  }) => {
    let columns: UpdateBoardColumn[] | null = null;
    if (isDirtyListField) {
      columns = transformListFieldsToBoardColumnDelta(
        activeBoard.columns,
        columnFields
      );
    }

    updateBoardMutation.mutate(
      {
        id: activeBoard.id,
        ...(isDirtyName ? { name: nameField } : {}),
        ...(removeColumnIds.length > 0 ? { removeColumnIds } : {}),
        ...(columns && columns.length > 0
          ? {
              columns,
            }
          : {}),
      },
      options
    );
  };
  return {
    onSubmit,
    form,
  };
};
