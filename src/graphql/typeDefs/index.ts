import mutationDefs from "./mutationDefs.ts";
import queryDefs from "./queryDefs.ts";
import authDefs from "./types/auth.type.ts";

const typeDefs = [mutationDefs, queryDefs, authDefs];

export default typeDefs;
