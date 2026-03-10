import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import { setToken as reduxSetToken } from "@/reducers/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";

type AuthContextType = {
  setToken: (token: string) => void;
  logout: () => void;
  isLogin: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children?: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCred = async () => {
      let token;
      if (Platform.OS === "web") {
        token = localStorage.getItem("token");
      } else {
        token = await SecureStore.getItemAsync("token");
      }
      return { token };
    };
    loadCred().then((cred) => {
      setIsLoading(false);
      dispatch(reduxSetToken(cred.token));
    });
  }, [dispatch]);

  const setToken = (token: string | null) => {
    if (token == null || token.length === 0) {
      if (Platform.OS === "web") {
        localStorage.removeItem("token");
      } else {
        SecureStore.deleteItemAsync("token");
      }
    } else {
      if (Platform.OS === "web") {
        localStorage.setItem("token", token);
      } else {
        SecureStore.setItemAsync("token", token);
      }
    }
    dispatch(reduxSetToken(token));
  };

  const logout = () => {
    setToken(null);
    if (Platform.OS === "web") {
      localStorage.clear();
    } else {
      SecureStore.deleteItemAsync("token");
    }
  };

  const isLogin = auth.token != null;

  return (
    <AuthContext value={{ setToken, logout, isLogin }}>
      {isLoading ? null : children}
    </AuthContext>
  );
}

export const useAuthProvider = () => useContext(AuthContext) as AuthContextType;
