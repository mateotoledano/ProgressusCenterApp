import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const LoadingSkeleton = ({
  variant = "rectangular",
  className ,
  count = 1,
  size = 40,
  width = 210,
  height = 60,
  spacing = 1,
  ...rest
}) => {
  return (
    <div className={`flex justify-around gap-5 flex-wrap ${className}`}>
      {[...Array(count)].map((_, index) => (
        <Skeleton
          key={index}
          variant={variant}
          width={variant === "circular" ? size : width}
          height={variant === "circular" ? size : height}
        />
      ))}
    </div>
  );
};
