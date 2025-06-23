import mutationDefs from "./mutationDefs.ts";
import queryDefs from "./queryDefs.ts";
import authDefs from "./types/auth.type.ts";
import commonDefs from "./types/common.type.ts";

const typeDefs = [mutationDefs, queryDefs, authDefs, commonDefs];

export default typeDefs;
