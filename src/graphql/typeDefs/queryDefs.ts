import { gql } from "graphql-tag";

const queryDefs = gql`
  type Query {
    hello: String
  }
`;

export default queryDefs;
