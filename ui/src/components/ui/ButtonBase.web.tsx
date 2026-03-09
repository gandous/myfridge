import React from "react";
import { View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { ButtonBaseProps } from "./ButtonBaseImpl";
import { styles } from "./ButtonBaseImpl";

export default function ButtonBase({
  children,
  color,
  style,
  ...props
}: ButtonBaseProps) {
  styles.useVariants({ color });

  return (
    <Pressable style={[style, { overflow: "hidden" }]} {...props}>
      <View style={styles.button}>{children}</View>
    </Pressable>
  );
}
