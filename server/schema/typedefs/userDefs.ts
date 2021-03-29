import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  directive @upper on FIELD_DEFINITION

  type Query {
    general: {
      username: String
    }
  }
`;
