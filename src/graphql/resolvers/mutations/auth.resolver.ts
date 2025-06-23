import { GraphQLError } from "graphql";
import { Resolvers, UmsPermissions } from "../../generated/graphql.ts";
import {
  saveUserToDatabase,
  userLoginEmail,
  userSignUpEmail,
} from "../../actions/auth.ts";
import schemaValidateOrThrow from "../../utils/validation/index.ts";
import {
  userSignInInputSchema,
  userSignUpInputSchema,
} from "../../utils/validation/inputSchema.ts";

const authMutations: Resolvers["Mutation"] = {
  umsSignUpWithEmail: async (_, { input }) => {
    const validatedPayload = await schemaValidateOrThrow(
      userSignUpInputSchema,
      input
    );

    try {
      // signup using Supabase
      const signUpResponse = await userSignUpEmail(validatedPayload);

      // save user to postgres database
      const res = await saveUserToDatabase(signUpResponse.user);

      return {
        ...signUpResponse,
        user: {
          ...signUpResponse.user,
          permissions: res.roleData.Permissions.map(
            (p) => p.name as UmsPermissions
          ),
        },
      };
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },

  umsLoginWithEmail: async (_, { input }) => {
    const validatedPayload = await schemaValidateOrThrow(
      userSignInInputSchema,
      input
    );

    try {
      const loginResponse = await userLoginEmail(validatedPayload);
      return loginResponse;
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
};

export default authMutations;
