import React, { useEffect } from "react";
import { View } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

interface SliderProps extends React.ComponentProps<typeof View> {
  value: number;
  onChange: (percentage: number) => void;
  onDragStart: () => void;
  onDragComplete: (percentage: number) => void;
}

export default function Slider({
  style,
  value,
  onChange,
  onDragStart,
  onDragComplete,
}: SliderProps) {
  const xPos = useSharedValue(0);
  const width = useSharedValue(0);
  const drag = useSharedValue(false);
  const slideIndicatorWidth = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .minDistance(1)
    .maxPointers(1)
    .onStart(() => {
      runOnJS(onDragStart);
      drag.value = true;
    })
    .onUpdate((e) => {
      xPos.value += e.x - slideIndicatorWidth.value / 2;
      if (xPos.value < 0) {
        xPos.value = 0;
      } else if (xPos.value > width.value) {
        xPos.value = width.value;
      }
      const percentage = xPos.value / width.value;
      runOnJS(onChange)(percentage);
    })
    .onFinalize(() => {
      drag.value = false;
      const percentage = xPos.value / width.value;
      runOnJS(onDragComplete)(percentage);
    });

  const animatedSlideIndicatorStyle = useAnimatedStyle(() => {
    return {
      left: xPos.value,
      transform: [{ translateX: -slideIndicatorWidth.value / 2 }],
    };
  }, [xPos]);

  const animatedProgressBarStyle = useAnimatedStyle(() => {
    return {
      width: xPos.value,
    };
  }, [xPos]);

  useEffect(() => {
    if (drag.value === false) {
      xPos.value = width.value * value;
    }
  }, [drag.value, xPos, width.value, value]);

  return (
    <View
      onLayout={({ nativeEvent }) => {
        width.value = nativeEvent.layout.width;
        xPos.value = nativeEvent.layout.width * value;
      }}
      style={[style, styles.sliderContainer]}
    >
      <View style={styles.backgroudBar} />
      <Animated.View style={[styles.progressBar, animatedProgressBarStyle]} />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          onLayout={({ nativeEvent }) => {
            slideIndicatorWidth.value = nativeEvent.layout.width;
          }}
          style={[styles.slideIndicator, animatedSlideIndicatorStyle]}
        />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  sliderContainer: {
    _web: {
      display: "block",
    },
  },
  backgroudBar: {
    width: "100%",
    top: "33%",
    bottom: "33%",
    borderRadius: 10,
    backgroundColor: theme.colors.backgroundInput,
    position: "absolute",
  },
  progressBar: {
    backgroundColor: theme.colors.primary,
    top: "33%",
    bottom: "33%",
    borderRadius: 10,
    position: "absolute",
  },
  slideIndicator: {
    backgroundColor: theme.colors.primary,
    height: "100%",
    aspectRatio: 1,
    borderRadius: 50,
  },
}));
