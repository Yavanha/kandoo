import classNames from "classnames";
import { FC, RefObject } from "react";

type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  label: string;
  ref?: RefObject<HTMLLabelElement>;
};

export const Label: FC<LabelProps> = (props) => {
  return (
    <label
      {...props}
      className={classNames(
        "text-medium-grey font-bold body-l mb-2 inline-block",
        props.className
      )}
    >
      {props.label}
    </label>
  );
};
