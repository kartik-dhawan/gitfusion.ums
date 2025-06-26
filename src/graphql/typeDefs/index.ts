import mutationDefs from "./mutationDefs.ts";
import queryDefs from "./queryDefs.ts";
import { authDefs, commonDefs, userDefs } from "./types/index.ts";

const typeDefs = [mutationDefs, queryDefs, authDefs, commonDefs, userDefs];

export default typeDefs;
