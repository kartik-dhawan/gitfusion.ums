import { GraphQLError } from "graphql";
import { Resolvers } from "../../generated/graphql.ts";
import {
  assignPermissionsToRole,
  deleteUserFromDatabase,
  deleteUserFromSupabase,
} from "../../actions/user.ts";
import { responseMessages } from "../../utils/messages.ts";

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

  umsDeleteUser: async (_, { input }) => {
    try {
      const { userId } = input;
      // delete user from postgres
      await deleteUserFromDatabase(userId);

      // delete user from supabase
      await deleteUserFromSupabase(userId);

      return {
        success: true,
        message: responseMessages.USER.DELETION_SUCCESS,
      };
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
};

export default userMutations;
