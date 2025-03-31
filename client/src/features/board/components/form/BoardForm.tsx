import { RemovableFieldList, SubmitButton, TextField } from "@/core/components";
import { Form } from "@radix-ui/react-form";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { BoardFormType } from "../../types";
import { FC } from "react";
import { Label } from "@/core/desing-system";
import {
  BOARD_ADD_NEW_COLUMN_LABEL,
  BOARD_COLUMN_LABEL,
  BOARD_NAME_LABEL,
  BOARD_PLACEHOLDER_TEXT,
} from "../../constants";

type BoardFormProps = {
  submitLabel: string;
  form: UseFormReturn<BoardFormType>;
  onSubmit: SubmitHandler<BoardFormType>;
};

export const BoardForm: FC<BoardFormProps> = ({
  form,
  submitLabel,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    register,
    trigger,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = form;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label
        className="mb-2"
        htmlFor={BOARD_NAME_LABEL}
        label={BOARD_NAME_LABEL}
      />
      <TextField
        id={BOARD_NAME_LABEL}
        error={errors.name}
        field={register("name", {
          onChange: () => trigger("name"),
        })}
        placeholder={BOARD_PLACEHOLDER_TEXT}
      />
      <RemovableFieldList
        label={BOARD_COLUMN_LABEL}
        buttonLabel={BOARD_ADD_NEW_COLUMN_LABEL}
        control={control}
        errors={errors}
        trigger={trigger}
      />
      <SubmitButton
        isValid={isValid}
        isSubmitting={isSubmitting}
        label={submitLabel}
        errors={errors}
        isDirty={isDirty}
      />
    </Form>
  );
};
