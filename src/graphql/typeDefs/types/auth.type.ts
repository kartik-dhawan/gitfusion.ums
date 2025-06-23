import { gql } from "graphql-tag";

const authDefs = gql`
  type UmsUser {
    id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    createdAt: String!
    updatedAt: String
    role: UmsUserRole!
    permissions: [UmsPermissions!]!
  }

  input UmsLoginInput {
    email: String!
    password: String!
  }

  type UmsTokens {
    accessToken: String!
    refreshToken: String
    expiration: Int!
    expiresIn: Int
    providerToken: String
    providerRefreshToken: String
    tokenType: String
  }

  type UmsLoginResponse {
    user: UmsUser!
    token: UmsTokens!
  }

  type UmsSignUpResponse {
    user: UmsUser!
    token: UmsTokens!
  }

  input UmsSignUpInput {
    username: String
    email: String!
    password: String!
    firstName: String!
    lastName: String
    role: UmsUserRole!
  }

  enum UmsUserRole {
    ADMIN
    GUEST
    CLIENT
  }

  enum UmsPermissions {
    CREATE_USER
    READ_USER
    DELETE_USER
    EDIT_USER
  }

  input UmsAssignPermsInput {
    roleAlias: UmsUserRole!
    permissions: [UmsPermissions!]!
  }

  type AssignPermissionsResponse {
    permissions: [UmsPermissions!]!
    role: UmsUserRole!
  }

  type FetchUsersResponse {
    users: [UmsUser!]!
    totalCount: Int!
  }

  input UmsGetUsersInput {
    pagination: PaginationInput
    search: String
  }
`;

export default authDefs;
