import { GraphQLError } from "graphql";
import { fetchUserById, fetchUsersFromDatabase } from "../../actions/user.ts";
import { Resolvers, UmsUser } from "../../generated/graphql.ts";
import schemaValidateOrThrow from "../../utils/validation/index.ts";
import { fetchUsersInputSchema } from "../../utils/validation/inputSchema.ts";
import { responseMessages } from "../../utils/messages.ts";

const userQueries: Resolvers["Query"] = {
  umsGetUsers: async (_, { input }) => {
    const validatedPayload = await schemaValidateOrThrow(
      fetchUsersInputSchema,
      input
    );

    try {
      const usersResponse = await fetchUsersFromDatabase(validatedPayload);
      return usersResponse;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  },

  umsGetUser: async (_, { userId }) => {
    try {
      const userById = await fetchUserById(userId);

      if (!userById) {
        throw new Error(`${responseMessages.USER.NOT_FOUND} ID: ${userId}`);
      }

      return userById as UmsUser;
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
};

export default userQueries;
