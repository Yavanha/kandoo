import { Button, Label } from "@/core/desing-system";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormTrigger,
} from "react-hook-form";
import { GenericListFormType } from "@/core/types";
import { RemovableField } from "./RemovableField";
import { useSetAtom } from "jotai";
import { removedFieldsAtom } from "@/features/board/store/atoms";

export type RemovableFieldListProps<T extends GenericListFormType> = {
  label: string;
  buttonLabel: string;
  hasErrors?: boolean;
  errors: T extends GenericListFormType ? FieldErrors<T> : never;
  control: T extends GenericListFormType ? Control<T> : never;
  trigger: T extends GenericListFormType ? UseFormTrigger<T> : never;
};

export const RemovableFieldList = <T extends GenericListFormType>({
  label,
  buttonLabel,
  control,
  errors,
  trigger,
}: RemovableFieldListProps<T>) => {
  const { register } = control;
  const setRemovedFiels = useSetAtom(removedFieldsAtom);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "list",
    keyName: "id",
  });

  const handleAppend = () => {
    append(
      { title: "" },
      {
        shouldFocus: true,
      }
    );
  };
  const handleRemove = (index: number) => {
    if (fields[index].itemId) {
      const id = fields[index].itemId;
      setRemovedFiels((prev) => [...prev, id]);
    }
    remove(index);
  };

  return (
    <div className="mb-6">
      <Label label={label} hasError={!!errors.list} />
      <div className="overflow-y-auto max-h-36 p-1">
        {fields.map((field, index) => {
          return (
            <RemovableField
              key={index}
              title={field.title}
              remove={() => handleRemove(index)}
              error={errors.list?.[index]?.title}
              {...register(`list.${index}.title`, {
                onChange: () => trigger(`list.${index}.title`),
              })}
            />
          );
        })}
      </div>
      <Button type="button" severity="secondary" onClick={() => handleAppend()}>
        {buttonLabel}
      </Button>
    </div>
  );
};
