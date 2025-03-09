import { Input, Label } from "@/components";
import { Dialog, Form } from "radix-ui";
import { FC } from "react";
import { useCreateNewBoard } from "./hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/helpers/api-helpers";
import { Board } from "./type";
import { GET_BOARDS } from "./queries";

type CreateNewBoardDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateNewBoardDialog: FC<CreateNewBoardDialogProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const {
    addNewColumnHandler,
    changeColumnNameHandler,
    columns,
    boardName,
    changeBoardNameHandler,
    deleteColumnHandler,
  } = useCreateNewBoard();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Partial<Board>) => {
      return await post("/boards", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_BOARDS] });
    },
  });

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutation.mutate({
      name: boardName,
      columns,
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal container={document.getElementById("root")}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-40 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2   min-w-[21.4375rem] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="mb-6 heading-l font-medium text-mauve12">
            Add New Board
          </Dialog.Title>
          <Form.Root onSubmit={submitFormHandler}>
            <Form.Field name="boardName" className="mb-6">
              <Form.Label asChild>
                <Label label="Board Name" />
              </Form.Label>
              <Form.Control asChild>
                <Input
                  type="text"
                  value={boardName}
                  onChange={changeBoardNameHandler}
                  placeholder="e.g. Web Design"
                  className="placeholder:text-medium-grey-25"
                />
              </Form.Control>
            </Form.Field>
            <Form.Field name="boardColumns" className="block mb-6">
              <Form.Label asChild>
                <Label label="Board Columns" />
              </Form.Label>
              <div>
                <div className="overflow-y-scroll max-h-36 p-1">
                  {columns.map((column, index) => (
                    <Form.Field
                      name="title"
                      className="flex items-center mb-3 gap-x-4"
                      key={`column-${index}`}
                    >
                      <Form.Control asChild>
                        <Input
                          type="text"
                          required
                          value={column.title}
                          onChange={changeColumnNameHandler(index)}
                        />
                      </Form.Control>
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={deleteColumnHandler(index)}
                      >
                        <img
                          src="/icons/icon-cross.svg"
                          className="inline-block"
                        />
                      </button>
                    </Form.Field>
                  ))}
                </div>
                <button
                  type="button"
                  className="text-primary body-l bg-primary-10 w-full p-2 rounded-full capitalize"
                  onClick={addNewColumnHandler}
                >
                  +Add New Column
                </button>
              </div>
            </Form.Field>
            <button
              type="submit"
              className="text-white body-l bg-primary w-full p-2 rounded-full"
            >
              Create New Board
            </button>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
