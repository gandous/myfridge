import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import Text from "@/components/ui/Text";
import Stack from "@/components/ui/Stack";
import IconButton from "@/components/ui/IconButton";

interface PageContaninerProps {
  title: string;
  onNewPressed?: () => void;
  children: React.ReactNode;
}

export default function PageContainer({
  title,
  onNewPressed,
  children,
}: PageContaninerProps) {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.pageContainer}>
      <Stack direction="horizontal" style={styles.titleContainer}>
        <Text size="h2">{title}</Text>
        {onNewPressed != null ? (
          <IconButton icon="add" onPress={onNewPressed} color="primary" />
        ) : null}
      </Stack>
      {children}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  pageContainer: {
    flex: 1,
    margin: theme.margin.xl,
  },
  titleContainer: {
    marginBottom: theme.margin.md,
    justifyContent: "space-between",
  },
}));
