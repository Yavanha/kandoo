import classNames from "classnames";
import { FC, RefObject } from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { ref?: RefObject<HTMLInputElement> };

export const Input: FC<InputProps> = (props) => {
  return (
    <input
      {...props}
      className={classNames(
        "outline-medium-grey-25 outline-1 focus:outline-medium-grey text-black body-l font-thin w-full leading-none py-2 ps-4 rounded-[0.1rem]",
        props.className
      )}
    />
  );
};
