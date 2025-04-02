import { CREATE_BOARD_FORM_SUBMIT } from "../../constants";
import { useCreateBoardForm } from "../../hooks";
import { BoardForm } from "./BoardForm";

export const CreateBoardForm = () => {
  const { form, onSubmit } = useCreateBoardForm();

  return (
    <BoardForm
      form={form}
      submitLabel={CREATE_BOARD_FORM_SUBMIT}
      onSubmit={onSubmit}
    />
  );
};
