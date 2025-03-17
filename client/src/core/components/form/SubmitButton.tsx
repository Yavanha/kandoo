import { Button } from "@/core/desing-system";
import { CircleIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { FieldValues, FormState } from "react-hook-form";
import { Paragraph } from "../Typography/Paragraph";

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
      {errors.root && errors.root.message && (
        <Paragraph severity="danger" text={errors.root.message} />
      )}
    </>
  );
};
