import React from "react";
import { Pressable } from "react-native-gesture-handler";
import { ColorVariant } from "@/constants/themes";
import { StyleSheet } from "react-native-unistyles";
import { ViewStyle } from "react-native";

export interface ButtonBaseProps
  extends Omit<React.ComponentProps<typeof Pressable>, "style"> {
  color?: ColorVariant;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export const styles = StyleSheet.create((theme) => ({
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: theme.borderRadius.md,
    padding: 10,
    variants: {
      color: {
        primary: {
          backgroundColor: theme.colors.primary,
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
        },
        error: {
          backgroundColor: theme.colors.backgroundRed,
        },
        warning: {
          backgroundColor: theme.colors.backgroundOrange,
        },
        success: {
          backgroundColor: theme.colors.backgroundGreen,
        },
        none: {},
        default: {
          backgroundColor: theme.colors.backgroundInput,
        },
      },
    },
    _web: {
      filter: "brightness(1)",
      transition: "filter 300ms, transform 300ms",
      _hover: {
        filter: "brightness(0.8)",
      },
      _active: {
        transform: "scale(0.95)",
      },
    },
  },
  overlay: {
    borderRadius: theme.borderRadius.md,
    backgroundColor: "black",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
}));
