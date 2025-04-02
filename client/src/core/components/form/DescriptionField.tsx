import { TextArea } from "@/core/design-system";
import {
  FieldError,
  InternalFieldName,
  UseFormRegisterReturn,
} from "react-hook-form";

type DescriptionFieldProps<T extends InternalFieldName> = {
  id: string;
  placeholder: string;
  field: T extends InternalFieldName ? UseFormRegisterReturn<T> : never;
  error?: FieldError;
  maxLength?: number;
};

export const DescriptionField = <T extends InternalFieldName>({
  id,
  placeholder,
  field,
  error,
  maxLength = 300,
}: DescriptionFieldProps<T>) => {
  return (
    <div className="mb-6">
      <TextArea
        placeholder={placeholder}
        {...field}
        id={id}
        maxLength={maxLength}
        hasError={!!error}
      />
      {error && <p className="text-destructive body-m pt-1">{error.message}</p>}
    </div>
  );
};
