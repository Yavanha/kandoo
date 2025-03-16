import { SubmitHandler, useForm, UseFormProps } from "react-hook-form";
import { BoardFormType, CreateBoardType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardSchema } from "../schema";
import { useCreateBoard } from "./useCreateBoard";
import { useMutationOptions } from "./useMutateOptions";

export const useCreateBoardForm = () => {
  const { createBoardMutation } = useCreateBoard();
  const defaultValues = {
    name: "",
    list: [],
  };
  const formProps: UseFormProps<BoardFormType> = {
    ...defaultValues,
    resolver: zodResolver(BoardSchema),
    shouldFocusError: true,
  };
  const form = useForm<BoardFormType>(formProps);
  const { reset, setError } = form;
  const options = useMutationOptions<CreateBoardType>(
    reset,
    setError,
    defaultValues
  );
  const onSubmit: SubmitHandler<BoardFormType> = ({ name, list }) => {
    createBoardMutation.mutate(
      {
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
