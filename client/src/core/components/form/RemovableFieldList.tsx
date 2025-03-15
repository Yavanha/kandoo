import { Button, Label } from "@/core/desing-system";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormTrigger,
} from "react-hook-form";
import { GenericFormType } from "@/core/types";
import { RemovableField } from "./RemovableField";

export type RemovableFieldListProps<T extends GenericFormType> = {
  label: string;
  buttonLabel: string;
  hasErrors?: boolean;
  errors: T extends GenericFormType ? FieldErrors<T> : never;
  control: T extends GenericFormType ? Control<T> : never;
  trigger: T extends GenericFormType ? UseFormTrigger<T> : never;
};

export const RemovableFieldList = <T extends GenericFormType>({
  label,
  buttonLabel,
  control,
  errors,
  trigger,
}: RemovableFieldListProps<T>) => {
  const { register } = control;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "list",
  });
  return (
    <div className="mb-6">
      <Label label={label} hasError={!!errors.list} />
      <div className="overflow-y-auto max-h-36 p-1">
        {fields.map((field, index) => {
          return (
            <RemovableField
              key={field.id}
              title={field.title}
              remove={remove}
              error={errors.list?.[index]?.title}
              {...register(`list.${index}.title`, {
                onChange: () => trigger(`list.${index}.title`),
              })}
            />
          );
        })}
      </div>
      <Button
        type="button"
        severity="secondary"
        onClick={() => append({ title: "" })}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};
