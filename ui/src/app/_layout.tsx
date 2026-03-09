import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useLocales } from "expo-localization";

import { messages as messagesEn } from "@/locales/en/messages";
import { messages as messagesFr } from "@/locales/fr/messages";
import { Platform } from "react-native";
import { darkTheme } from "@/constants/themes";

export const unstable_settings = {
  anchor: "(tabs)",
};

const ReactNavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: darkTheme.colors.primary,
  },
};

i18n.load("en", messagesEn);
i18n.load("fr", messagesFr);
i18n.activate("en", messagesEn);

function App() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

function WebApp() {
  // useFonts({
  //   Cantarell: require("@/assets/fonts/Cantarell-Regular.woff2"),
  // });

  return <App />;
}

export default function Layout() {
  const locale = useLocales();
  useEffect(() => i18n.activate(locale[0].languageCode || "en"), [locale]);

  return (
    <I18nProvider i18n={i18n}>
      {/*<Provider store={store}>*/}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={ReactNavigationTheme}>
          <StatusBar style="auto" />
          {Platform.OS === "web" ? <WebApp /> : <App />}
        </ThemeProvider>
      </GestureHandlerRootView>
      {/*</Provider>*/}
    </I18nProvider>
  );
}
