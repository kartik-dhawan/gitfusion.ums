import { gql } from "graphql-tag";

const mutationDefs = gql`
  type Mutation {
    umsSignUpWithEmail(input: UmsSignUpInput!): UmsSignUpResponse
    umsLoginWithEmail(input: UmsLoginInput!): UmsLoginResponse

    umsAssignPermission(input: UmsAssignPermsInput!): AssignPermissionsResponse
  }
`;

export default mutationDefs;
