import React from "react";
import Text from "./Text";
import { SerializedError } from "@reduxjs/toolkit";
import { ApiError } from "@/api";

interface TextErrorProps extends React.ComponentProps<typeof Text> {
  error?: ApiError | SerializedError;
}

export default function TextError({ error, color, ...props }: TextErrorProps) {
  if (error == null) {
    return null;
  } else {
    return (
      <Text color={color != null ? color : "error"} {...props}>
        {"data" in error
          ? error.data.err_code
          : "error" in error
            ? (error.error as string)
            : error.message}
      </Text>
    );
  }
}
