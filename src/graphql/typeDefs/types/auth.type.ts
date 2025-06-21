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
  }

  input UmsLoginInput {
    email: String!
    password: String!
  }

  type UmsLoginResponse {
    user: UmsUser
    token: String
  }

  input UmsSignUpInput {
    username: String
    email: String!
    password: String!
    firstName: String!
    lastName: String
  }
`;

export default authDefs;
