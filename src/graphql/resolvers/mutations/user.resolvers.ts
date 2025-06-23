import { GraphQLError } from "graphql";
import { Resolvers } from "../../generated/graphql.ts";
import { assignPermissionsToRole } from "../../actions/user.ts";

const userMutations: Resolvers["Mutation"] = {
  umsAssignPermission: async (_, { input }) => {
    try {
      const permissionRes = await assignPermissionsToRole(input);
      return {
        permissions: permissionRes,
        role: input.roleAlias,
      };
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
};

export default userMutations;
