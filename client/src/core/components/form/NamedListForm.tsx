import { RemovableFieldList, SubmitButton, TextField } from "@/core/components";
import { Form } from "radix-ui";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { FC } from "react";
import { NamedListFormType } from "@/core/types";

type NamedListFormProps = {
  submitLabel: string;
  form: UseFormReturn<NamedListFormType>;
  onSubmit: SubmitHandler<NamedListFormType>;
};

export const NamedListForm: FC<NamedListFormProps> = ({
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
    <Form.Root onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={errors.name}
        field={register("name", {
          onChange: () => trigger("name"),
        })}
        placeholder="e.g. Web site"
      />
      <RemovableFieldList
        label="Board Column"
        buttonLabel="Add new Column"
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
    </Form.Root>
  );
};
