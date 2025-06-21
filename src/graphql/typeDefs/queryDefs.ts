import { gql } from "graphql-tag";

const queryDefs = gql`
  type Query {
    umsSignUpWithEmail(input: UmsSignUpInput!): UmsUser
    umsLoginWithEmail(input: UmsLoginInput!): UmsUser
  }
`;

export default queryDefs;
