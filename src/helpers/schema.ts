import * as Yup from "yup";

export const UsernameSchema = Yup.string()
  .required("Username is a required field.");

export const RequiredSchema = Yup.string()
  .required("This is a required field.");

export const PasswordSchema = Yup.string()
  .trim()
  .min(8, "Password must be at least 8 characters long")
  .matches(
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[+!@#$%&*]).+$/,
    "Must include at least 1 number, 1 capital letter and 1 special character (+!@#$%&*)"
  )
  .required("Password is a required field.");

