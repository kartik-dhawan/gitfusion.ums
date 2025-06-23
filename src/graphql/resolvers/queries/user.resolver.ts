import { fetchUsersFromDatabase } from "../../actions/user.ts";
import { Resolvers } from "../../generated/graphql.ts";
import schemaValidateOrThrow from "../../utils/validation/index.ts";
import { fetchUsersInputSchema } from "../../utils/validation/inputSchema.ts";

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
};

export default userQueries;
