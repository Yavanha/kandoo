import { useState } from "react";

export const useCreateNewBoard = (
  source = [
    { id: "todo", title: "Todo" },
    { id: "doing", title: "Doing" },
    { id: "done", title: "Done" },
  ]
) => {
  const [boardName, setBoardName] = useState("boardName");
  const [columns, setColumns] = useState<
    {
      id?: string;
      title: string;
    }[]
  >(source);

  const addNewColumnHandler = () => {
    setColumns((prev) => [...prev, { title: "new" }]);
  };

  const changeBoardNameHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => setBoardName(event.target.value);

  const changeColumnNameHandler = (index: number) => {
    const changeColumnName: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      setColumns((prev) => {
        const newState = [...prev];
        newState[index].title = event.target.value;
        return newState;
      });
    };
    return changeColumnName;
  };

  const deleteColumnHandler = (index: number) => {
    const deleteColumn: React.MouseEventHandler<HTMLButtonElement> = () =>
      setColumns((prev) => prev.filter((_, i) => i !== index));
    return deleteColumn;
  };

  return {
    columns,
    boardName,
    addNewColumnHandler,
    changeColumnNameHandler,
    changeBoardNameHandler,
    deleteColumnHandler,
  };
};
