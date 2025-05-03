import { FC, forwardRef, PropsWithChildren } from "react";
import classNames from "classnames";

type DialogTriggerProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  hasFlushEdges?: boolean;
  disabled?: boolean;
  openDialog: () => void;
} & PropsWithChildren;

export const DialogTrigger: FC<DialogTriggerProps> = forwardRef(
  (props, ref) => {
    const {
      hasFlushEdges = false,
      children,
      disabled = false,
      openDialog: openBoardDialog,
    } = props;
    return (
      <button
        ref={ref}
        className={classNames(
          "flex items-center gap-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "px-6  py-3": hasFlushEdges,
          }
        )}
        disabled={disabled}
        onClick={openBoardDialog}
      >
        {children}
      </button>
    );
  }
);
