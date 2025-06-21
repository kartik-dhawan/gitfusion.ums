import { gql } from "graphql-tag";

const mutationDefs = gql`
  type Mutation {
    umsSignUpWithEmail(input: UmsSignUpInput!): UmsUser
    umsLoginWithEmail(input: UmsLoginInput!): UmsUser
  }
`;

export default mutationDefs;
