import {
  DescriptionField,
  RemovableFieldList,
  SubmitButton,
  TextField,
} from "@/core/components";
import { Form } from "@radix-ui/react-form";
import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form";
import { FC, useState } from "react";
import { TaskFormType } from "../../types";
import {
  TASK_ADD_SUBTASK_LABEL,
  TASK_DESCRIPTION_ID,
  TASK_DESCRIPTION_LABEL,
  TASK_DESCRIPTION_PLACEHOLDER,
  TASK_SUBTASKS_LABEL,
  TASK_TITLE_ID,
  TASK_TITLE_LABEL,
  TASK_TITLE_PLACEHOLDER,
  TASK_STATUS_PLACEHOLDER,
} from "../../constants";
import { Label, Select } from "@/core/desing-system";

type TaskFormProps = {
  submitLabel: string;
  status: string[];
  form: UseFormReturn<TaskFormType>;
  onSubmit: SubmitHandler<TaskFormType>;
};

export const TaskForm: FC<TaskFormProps> = ({
  form,
  submitLabel,
  onSubmit,
  status,
}) => {
  const {
    control,
    handleSubmit,
    register,
    trigger,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = form;
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label
        className="mb-2"
        htmlFor={TASK_TITLE_ID}
        label={TASK_TITLE_LABEL}
        hasError={!!errors.title}
      />
      <TextField
        id={TASK_TITLE_ID}
        error={errors.title}
        field={register("title", {
          onChange: () => trigger("title"),
        })}
        placeholder={TASK_TITLE_PLACEHOLDER}
      />
      <Label
        className="mb-2"
        htmlFor={TASK_DESCRIPTION_ID}
        label={TASK_DESCRIPTION_LABEL}
        hasError={!!errors.description}
      />
      <DescriptionField
        id={TASK_DESCRIPTION_ID}
        error={errors.description}
        field={register("description", {
          onChange: () => trigger("description"),
        })}
        placeholder={TASK_DESCRIPTION_PLACEHOLDER}
      />

      <RemovableFieldList
        label={TASK_SUBTASKS_LABEL}
        buttonLabel={TASK_ADD_SUBTASK_LABEL}
        control={control}
        errors={errors}
        trigger={trigger}
      />
      <Controller
        control={control}
        name="status"
        defaultValue={status[0]}
        render={({ field }) => (
          <Select
            mode="form"
            value={field.value}
            values={status}
            placeholder={TASK_STATUS_PLACEHOLDER}
            isOpen={isOpenSelect}
            onOpenChange={setIsOpenSelect}
            onValueChange={(value: string) => field.onChange(value)}
          />
        )}
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
