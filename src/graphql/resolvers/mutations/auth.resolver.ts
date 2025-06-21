import { GraphQLError } from "graphql";
import { Resolvers } from "../../generated/graphql.ts";
import { saveUserToDatabase, userSignUpEmail } from "../../actions/auth.ts";

const authMutations: Resolvers["Mutation"] = {
  umsSignUpWithEmail: async (_, { input }) => {
    try {
      // signup using Supabase
      const response = await userSignUpEmail(input);

      // save user to postgres database
      await saveUserToDatabase(response);

      return response;
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
};

export default authMutations;
