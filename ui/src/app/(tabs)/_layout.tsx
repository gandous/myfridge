import { useAuthProvider } from "@/contexts/useAuth";
import { Tabs, Redirect } from "expo-router";
import { t } from "@lingui/core/macro";

export default function Layout() {
  const { isLogin } = useAuthProvider();

  if (!isLogin) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="my-fridge" options={{ title: t`My fridge` }} />
      <Tabs.Screen name="account" options={{ title: t`Account` }} />
    </Tabs>
  );
}
