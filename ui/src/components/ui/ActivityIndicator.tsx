import React, { useMemo } from "react";
import { ActivityIndicator as RNActivityIndicator } from "react-native";
import { ColorVariant } from "@/constants/themes";
import { useUnistyles } from "react-native-unistyles";

interface ActivityIndicatorProps
  extends React.ComponentProps<typeof RNActivityIndicator> {
  color?: ColorVariant;
}

export default function ActivityIndicator({
  color,
  ...props
}: ActivityIndicatorProps) {
  const { theme } = useUnistyles();

  const colorHex = useMemo(() => {
    return color != null ? theme.colors[color] : theme.colors.textSecondary;
  }, [theme.colors, color]);

  return <RNActivityIndicator color={colorHex} {...props} />;
}
