import { Input } from "@/core/desing-system";
import {
  FieldError,
  InternalFieldName,
  UseFormRegisterReturn,
} from "react-hook-form";

type TextFieldProps<T extends InternalFieldName> = {
  placeholder: string;
  field: T extends InternalFieldName ? UseFormRegisterReturn<T> : never;
  error?: FieldError;
};

export const TextField = <T extends InternalFieldName>({
  placeholder,
  field,
  error,
}: TextFieldProps<T>) => {
  return (
    <div className="mb-6">
      <Input placeholder={placeholder} {...field} hasError={!!error} />
      {error && <p className="text-destructive body-m pt-1">{error.message}</p>}
    </div>
  );
};
