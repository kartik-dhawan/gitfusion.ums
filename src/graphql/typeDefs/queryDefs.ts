import { gql } from "graphql-tag";

const queryDefs = gql`
  type Query {
    umsGetUsers(input: UmsGetUsersInput!): FetchUsersResponse
  }
`;

export default queryDefs;
