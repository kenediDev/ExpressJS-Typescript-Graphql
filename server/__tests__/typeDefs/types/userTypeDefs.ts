import { gql } from 'graphql-request';

export const queryAllUser = gql`
  query {
    getAllUser {
      status
      statusCode
      results {
        id
        username
        email
        updateAt
        accounts {
          id
          avatar
          first_name
          last_name
          avatar
          location {
            id
            country
            province
            city
            address
          }
        }
      }
    }
  }
`;

export const queryDetailUser = gql`
  query getDetail($options: String!) {
    getDetail(options: $options) {
      status
      statusCode
      user {
        id
        username
        email
        updateAt
        accounts {
          id
          avatar
          first_name
          last_name
          avatar
          location {
            id
            country
            province
            city
            address
          }
        }
      }
    }
  }
`;

export const queryMe = gql`
  query {
    getMe {
      status
      statusCode
      user {
        id
        username
        email
        updateAt
        accounts {
          id
          avatar
          first_name
          last_name
          avatar
          location {
            id
            country
            province
            city
            address
          }
        }
      }
    }
  }
`;
