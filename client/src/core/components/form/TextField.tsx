import { Input } from "@/core/desing-system";
import {
  FieldError,
  InternalFieldName,
  UseFormRegisterReturn,
} from "react-hook-form";

type TextFieldProps<T extends InternalFieldName> = {
  id: string;
  placeholder: string;
  field: T extends InternalFieldName ? UseFormRegisterReturn<T> : never;
  error?: FieldError;
};

export const TextField = <T extends InternalFieldName>({
  placeholder,
  field,
  error,
  id,
}: TextFieldProps<T>) => {
  return (
    <div className="mb-6">
      <Input id={id} placeholder={placeholder} {...field} hasError={!!error} />
      {error && <p className="text-destructive body-m pt-1">{error.message}</p>}
    </div>
  );
};
