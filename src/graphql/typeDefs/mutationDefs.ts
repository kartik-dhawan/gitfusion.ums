import { gql } from "graphql-tag";

const mutationDefs = gql`
  type Mutation {
    umsSignUpWithEmail(input: UmsSignUpInput!): UmsSignUpResponse
    umsLoginWithEmail(input: UmsLoginInput!): UmsLoginResponse

    umsAssignPermission(input: UmsAssignPermsInput!): AssignPermissionsResponse
    umsDeleteUser(input: UmsDeleteUserInput!): DeleteUserResponse
  }
`;

export default mutationDefs;
