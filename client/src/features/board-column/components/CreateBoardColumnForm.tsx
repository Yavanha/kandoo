import { useCreateBoardColumnForm } from "../hooks/useCreateBoardColumnForm";
import { Form } from "@radix-ui/react-form";

import { SubmitButton } from "@/core/components";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ADD_NEW_COLUMN } from "../constants";
import { Button, Input } from "@/core/desing-system";
import { CANCEL_LABEL_BUTTON } from "@/core/constants";
import classNames from "classnames";
import { useSetAtom } from "jotai";
import { isBoardColumnCreateFormActiveAtom } from "@/features/board/store/atoms";

export const CreateBoardColumnForm = () => {
  const { form, onSubmit } = useCreateBoardColumnForm();
  const setIsBoardColumnCreateFormActiveAtom = useSetAtom(
    isBoardColumnCreateFormActiveAtom
  );
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = form;
  let errorMessage = errors.root?.message;
  if (errors.title?.message) {
    errorMessage = errors.title?.message;
  }
  return (
    <Form
      className="min-h-[85lvh] bg-light-grey min-w-[17.5rem]   flex flex-col justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-6">
        <div
          className={classNames("flex items-center gap-x-2", {
            "before:content-[''] before:block before:bg-green-600 before:rounded-full before:w-[0.9375rem] before:h-[0.9375rem]":
              !errorMessage,
          })}
        >
          {errorMessage && (
            <InfoCircledIcon className="stroke-destructive w-[0.9375rem] h-[0.9375rem]" />
          )}
          <Input
            placeholder="e.g. To do"
            {...register("title", {
              onChange: () => trigger("title"),
            })}
            hasError={!!(errors.title || errors.root)}
          />
        </div>
        {errorMessage && (
          <p className="text-destructive body-m p-2 ps-5">{errorMessage}</p>
        )}
      </div>
      <div className="flex gap-x-4">
        <SubmitButton
          isValid={isValid}
          isSubmitting={isSubmitting}
          label={ADD_NEW_COLUMN}
          isDirty={isDirty}
        />
        <Button
          type="button"
          severity="danger"
          onClick={() => setIsBoardColumnCreateFormActiveAtom(false)}
        >
          {CANCEL_LABEL_BUTTON}
        </Button>
      </div>
    </Form>
  );
};
