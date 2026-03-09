import React from "react";
import { ViewStyle } from "react-native";

export const ACTION_MAX_DEPTH = 1;

export type DropDownAction = {
  title: string;
  selected?: boolean;
  onPress?: () => void;
  // actions?: DropDownAction[];
};

export type DropDownProps = {
  actions: DropDownAction[];
  children: React.ReactNode;
  style?: ViewStyle;
};
