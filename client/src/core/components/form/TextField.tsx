import { Input } from "@/core/desing-system";
import { Form } from "radix-ui";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

export const TextField = <T extends FieldValues>(
  props: UseControllerProps<T>
) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <Form.Field name={field.name} className="mb-6">
      <Form.Control asChild>
        <Input placeholder="e.g. Web Design" {...field} hasError={!!error} />
      </Form.Control>
      {error && (
        <Form.Message className="text-destructive body-m">
          {error.message}
        </Form.Message>
      )}
    </Form.Field>
  );
};
