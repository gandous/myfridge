import React from "react";
import { Platform } from "react-native";
import { useForm } from "react-hook-form";
import { t } from "@lingui/core/macro";

import ControlTextInput from "@/components/ui/ControlTextInput";
import Button from "@/components/ui/Button";
import AuthContainer from "@/components/AuthContainer";
import TextError from "@/components/ui/TextError";
// import { useAuthProvider } from "@/contexts/useAuth";
// import { useLoginMutation } from "@/api/auth";

export default function Login() {
  // const { setToken } = useAuthProvider();
  // const [login, result] = useLoginMutation();
  const result = { isLoading: false, error: undefined };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: "", password: "" } });

  function onSubmit(data) {
    // login({ username: data.username, password: data.password })
    //   .unwrap()
    //   .then((data) => {
    //     setToken(data.token);
    //   });
  }

  return (
    <AuthContainer>
      <ControlTextInput
        name="username"
        label={t`Username:`}
        rules={{ required: true }}
        control={control}
        textContentType="username"
        editable={!result.isLoading}
        autoCapitalize="none"
        errors={errors}
      />
      <ControlTextInput
        name="password"
        label={t`Password:`}
        rules={{ required: true }}
        control={control}
        textContentType="password"
        secureTextEntry={true}
        editable={!result.isLoading}
        errors={errors}
      />
      <TextError error={result.error} />
      <Button
        loading={result.isLoading}
        onPress={() => handleSubmit(onSubmit)()}
        color="primary"
        title="Login"
        disabled={result.isLoading}
      />
      {/*<AuthLink
        links={[
          Platform.OS !== "web"
            ? {
                name: t`Change server`,
                href: "/server-address",
              }
            : null,
          {
            name: t`Register`,
            href: "/register",
          },
        ]}
      />*/}
    </AuthContainer>
  );
}
