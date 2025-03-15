import { useCreateBoardForm } from "../hooks";
import { BoardForm } from "./BoardForm";

export const CreateBoardForm = () => {
  const { form, onSubmit } = useCreateBoardForm();

  return (
    <BoardForm form={form} submitLabel="Create New Board" onSubmit={onSubmit} />
  );
};
