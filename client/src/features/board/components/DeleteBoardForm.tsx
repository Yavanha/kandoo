import { Paragraph } from "@/core/components";
import { Form } from "radix-ui";
import { DELETE_BOARD_MESSAGE } from "../constants/constants";
import { Button } from "@/core/desing-system";
import { useDeleteBoardForm } from "../hooks";

export const DeleteBoardForm = () => {
  const { form, onSubmit } = useDeleteBoardForm();
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  return (
    <Form.Root
      className="flex flex-col gap-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Paragraph text={DELETE_BOARD_MESSAGE} />
      <Button severity="danger" type="submit">
        Delete
      </Button>
      <Button type="button" severity="secondary">
        Cancel
      </Button>
      {errors && errors.root?.message && (
        <Paragraph severity="danger" text={errors.root.message} />
      )}
    </Form.Root>
  );
};
