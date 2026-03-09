import React, { forwardRef } from "react";
import { TextInput as RNTextInput } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

type TextInputProps = React.ComponentProps<typeof RNTextInput>;

const UniTextInput = withUnistyles(RNTextInput, (theme) => ({
  placeholderTextColor: theme.colors.textSecondary,
}));

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ style, ...props }, ref) => {
    return (
      <UniTextInput style={[styles.textInput, style]} ref={ref} {...props} />
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;

const styles = StyleSheet.create((theme) => ({
  textInput: {
    backgroundColor: theme.colors.backgroundInput,
    color: theme.colors.text,
    borderRadius: theme.borderRadius.md,
    fontSize: theme.fontSize.p,
    padding: 8,
    outlineStyle: "none",
    _web: {
      fontFamily: theme.fontFamilyWeb,
      _focus: {
        outline: `1px solid ${theme.colors.primary}`,
      },
    },
  },
}));
