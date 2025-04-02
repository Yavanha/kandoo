import classNames from "classnames";
import { DetailedHTMLProps, FC, LabelHTMLAttributes } from "react";

type LabelProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  label: string;
  hasError?: boolean;
};

export const Label: FC<LabelProps> = (props) => {
  const { hasError, label, ...labelProps } = props;
  return (
    <label
      {...labelProps}
      className={classNames(
        " font-bold body-l mb-2 inline-block capitalize",
        {
          "text-medium-grey": !hasError,
        },
        {
          "text-destructive": hasError,
        }
      )}
    >
      {label}
    </label>
  );
};
