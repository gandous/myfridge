import React from "react";
import { View } from "react-native";
import { t } from "@lingui/core/macro";
import { TypedUseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { StyleSheet } from "react-native-unistyles";

import Button from "@/components/ui/Button";
import Stack from "@/components/ui/Stack";
import ActivityIndicator from "@/components/ui/ActivityIndicator";
import TextError from "./TextError";

type LoaderProps<T, U, V extends BaseQueryFn> = {
  query: TypedUseQuery<T, U, V>;
  param?: U;
  render: (data: T) => React.ReactNode;
};

export default function Loader<T, U, V extends BaseQueryFn>({
  query,
  param,
  render,
}: LoaderProps<T, U, V>) {
  const { data, isLoading, error, refetch } = query(param as any);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  } else if (error != null) {
    return (
      <Stack gap="md" style={styles.center}>
        <TextError color="text" error={error} />
        <Button title={t`Retry`} onPress={refetch} />
      </Stack>
    );
  } else {
    return render(data);
  }
}

const styles = StyleSheet.create(() => ({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}));
