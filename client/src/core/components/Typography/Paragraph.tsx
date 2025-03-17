import classNames from "classnames";
import { FC } from "react";

type ParagraphProps = {
  text: string;
  severity?: "danger" | "normal";
  align?: "left" | "center" | "right";
  size?: "body-l" | "heading-l" | "body-m" | "heading-xl";
};

export const Paragraph: FC<ParagraphProps> = ({
  text,
  severity = "normal",
  align = "left",
  size = severity === "danger" ? "body-l" : "body-m",
}) => {
  return (
    <p
      className={classNames(
        { "text-medium-grey": severity == "normal" },
        {
          "text-destructive": severity === "danger",
        },
        {
          "heading-l": size === "heading-l",
        },
        {
          "heading-xl": size === "heading-xl",
        },
        {
          "body-l": size === "body-l",
        },
        {
          "body-m": size === "body-m",
        },
        {
          "text-left": align === "left",
        },
        {
          "text-right": align === "right",
        },
        {
          "text-center": align === "center",
        }
      )}
    >
      {text}
    </p>
  );
};
