import { Resolvers } from "../generated/graphql.ts";
import authMutations from "./mutations/auth.resolver.ts";
import userMutations from "./mutations/user.resolvers.ts";
import userQueries from "./queries/user.resolver.ts";

const resolvers: Resolvers = {
  Mutation: {
    ...authMutations,
    ...userMutations,
  },
  Query: {
    ...userQueries,
  },
};

export default resolvers;
