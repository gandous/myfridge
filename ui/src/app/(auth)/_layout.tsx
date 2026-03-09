// import { useAuthProvider } from "@/contexts/useAuth";
import { Redirect, Slot } from "expo-router";

export default function Layout() {
  // const { isLogin } = useAuthProvider();
  const isLogin = false;

  if (isLogin) {
    return <Redirect href="/" />;
  }

  return <Slot />;
}
