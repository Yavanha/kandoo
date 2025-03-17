import classNames from "classnames";
import { FC } from "react";

type ParagraphProps = {
  text: string;
  severity?: "danger" | "normal";
};

export const Paragraph: FC<ParagraphProps> = ({
  text,
  severity = "normal",
}) => {
  return (
    <p
      className={classNames(
        { "text-medium-grey body-l": severity == "normal" },
        {
          "text-destructive body-m": severity === "danger",
        }
      )}
    >
      {text}
    </p>
  );
};
