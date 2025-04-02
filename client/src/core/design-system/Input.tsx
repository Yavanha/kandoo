import classNames from "classnames";
import { DetailedHTMLProps, FC, forwardRef } from "react";

type InputProps = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  hasError?: boolean;
};

export const Input: FC<InputProps> = forwardRef((props, ref) => {
  const { hasError, ...inputProps } = props;
  return (
    <input
      ref={ref}
      {...inputProps}
      className={classNames(
        " body-l font-thin outline-1 w-full leading-none py-2 ps-4 rounded-[0.1rem] placeholder:text-medium-grey-25",
        {
          "text-black   outline-medium-grey-25 focus:outline-medium-grey":
            !hasError,
        },
        {
          "text-destructive outline-destructive focus:outline-destructive ":
            hasError,
        }
      )}
    />
  );
});
