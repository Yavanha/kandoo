import classNames from "classnames";
import { FC } from "react";

type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
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
        " font-bold body-l mb-2 inline-block",
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
