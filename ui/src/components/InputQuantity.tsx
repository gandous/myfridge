import React from "react";
import { t } from "@lingui/core/macro";
import { View } from "react-native";
import {
  Controller,
  ControllerProps,
  FieldError,
  FieldErrors,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import TextInput from "@/components/ui/TextInput";
import Text from "@/components/ui/Text";
import Select from "@/components/ui/Select";
import Stack from "@/components/ui/Stack";
import { StyleSheet } from "react-native-unistyles";
import { Unit } from "@/constants/enum";

interface InputQuantityProps<TFieldValues extends FieldValues> extends Omit<
  React.ComponentProps<typeof TextInput>,
  "defaultValue"
> {
  control: ControllerProps<TFieldValues>["control"];
  name: FieldPath<TFieldValues>;
  shouldUnregister?: any;
  defaultValue?: any;
  disable?: boolean;
  errors?: FieldErrors<TFieldValues>;
}

export default function InputQuantity<TFieldValues extends FieldValues>({
  name,
  control,
  errors,
  shouldUnregister,
  defaultValue,
  style,
  ...props
}: InputQuantityProps<TFieldValues>) {
  const error = errors?.[name] as FieldError;

  return (
    <View>
      <Text style={styles.label}>{t`Quantity:`}</Text>
      <Stack direction="horizontal">
        <Controller
          control={control}
          // rules={rules} rule in t only
          name={`${name}.value` as any}
          shouldUnregister={shouldUnregister}
          defaultValue={defaultValue}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[error != null ? styles.inputError : null, style]}
              value={value}
              onChangeText={(text) => onChange(Number(text))}
              onBlur={onBlur}
              {...props}
            />
          )}
        />
        <Controller
          control={control}
          name={`${name}.unit` as any}
          shouldUnregister={shouldUnregister}
          defaultValue={defaultValue}
          render={({ field: { onChange, onBlur, value } }) => (
            <Select
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              {...props}
            >
              <Select.Option text={t`Gr`} value={Unit.Gr} />
              <Select.Option text={t`Cl`} value={Unit.Cl} />
              <Select.Option text={t`Unit`} value={Unit.Unit} />
            </Select>
          )}
        />
      </Stack>
      {error != null ? <Text color="error">{error.message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  inputError: {
    color: theme.colors.text, // Typescript get mad if we just put the outline value, so we just add a useless value
    outlineColor: theme.colors.red,
    outlineStyle: "solid",
    outlineWidth: 1.5,
  },
  label: {
    marginBottom: theme.margin.sm,
  },
}));
