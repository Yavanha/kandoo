import { Form } from "radix-ui";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateBoardFields } from "../types";
import { boardSchema } from "../schema";
import { Button, Input, Label } from "@/core/desing-system";
import { TextField } from "@/core/components";
import { useCreateBoard } from "../hooks/useCreateBoards";
import { FC } from "react";

type BoardForm = {
  onCloseDialog: () => void;
};

export const BoardForm: FC<BoardForm> = ({ onCloseDialog }) => {
  const {
    handleSubmit,
    register,
    control,
    trigger,
    setError,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateBoardFields>({
    defaultValues: {
      name: "",
      columns: [],
    },
    mode: "onChange",
    resolver: zodResolver(boardSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });
  const { createBoardMutation } = useCreateBoard();
  const onSubmit: SubmitHandler<CreateBoardFields> = async (
    createBoardData
  ) => {
    createBoardMutation.mutate(createBoardData, {
      onSuccess: () => {
        reset({
          name: "",
          columns: [],
        });
        onCloseDialog();
      },
      onError: (error) => {
        const errorData = error.response?.data;
        if (errorData) {
          setError("root", {
            message: error.response?.data.message,
          });
        }
      },
    });
  };
  return (
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <Label label="Board Name" hasError={!!errors.name} />
      <TextField control={control} name="name" />
      <div className="mb-6">
        <Label label="Board Column" hasError={!!errors.columns} />
        <div className="overflow-y-auto max-h-36 p-1">
          {fields.map((field, index) => {
            return (
              <Form.Field
                name={field.title}
                className="mb-3"
                key={`${field.title}-${index}`}
              >
                <Form.Control asChild>
                  <div className="flex items-center  gap-x-4">
                    <Input
                      placeholder="e.g. Todo"
                      {...register(`columns.${index}.title`, {
                        onChange: () => trigger(`columns.${index}.title`),
                      })}
                      hasError={!!(errors.columns && errors.columns[index])}
                    />
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => remove(index)}
                    >
                      <img
                        src="/icons/icon-cross.svg"
                        className="inline-block"
                      />
                    </button>
                  </div>
                </Form.Control>

                {errors.columns && errors.columns[index] && (
                  <Form.Message className="text-destructive body-m">
                    {errors.columns[index].title?.message}
                  </Form.Message>
                )}
              </Form.Field>
            );
          })}
        </div>
        <Button
          type="button"
          severity="secondary"
          onClick={() => append({ title: "" })}
        >
          +Add New Column
        </Button>
      </div>
      <Button
        type="submit"
        security="primary"
        severity="primary"
        disabled={!isValid}
      >
        {isSubmitting ? "..." : "Create New Board"}
      </Button>
      {errors.root && (
        <p className="text-destructive body-m ">{errors.root.message}</p>
      )}
    </Form.Root>
  );
};
