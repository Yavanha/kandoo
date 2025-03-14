import { FC, forwardRef, PropsWithChildren } from "react";
import classNames from "classnames";

type DialogTriggerProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  hasFlushEdges?: boolean;
  openBoardDialog: () => void;
} & PropsWithChildren;

export const DialogTrigger: FC<DialogTriggerProps> = forwardRef(
  (props, ref) => {
    const { hasFlushEdges = false, children, openBoardDialog } = props;
    return (
      <button
        ref={ref}
        className={classNames("flex items-center gap-x-2 cursor-pointer", {
          "px-6  py-3": hasFlushEdges,
        })}
        onClick={openBoardDialog}
      >
        {children}
      </button>
    );
  }
);
