import React from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { styles, ButtonBaseProps } from "./ButtonBaseImpl";

export default function ButtonBase({
  style,
  color,
  children,
  ...props
}: ButtonBaseProps) {
  styles.useVariants({ color });

  return (
    <Pressable style={StyleSheet.flatten([styles.button, style])} {...props}>
      {children}
    </Pressable>
  );
}
