import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import { Schema, ValidationError } from "yup";

const schemaValidateOrThrow = async <T>(
  schema: Schema<T>,
  payload: T
): Promise<T> => {
  try {
    // collect all errors
    return await schema.validate(payload, { abortEarly: false });
  } catch (err) {
    if (err instanceof ValidationError) {
      const validationErrors = err.inner.map((e) => ({
        path: e.path!,
        message: e.message,
      }));
      throw new GraphQLError("Input validation failed", {
        extensions: {
          code: ApolloServerErrorCode.BAD_USER_INPUT,
          validationErrors, // your array of { path, message }
        },
      });
    }
    throw err; // re-throw unknown errors
  }
};

export default schemaValidateOrThrow;
