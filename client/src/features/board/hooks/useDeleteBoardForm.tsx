import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { Board, DeleteBoardType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteBoardShema } from "../schema";
import { useAtomValue } from "jotai";
import { activeBoardAtom } from "../store/atoms";
import { useMutationOptions } from "./useMutateOptions";
import { useDeleteBoard } from "./useDeleteBoard";

export const useDeleteBoardForm = () => {
  const { deleteBoardMutation } = useDeleteBoard();
  const activeBoard = useAtomValue(activeBoardAtom) as Board;

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
