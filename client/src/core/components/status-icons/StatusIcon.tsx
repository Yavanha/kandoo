import React from "react";
import {
  InfoCircledIcon,
  ExclamationTriangleIcon,
  CrossCircledIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons"; // Adjust import path if needed

interface StatusIconProps {
  mode: "info" | "warning" | "error" | "success";
  className?: string;
}

export const StatusIcon: React.FC<StatusIconProps> = ({
  mode,
  className = "",
}) => {
  return (
    <>
      {mode === "info" && (
        <InfoCircledIcon className={`w-[20px] h-[20px] ${className}`} />
      )}
      {mode === "warning" && (
        <ExclamationTriangleIcon
          className={`w-[20px] h-[20px] text-warning ${className}`}
        />
      )}
      {mode === "error" && (
        <CrossCircledIcon
          className={`w-[20px] h-[20px] stroke-destructive ${className}`}
        />
      )}
      {mode === "success" && (
        <CheckCircledIcon
          className={`w-[20px] h-[20px] text-success ${className}`}
        />
      )}
    </>
  );
};
