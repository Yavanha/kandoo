import classNames from "classnames";
import {
  DetailedHTMLProps,
  FC,
  forwardRef,
  TextareaHTMLAttributes,
} from "react";

type TextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  hasError?: boolean;
};

export const TextArea: FC<TextAreaProps> = forwardRef((props, ref) => {
  const { hasError, ...textareaProps } = props;
  return (
    <textarea
      maxLength={500}
      rows={5}
      ref={ref}
      {...textareaProps}
      className={classNames(
        "body-l font-thin outline-1 w-full leading-none py-2 ps-4 rounded-[0.1rem] placeholder:text-medium-grey-25 resize-none",
        !hasError
          ? "text-black outline-medium-grey-25 focus:outline-medium-grey"
          : "text-destructive outline-destructive focus:outline-destructive"
      )}
    />
  );
});
