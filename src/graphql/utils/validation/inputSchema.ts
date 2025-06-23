import * as yup from "yup";
import { UmsUserRole } from "../../generated/graphql.ts";

/* ========================== COMMON ========================== */
export const paginationSchema = yup.object({
  pageNumber: yup
    .number()
    .required()
    .min(1, ({ min }) => `Page number must be at least ${min}`),
  pageSize: yup
    .number()
    .required()
    .min(1, ({ min }) => `Page size must be at least ${min}`),
});

/* ========================== AUTH ========================== */
export const fetchUsersInputSchema = yup
  .object({
    pagination: paginationSchema,
    search: yup.string().optional(),
  })
  .required();

export const userSignInInputSchema = yup.object({
  email: yup
    .string()
    .email("Email must be of valid type.")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, ({ min }) => `Password must be at least ${min} characters long.`),
});

export const userSignUpInputSchema = userSignInInputSchema.concat(
  yup.object({
    username: yup.string().optional(),
    firstName: yup
      .string()
      .required("First name is required.")
      .min(
        3,
        ({ min }) => `First name must be at least ${min} characters long.`
      ),
    lastName: yup.string().required("Last name is required."),
    role: yup.mixed<UmsUserRole>().required("Role is required."),
  })
);
