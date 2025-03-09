import { Select, Switch, Toolbar } from "radix-ui";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { Suspense, useState } from "react";
import classNames from "classnames";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getBoards } from "./queries";
import { Board } from "./type";
import { CreateNewBoardDialog } from "./CreateNewBoardDialog";

export const BoardComponent = () => {
  const { data: boards } = useSuspenseQuery(getBoards);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateNewBoardOpen, setIsCreateNewBoardOpen] = useState(true);
  const [activeBoard, setActiveBoard] = useState<Board>(boards[0]);

  const selectValueChangeHandler = (value: string) => {
    const selectedBoard = boards.find((board) => board.name === value);
    if (selectedBoard) {
      setActiveBoard(selectedBoard);
    }
  };

  const handleCreateNewBoardOpening = () => {
    setIsCreateNewBoardOpen(true);
    setIsOpen(false);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Toolbar.Root className="sticky top-0 left-0 flex items-center bg-white px-4 py-5 justify-between">
        <div className="flex items-center gap-4">
          <Toolbar.Button role="menu">
            <img src="/icons/logo-mobile.svg" alt="menu" />
          </Toolbar.Button>
          <Select.Root
            defaultValue={boards[0].name}
            open={isOpen}
            onOpenChange={() => setIsOpen((prev: boolean) => !prev)}
            onValueChange={selectValueChangeHandler}
          >
            <Select.Trigger
              aria-label="Board"
              className="inline-flex items-center heading-l gap-x-2 cursor-pointer user-select-none"
            >
              <Select.Value placeholder="Select a board" />
              <Select.Icon>
                {!isOpen && <ChevronDownIcon />}
                {isOpen && <ChevronUpIcon />}
              </Select.Icon>
            </Select.Trigger>
            <Select.Content
              position="popper"
              sideOffset={20}
              className="overflow-hidden rounded-md bg-white shadow-md border-lines-light border-solid border py-4 pr-6 min-w-[16.5rem]"
            >
              <p className="body-m uppercase text-medium-grey  ps-6 tracking-widest  pb-5">
                ALL BOARDS ( {boards.length} )
              </p>
              {boards.map(({ id, name }) => (
                <Select.Item
                  key={id}
                  value={name}
                  className={classNames("  text-medium-grey", {
                    "bg-primary text-white rounded-br-full rounded-tr-full ":
                      name === activeBoard.name,
                  })}
                >
                  <div className="flex items-center gap-x-2 px-6 py-3">
                    <img
                      src="/icons/icon-board.svg"
                      alt="board icon"
                      className="block fill-white "
                    />
                    <Select.ItemText className="heading-m">
                      {name}
                    </Select.ItemText>
                  </div>
                </Select.Item>
              ))}

              <button
                className="flex items-center gap-x-2 px-6 py-3"
                onClick={handleCreateNewBoardOpening}
              >
                <img
                  src="/icons/icon-board.svg"
                  alt="board icon"
                  className="block"
                />
                <p className="capitalize heading-m flex items-center gap-x-0.5 text-primary">
                  <span className="inline-block align-middle">+</span> Create
                  New Board
                </p>
              </button>
              <div className="ps-4 rounded-2xl mt-4">
                <div className="flex items-center py-3.5 width-full justify-center gap-x-6 bg-light-grey">
                  <img src="/icons/icon-light-theme.svg" alt="light theme" />
                  <Switch.Root className="relative h-[20px] w-[40px] cursor-default rounded-full bg-primary  outline-none  data-[state=checked]:bg-primary">
                    <Switch.Thumb className="block size-[14px] translate-x-0.5 rounded-full bg-white  transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
                  </Switch.Root>
                  <img src="/icons/icon-dark-theme.svg" alt="dark theme" />
                </div>
              </div>
            </Select.Content>
          </Select.Root>
        </div>
        <div className="flex items-center gap-x-4">
          <Toolbar.Button
            role="add new tasks to board"
            disabled={activeBoard.columns.length === 0}
            className="bg-primary py-2.5 px-5  rounded-full disabled:bg-primary-hover"
          >
            <img src="/icons/icon-add-task-mobile.svg" alt="add task" />
          </Toolbar.Button>
          <Toolbar.Button role="more options">
            <img src="/icons/icon-vertical-ellipsis.svg" alt="more options" />
          </Toolbar.Button>
        </div>
      </Toolbar.Root>
      <CreateNewBoardDialog
        isOpen={isCreateNewBoardOpen}
        onOpenChange={setIsCreateNewBoardOpen}
      />
    </Suspense>
  );
};
