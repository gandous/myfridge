import React, { useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  useUnistyles,
  withUnistyles,
} from "react-native-unistyles";
import { ColorVariant, SizeVariant } from "@/constants/themes";

const UniIcon = withUnistyles(Ionicons);

type IconProps = Omit<React.ComponentProps<typeof Ionicons>, "size"> & {
  color?: ColorVariant | "text" | "textSecondary";
  size?: SizeVariant | number;
  mirror?: boolean;
};

export default function Icon({
  color,
  mirror,
  size,
  style,
  ...props
}: IconProps) {
  styles.useVariants({ color, mirror });
  const { theme } = useUnistyles();
  const sizeValue = useMemo(() => {
    if (typeof size === "number") {
      return size;
    }
    switch (size) {
      case "sm":
        return theme.iconSize.sm;
      case "md":
        return theme.iconSize.md;
      case "lg":
        return theme.iconSize.lg;
      case "xl":
        return theme.iconSize.xl;
      default:
        return theme.iconSize.md;
    }
  }, [theme, size]);

  return <UniIcon style={[styles.icon, style]} {...props} size={sizeValue} />;
}

const styles = StyleSheet.create((theme) => ({
  icon: {
    variants: {
      color: {
        primary: {
          color: theme.colors.primary,
        },
        secondary: {
          color: theme.colors.secondary,
        },
        error: {
          color: theme.colors.red,
        },
        warning: {
          color: theme.colors.orange,
        },
        success: {
          color: theme.colors.green,
        },
        text: {
          color: theme.colors.text,
        },
        textSecondary: {
          color: theme.colors.textSecondary,
        },
        none: {},
        default: {
          color: theme.colors.text,
        },
      },
      mirror: {
        true: {
          transform: [{ scaleY: -1 }, { rotate: "180deg" }],
        },
        false: {},
      },
    },
  },
}));
