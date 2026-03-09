import React from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";

import Text from "@/components/ui/Text";
import Card from "@/components/ui/Card";
// import TaiglaLogo from "@/assets/icons/taigla-logo.svg";
import { useUnistyles } from "react-native-unistyles";

interface AuthContainerProps {
  children: React.ReactNode;
}

export default function AuthContainer({ children }: AuthContainerProps) {
  const { theme } = useUnistyles();

  return (
    <View style={StyleSheet.absoluteFill}>
      <KeyboardAvoidingView behavior="height" style={StyleSheet.absoluteFill}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          bounces={false}
        >
          <View style={{ alignItems: "center" }}>
            {/*<TaiglaLogo width={128} height={128} />*/}
            <Text size="h1">MyFridge</Text>
          </View>
          <Card style={{ maxWidth: 400, width: "90%", gap: theme.margin.lg }}>
            {children}
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
