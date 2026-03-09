import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface StackProps extends React.ComponentProps<typeof View> {
  direction?: "horizontal" | "vertical";
  gap?: "sm" | "md" | "lg" | "xl";
  margin?: "sm" | "md" | "lg" | "xl";
  marginHorizontal?: "sm" | "md" | "lg" | "xl";
}

export default function HStack({
  children,
  direction,
  gap,
  style,
  margin,
  marginHorizontal,
  ...props
}: StackProps) {
  styles.useVariants({ direction, gap, margin, marginHorizontal });

  return (
    <View style={[styles.stack, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  stack: {
    variants: {
      direction: {
        vertical: {
          flexDirection: "column",
        },
        horizontal: {
          flexDirection: "row",
          alignItems: "center",
        },
        default: {
          flexDirection: "column",
        },
      },
      gap: {
        sm: { gap: theme.margin.sm },
        md: { gap: theme.margin.md },
        lg: { gap: theme.margin.lg },
        xl: { gap: theme.margin.xl },
      },
      margin: {
        sm: { margin: theme.margin.sm },
        md: { margin: theme.margin.md },
        lg: { margin: theme.margin.lg },
        xl: { margin: theme.margin.xl },
      },
      marginHorizontal: {
        sm: { marginHorizontal: theme.margin.sm },
        md: { marginHorizontal: theme.margin.md },
        lg: { marginHorizontal: theme.margin.lg },
        xl: { marginHorizontal: theme.margin.xl },
      },
    },
  },
}));
