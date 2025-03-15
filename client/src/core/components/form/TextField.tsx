import { Input } from "@/core/desing-system";
import { Form } from "radix-ui";
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
    <Form.Field name="" className="mb-6">
      <Form.Control asChild>
        <Input placeholder={placeholder} {...field} hasError={!!error} />
      </Form.Control>
      {error && (
        <Form.Message className="text-destructive body-m">
          {error.message}
        </Form.Message>
      )}
    </Form.Field>
  );
};
