import { gql } from "graphql-tag";

const mutationDefs = gql`
  type Mutation {
    umsSignUpWithEmail(input: UmsSignUpInput!): UmsSignUpResponse
    umsLoginWithEmail(input: UmsLoginInput!): UmsLoginResponse
  }
`;

export default mutationDefs;
