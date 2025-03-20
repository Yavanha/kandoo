import { useEditBoardForm } from "../hooks";
import { BoardForm } from "./BoardForm";

export const EditBoardForm = () => {
  const { form, onSubmit } = useEditBoardForm();
  return (
    <BoardForm form={form} submitLabel="Save Changes" onSubmit={onSubmit} />
  );
};
