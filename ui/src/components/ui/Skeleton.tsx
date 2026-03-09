import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withRepeat,
  useSharedValue,
  Easing,
} from "react-native-reanimated";
import Color from "color";

type SkeletonProps = React.ComponentProps<typeof Animated.View>;

export default function Skeleton({ style, children, ...props }: SkeletonProps) {
  const flattenStyle = StyleSheet.flatten(style);
  const [targetColor, setTargetColor] = useState();
  const color = useSharedValue("");

  useEffect(() => {
    const tcolor = Color(
      typeof flattenStyle === "object" &&
        flattenStyle !== null &&
        "backgroundColor" in flattenStyle
        ? flattenStyle.backgroundColor
        : "#000",
    );
    color.value = tcolor.darken(0.4).rgb().string();
    setTargetColor(tcolor.darken(0.6).rgb().string());
  }, [style, color, flattenStyle]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: color.value,
    };
  });

  color.value = withRepeat(
    withTiming(targetColor, { duration: 800, easing: Easing.ease }),
    -1,
    true,
  );

  return (
    <Animated.View style={[flattenStyle, animatedStyle]} {...props}>
      {children}
    </Animated.View>
  );
}
