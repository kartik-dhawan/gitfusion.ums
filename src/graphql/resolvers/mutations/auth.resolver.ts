import { GraphQLError } from "graphql";
import { Resolvers } from "../../generated/graphql.ts";
import {
  saveUserToDatabase,
  userLoginEmail,
  userSignUpEmail,
} from "../../actions/auth.ts";

const authMutations: Resolvers["Mutation"] = {
  umsSignUpWithEmail: async (_, { input }) => {
    try {
      // signup using Supabase
      const signUpResponse = await userSignUpEmail(input);

      // save user to postgres database
      await saveUserToDatabase(signUpResponse.user);

      return signUpResponse;
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
  umsLoginWithEmail: async (_, { input }) => {
    try {
      const loginResponse = await userLoginEmail(input);
      return loginResponse;
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
};

export default authMutations;
