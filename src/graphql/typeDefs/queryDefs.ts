import { gql } from "graphql-tag";

const queryDefs = gql`
  type Query {
    umsGetUsers(input: UmsGetUsersInput!): FetchUsersResponse!
    umsGetUser(userId: String!): UmsUser
  }
`;

export default queryDefs;
