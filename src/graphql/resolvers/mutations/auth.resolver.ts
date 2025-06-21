import { GraphQLError } from "graphql";
import { Resolvers, UmsUser, UmsUserRole } from "../../generated/graphql.ts";
import {
  saveUserToDatabase,
  userLoginEmail,
  userSignUpEmail,
} from "../../actions/auth.ts";
import supabase from "../../../supabase/config.ts";
import prisma from "../../../prisma/index.ts";

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
  umsLoginWithEmail: async (_, { input }) => {
    try {
      const user = await userLoginEmail(input);
      return user;
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
};

export default authMutations;
