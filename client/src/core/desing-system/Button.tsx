import classNames from "classnames";
import { FC } from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  severity?: "primary" | "secondary" | "danger";
};

export const Button: FC<ButtonProps> = (props) => {
  const { severity } = props;
  return (
    <button
      {...props}
      className={classNames(
        `body-l  bg w-full p-2 rounded-full disabled:pointer-events-none select-none disabled:bg-medium-grey-25`,
        {
          "text-white  bg-primary  hover:bg-primary-hover":
            !severity || severity === "primary",
        },
        { "bg-destructive hover:bg-destructive-hover ": severity === "danger" },
        {
          "bg-secondary hover:bg-secondary-hover text-primary":
            severity === "secondary",
        }
      )}
    ></button>
  );
};
