import React from "react";
import { View } from "react-native";
import {
  Controller,
  ControllerProps,
  FieldError,
  FieldErrors,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import TextInput from "./TextInput";
import Text from "./Text";
import { StyleSheet } from "react-native-unistyles";

interface ControlTextInputProps<TFieldValues extends FieldValues>
  extends Omit<React.ComponentProps<typeof TextInput>, "defaultValue"> {
  control: ControllerProps<TFieldValues>["control"];
  name: FieldPath<TFieldValues>;
  rules?: ControllerProps<TFieldValues>["rules"];
  shouldUnregister?: any;
  defaultValue?: any;
  disable?: boolean;
  label?: string;
  errors?: FieldErrors<TFieldValues>;
}

interface ContentProps extends React.ComponentProps<typeof TextInput> {
  error: FieldError;
}

function Content({ error, style, ...props }: ContentProps) {
  return (
    <>
      <TextInput
        style={[error != null ? styles.input : null, style]}
        {...props}
      />
      {error != null ? <Text color="error">{error.message}</Text> : null}
    </>
  );
}

export default function ControlTextInput<TFieldValues extends FieldValues>({
  name,
  label,
  control,
  errors,
  rules,
  shouldUnregister,
  defaultValue,
  ...props
}: ControlTextInputProps<TFieldValues>) {
  return (
    <View>
      {label != null ? <Text style={styles.label}>{label}</Text> : null}
      <Controller
        control={control}
        rules={rules}
        name={name}
        shouldUnregister={shouldUnregister}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value } }) => (
          <Content
            error={errors?.[name] as FieldError}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...props}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  input: {
    color: theme.colors.text, // Typescript get mad if we just put the outline value, so we just add a useless value
    outlineColor: theme.colors.red,
    outlineStyle: "solid",
    outlineWidth: 1.5,
  },
  label: {
    marginBottom: theme.margin.sm,
  },
}));
