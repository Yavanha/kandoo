import { FC, PropsWithChildren } from "react";
import {
  Content,
  Icon,
  Item,
  ItemText,
  Select as RadixSelect,
  Trigger,
  Value,
} from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
type SelectProps = {
  value: string | undefined;
  values: string[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onValueChange: (value: string) => void;
  placeholder: string;
  mode?: "form" | "select";
} & PropsWithChildren;

export const Select: FC<SelectProps> = ({
  value: selectedValue,
  mode = "select",
  values,
  children,
  placeholder,
  isOpen,
  onOpenChange,
  onValueChange,
}) => {
  const selecteIcon = isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />;

  return (
    <RadixSelect
      value={selectedValue}
      open={isOpen}
      onOpenChange={onOpenChange}
      onValueChange={onValueChange}
    >
      <Trigger
        aria-label="Board"
        className={classNames(
          "flex items-center  gap-x-2 cursor-pointer  justify-between ",
          {
            "border-1 body-l border-solid border-medium-grey-25 rounded-[0.1rem] py-2 px-4 mb-6 w-full":
              mode === "form",
            "bg-white heading-l": mode === "select",
          }
        )}
      >
        <Value
          className={classNames({
            "text-medium-grey font-bold body-l": mode === "form",
          })}
          placeholder={placeholder}
        />
        <Icon>{selecteIcon}</Icon>
      </Trigger>
      <Content
        position="popper"
        sideOffset={10}
        className="  rounded-md bg-white shadow-md border-lines-light border-solid border py-4 pr-6 min-w-[16.5rem]"
      >
        {mode === "select" && (
          <p className="body-m uppercase text-medium-grey  ps-6 tracking-widest  pb-5">
            ALL values ( {values.length} )
          </p>
        )}
        <div className="overflow-y-auto max-h-[15rem]">
          {values.map((value, index) => (
            <Item
              key={`value-${index}`}
              value={value}
              className={classNames(
                "  text-medium-grey  cursor-pointer",
                {
                  "body-l ": mode === "form",
                },
                {
                  "bg-primary text-white rounded-br-full rounded-tr-full ":
                    value === selectedValue,
                }
              )}
            >
              <div className="flex items-center gap-x-2 px-6 py-3">
                {mode === "select" && (
                  <img
                    src="/icons/icon-board.svg"
                    alt="board icon"
                    className="block fill-white "
                  />
                )}
                <ItemText>{value}</ItemText>
              </div>
            </Item>
          ))}
        </div>

        {children}
      </Content>
    </RadixSelect>
  );
};
