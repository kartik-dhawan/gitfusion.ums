import { gql } from "graphql-tag";

const userDefs = gql`
  type FetchUsersResponse {
    users: [UmsUser!]!
    totalCount: Int!
  }

  input UmsGetUsersInput {
    pagination: PaginationInput
    search: String
  }

  input UmsDeleteUserInput {
    userId: ID!
  }

  type DeleteUserResponse {
    success: Boolean!
    message: String
  }
`;

export default userDefs;
