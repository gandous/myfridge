import React from "react";
import { ActivityIndicator } from "react-native";
import ButtonBase from "./ButtonBase";
import Text from "./Text";

interface ButtonProps extends React.ComponentProps<typeof ButtonBase> {
  loading?: boolean;
  title: string;
}

export default function Button({ title, loading, ...props }: ButtonProps) {
  return (
    <ButtonBase {...props}>
      {loading === true ? (
        <ActivityIndicator color="#000000" />
      ) : (
        <Text selectable={false}>{title}</Text>
      )}
    </ButtonBase>
  );
}
