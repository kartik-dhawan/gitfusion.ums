import { fetchUsersFromDatabase } from "../../actions/auth.ts";
import { Resolvers } from "../../generated/graphql.ts";

const authQueries: Resolvers["Query"] = {
  umsGetUsers: async (_, { input }) => {
    try {
      const usersResponse = await fetchUsersFromDatabase(input);
      return usersResponse;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  },
};

export default authQueries;
