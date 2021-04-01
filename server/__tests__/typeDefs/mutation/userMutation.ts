import { gql } from 'graphql-request';

export const mutationRecordUser = gql`
  mutation createUser($options: CreateNewUserInput!) {
    createUser(options: $options) {
      message
      status
      statusCode
    }
  }
`;

export const mutationLoginUser = gql`
  mutation loginUser($options: LoginUserInput!) {
    loginUser(options: $options) {
      status
      statusCode
      token
    }
  }
`;

export const mutationUpdateUser = gql`
  mutation updateUser($options: UpdateUserInput!) {
    updateUser(options: $options) {
      message
      status
      statusCode
    }
  }
`;
