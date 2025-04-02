import { FC, useState } from "react";
import {
  Tooltip,
  Trigger,
  Portal,
  Content,
  Provider,
} from "@radix-ui/react-tooltip";
import classNames from "classnames";
import { StatusIcon } from "./StatusIcon";

type TooltipStatusIconsProps = {
  mode: "info" | "warning" | "error" | "success";
  message?: string;
};

export const TooltipStatusIcons: FC<TooltipStatusIconsProps> = ({
  mode,
  message = "This is a tooltip",
}) => {
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  return (
    <Provider disableHoverableContent={!isTooltipOpen}>
      <Tooltip disableHoverableContent={!isTooltipOpen} open={isTooltipOpen}>
        <Trigger asChild>
          <button
            className="cursor-pointer"
            onClick={() => setTooltipOpen((prev) => !prev)}
          >
            <StatusIcon mode={mode} />
          </button>
        </Trigger>
        <Portal>
          <Content
            side="bottom"
            sideOffset={10}
            align="start"
            alignOffset={100}
            className="select-none  rounded p-1 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade"
          >
            <p
              className={classNames({
                "text-destructive body-m": mode === "error",
              })}
            >
              {message}
            </p>
          </Content>
        </Portal>
      </Tooltip>
    </Provider>
  );
};
