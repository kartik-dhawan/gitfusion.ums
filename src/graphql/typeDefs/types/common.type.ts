import { gql } from "graphql-tag";

const commonDefs = gql`
  input PaginationInput {
    pageNumber: Int!
    pageSize: Int!
  }
`;

export default commonDefs;
