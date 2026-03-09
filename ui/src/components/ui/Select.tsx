import React from "react";
import { StyleSheet } from "react-native";
import { useUnistyles } from "react-native-unistyles";

interface OptionProps {
  value: any;
  text: string;
}

const Option = ({ value, text }: OptionProps) => {
  return <option value={value}>{text}</option>;
};

interface SelectProps {
  children: React.ReactNode;
  style?: any;
  onChange: (value: any) => void;
  value?: any;
}

const Select = ({ children, style, value, onChange }: SelectProps) => {
  const { theme } = useUnistyles();

  return (
    <select
      value={value}
      onChange={(evt) => onChange(evt.target.value)}
      style={StyleSheet.flatten([
        {
          backgroundColor: theme.colors.backgroundInput,
          color: theme.colors.text,
          fontSize: 17,
          fontWeight: "500",
          borderStyle: "none",
          borderRadius: theme.borderRadius.md,
        },
        style,
      ])}
    >
      {children}
    </select>
  );
};

Select.Option = Option;

export default Select;
