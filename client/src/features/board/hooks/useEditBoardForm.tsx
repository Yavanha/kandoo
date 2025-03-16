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
      list: activeBoard?.columns,
    },
    resolver: zodResolver(BoardSchema),
    shouldFocusError: true,
  };
  const form = useForm<BoardFormType>(formProps);
  const { reset, setError } = form;
  const options = useMutationOptions<UpdateBoardType>(reset, setError, {
    name: activeBoard.name,
    list: activeBoard.columns.map((item) => ({
      colid: item.id,
      title: item.title,
    })),
  });
  const onSubmit: SubmitHandler<BoardFormType> = ({ name, list }) => {
    updateBoardMutation.mutate(
      {
        id: activeBoard?.id,
        columns: list,
        name: name,
      },
      options
    );
  };

  return {
    onSubmit,
    form,
  };
};
