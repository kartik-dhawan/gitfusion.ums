import { Resolvers } from "../generated/graphql.ts";
import authMutations from "./mutations/auth.resolver.ts";

const resolvers: Resolvers = {
  Mutation: {
    ...authMutations,
  },
};

export default resolvers;
