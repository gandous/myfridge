import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { ColorVariant } from "@/constants/themes";

export type ProgressBarProps = React.ComponentProps<typeof View> & {
  value: number;
  color?: ColorVariant;
};

export default function ProgressBar({ style, color, value }: ProgressBarProps) {
  styles.useVariants({ color });

  return (
    <View style={[styles.background, style]}>
      <View style={[styles.bar, { width: `${value}%`, height: "100%" }]} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  background: {
    backgroundColor: theme.colors.backgroundInput,
    borderRadius: 1000,
    overflow: "hidden",
  },
  bar: {
    variants: {
      color: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
        },
        error: {
          backgroundColor: theme.colors.red,
        },
        warning: {
          backgroundColor: theme.colors.orange,
        },
        success: {
          backgroundColor: theme.colors.green,
        },
        none: {},
        default: {
          backgroundColor: theme.colors.primary,
        },
      },
    },
  },
}));
