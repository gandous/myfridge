import React from "react";
import { useForm } from "react-hook-form";
import { t } from "@lingui/core/macro";

import ControlTextInput from "@/components/ui/ControlTextInput";
import Button from "@/components/ui/Button";
import AuthContainer from "@/components/AuthContainer";
import TextError from "@/components/ui/TextError";
import AuthLink from "@/components/AuthLink";
import { useRegisterMutation } from "@/api/auth";
import { useAuthProvider } from "@/contexts/useAuth";

export default function Login() {
  const { setToken } = useAuthProvider();
  const [register, result] = useRegisterMutation();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "", "repeat-password": "" },
  });

  function onSubmit(data) {
    register({ email: data.email, password: data.password })
      .unwrap()
      .then((data) => {
        setToken(data.token);
      });
  }

  return (
    <AuthContainer>
      <ControlTextInput
        name="email"
        label={t`Email:`}
        rules={{ required: true }}
        control={control}
        textContentType="emailAddress"
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
      <ControlTextInput
        name="repeat-password"
        label={t`Repeat password:`}
        rules={{
          required: true,
          validate: (value) =>
            value === watch("password") || "Password don't match",
        }}
        control={control}
        textContentType="password"
        secureTextEntry={true}
        errors={errors}
        editable={!result.isLoading}
      />
      <TextError error={result.error} />
      <Button
        loading={result.isLoading}
        onPress={() => handleSubmit(onSubmit)()}
        color="primary"
        title={t`Register`}
        disabled={result.isLoading}
      />
      <AuthLink
        links={[
          {
            name: t`Reset password`,
            href: "/reset-password",
          },
          {
            name: t`Login`,
            href: "/login",
          },
        ]}
      />
    </AuthContainer>
  );
}
