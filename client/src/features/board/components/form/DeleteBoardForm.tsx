import { Paragraph } from "@/core/components";
import { Form } from "@radix-ui/react-form";
import {
  DELETE_BOARD_FORM_SUBMIT,
  DELETE_BOARD_MESSAGE,
} from "../../constants/constants";
import { Button } from "@/core/desing-system";
import { useDeleteBoardForm } from "../../hooks";
import { useSetAtom } from "jotai";
import { isOpenBoardDialogAtom } from "../../store/atoms";

export const DeleteBoardForm = () => {
  const { form, onSubmit } = useDeleteBoardForm();
  const setIsOpenBoardDialog = useSetAtom(isOpenBoardDialogAtom);
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  return (
    <Form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Paragraph text={DELETE_BOARD_MESSAGE} />
      <Button severity="danger" type="submit">
        {DELETE_BOARD_FORM_SUBMIT}
      </Button>
      <Button
        type="button"
        severity="secondary"
        onClick={() => setIsOpenBoardDialog(false)}
      >
        Cancel
      </Button>
      {errors && errors.root?.message && (
        <Paragraph severity="danger" text={errors.root.message} />
      )}
    </Form>
  );
};
