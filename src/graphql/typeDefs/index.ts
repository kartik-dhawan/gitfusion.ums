import mutationDefs from "./mutationDefs.ts";
import queryDefs from "./queryDefs.ts";
import { authDefs, commonDefs, userDefs } from "./types/index.ts";
import { mergeTypeDefs } from "@graphql-tools/merge";

const typeDefs = mergeTypeDefs([
  mutationDefs,
  queryDefs,
  authDefs,
  commonDefs,
  userDefs,
]);

export default typeDefs;
