import React from "react";
import { View } from "react-native";
import { useFormik } from "formik";
import { Button, H1, Input, LayoutContainer } from "@components";
import { PasswordSchema, setKeychainItem, UsernameSchema } from "@helpers";
import { useLazyGetUserQuery, useLoginMutation } from "@services";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "@state";
import { isErrorResponse } from "@helpers";
import * as Yup from "yup";
import styles from "./styles";

const LoginSchema = Yup.object().shape({
  username: UsernameSchema,
  password: PasswordSchema,
});

type LoginSchemaValues = Yup.InferType<typeof LoginSchema>;

export const LoginScreen: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const [getUser, { isLoading: isFetchingUser }] = useLazyGetUserQuery();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const { values, handleSubmit, errors, handleChange, setFieldError } =
    useFormik<LoginSchemaValues>({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: LoginSchema,
      validateOnChange: false,
      onSubmit: async (vals) => {
        try {
          const response = await login(vals);
          if ("error" in response) {
            throw response?.error;
          }
          if (response?.data?.access_token) {
            await setKeychainItem({
              accessToken: response?.data?.access_token,
            });
            const res = await getUser({});
            if (res?.data) {
              dispatch(setAuthenticated(!!res?.data));
              await setKeychainItem({
                orgToken: res?.data?.memberships[0]?.token,
              });
            }
          }
        } catch (error) {
          if (isErrorResponse(error)) {
            setFieldError("username", error?.data?.error_description);
          }
        }
      },
    });

  return <LayoutContainer testID="login-screen"></LayoutContainer>;
};
