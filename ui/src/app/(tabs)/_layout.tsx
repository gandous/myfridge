import { useAuthProvider } from "@/contexts/useAuth";
import { Redirect, Slot } from "expo-router";

export default function Layout() {
  const { isLogin } = useAuthProvider();

  if (!isLogin) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
