import React from "react";
import { View } from "react-native";
import { useFormik } from "formik";
import { Button, H1, Input, LayoutContainer } from "@components";
import { RequiredSchema } from "@helpers";
import { useCreateInvoiceMutation } from "@services";
import * as Yup from "yup";
import { mockedInvoice } from "../../services/mock";
import { goBack } from "@navigators";
import styles from "./styles";

const NewInvoiceSchema = Yup.object().shape({
  invoiceNumber: RequiredSchema,
  firstName: RequiredSchema,
  lastName: RequiredSchema,
});

type NewInvoiceSchemaValues = Yup.InferType<typeof NewInvoiceSchema>;

export const NewInvoiceScreen: React.FunctionComponent = () => {
  const [createInvoice, { isLoading: isCreateInvoiceLoading }] =
    useCreateInvoiceMutation();
  const { values, handleSubmit, errors, handleChange } =
    useFormik<NewInvoiceSchemaValues>({
      initialValues: {
        invoiceNumber: "",
        firstName: "",
        lastName: "",
      },
      validationSchema: NewInvoiceSchema,
      validateOnChange: false,
      onSubmit: async (vals) => {
        const customer = {
          ...mockedInvoice.customer,
          ...{ firstName: vals.firstName, lastName: vals.lastName },
        };
        try {
          const response = await createInvoice({
            invoices: [
              {
                ...mockedInvoice,
                invoiceNumber: vals.invoiceNumber,
                customer,
              },
            ],
          });
          if ("error" in response) {
            throw response?.error;
          }
          if (response?.data) {
            goBack();
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  return (
    <LayoutContainer>
      <View style={styles.container}>
        <H1>New Invoice</H1>
        <View style={styles.inputContainer}>
          <Input
            containerStyle={styles.input}
            onChangeText={handleChange("invoiceNumber")}
            value={values.invoiceNumber}
            placeholder="Invoice number"
            errorMessage={errors?.invoiceNumber}
            keyboardType="number-pad"
          />
          <Input
            containerStyle={styles.input}
            onChangeText={handleChange("firstName")}
            value={values.firstName}
            placeholder="First name"
            errorMessage={errors?.firstName}
          />
          <Input
            containerStyle={styles.input}
            onChangeText={handleChange("lastName")}
            value={values.lastName}
            placeholder="Last name"
            errorMessage={errors?.lastName}
          />
        </View>
        <Button
          style={styles.button}
          type="medium"
          onPress={handleSubmit}
          loading={isCreateInvoiceLoading}
        >
          Create
        </Button>
      </View>
    </LayoutContainer>
  );
};
