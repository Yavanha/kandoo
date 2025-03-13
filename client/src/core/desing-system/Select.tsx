import { FC, PropsWithChildren } from "react";
import { Select as RadixSelect } from "radix-ui";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
type SelectProps = {
  value: string;
  values: string[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onValueChange: (value: string) => void;
  placeholder: string;
} & PropsWithChildren;

export const Select: FC<SelectProps> = ({
  value: selectedValue,
  values,
  children,
  placeholder,
  isOpen,
  onOpenChange,
  onValueChange,
}) => {
  const selecteIcon = isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />;

  return (
    <RadixSelect.Root
      value={selectedValue}
      open={isOpen}
      onOpenChange={onOpenChange}
      onValueChange={onValueChange}
    >
      <RadixSelect.Trigger
        aria-label="Board"
        className="inline-flex items-center heading-l gap-x-2 cursor-pointer user-RadixSelect-none"
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>{selecteIcon}</RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Content
        position="popper"
        sideOffset={20}
        className="overflow-hidden rounded-md bg-white shadow-md border-lines-light border-solid border py-4 pr-6 min-w-[16.5rem]"
      >
        <p className="body-m uppercase text-medium-grey  ps-6 tracking-widest  pb-5">
          ALL values ( {values.length} )
        </p>
        {values.map((value, index) => (
          <RadixSelect.Item
            key={`value-${index}`}
            value={value}
            className={classNames("  text-medium-grey", {
              "bg-primary text-white rounded-br-full rounded-tr-full ":
                value === selectedValue,
            })}
          >
            <div className="flex items-center gap-x-2 px-6 py-3">
              <img
                src="/icons/icon-board.svg"
                alt="board icon"
                className="block fill-white "
              />
              <RadixSelect.ItemText className="heading-m">
                {value}
              </RadixSelect.ItemText>
            </div>
          </RadixSelect.Item>
        ))}

        {children}
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
};
