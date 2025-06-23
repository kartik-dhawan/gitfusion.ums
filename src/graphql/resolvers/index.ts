import { Resolvers } from "../generated/graphql.ts";
import authMutations from "./mutations/auth.resolver.ts";
import authQueries from "./queries/auth.resolver.ts";

const resolvers: Resolvers = {
  Mutation: {
    ...authMutations,
  },
  Query: {
    ...authQueries,
  },
};

export default resolvers;
