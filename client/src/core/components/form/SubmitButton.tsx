import { Button } from "@/core/desing-system";
import { CircleIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { FieldValues, FormState } from "react-hook-form";

type SubmitButtonProps = Pick<
  FormState<FieldValues>,
  "isValid" | "isDirty" | "isSubmitting" | "errors"
> & { label: string };

export const SubmitButton: FC<SubmitButtonProps> = ({
  isDirty,
  isSubmitting,
  isValid,
  label,
  errors,
}) => {
  let submitContentElt = <span>{label}</span>;
  if (isSubmitting) {
    submitContentElt = <CircleIcon className="animate-spin fill-white" />;
  }

  const disabled = !isValid || !isDirty;
  console.log({ disabled, isDirty, isValid });
  return (
    <>
      <Button
        type="submit"
        security="primary"
        severity="primary"
        disabled={disabled}
      >
        {submitContentElt}
      </Button>
      {errors.root && (
        <p className="text-destructive body-m ">{errors.root.message}</p>
      )}
    </>
  );
};
