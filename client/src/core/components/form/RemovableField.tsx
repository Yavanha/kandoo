import { Input } from "@/core/desing-system";
import { Form } from "radix-ui";
import { DetailedHTMLProps, FC } from "react";
import { FieldError } from "react-hook-form";

type RemovableFieldProps = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  title: string;
  remove: () => void;
  error?: FieldError;
};

export const RemovableField: FC<RemovableFieldProps> = ({
  title,
  remove,
  error,
  ...field
}) => {
  return (
    <Form.Field name={title} className="mb-3" key={title}>
      <div className="flex items-center  gap-x-4">
        <Input placeholder="e.g. Todo" {...field} hasError={!!error} />
        <button type="button" className="cursor-pointer" onClick={remove}>
          <img src="/icons/icon-cross.svg" className="inline-block" />
        </button>
      </div>

      {error && (
        <Form.Message className="text-destructive body-m">
          {error.message}
        </Form.Message>
      )}
    </Form.Field>
  );
};
