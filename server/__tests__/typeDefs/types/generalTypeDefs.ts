import { gql } from 'graphql-request';

export const queryGeneral = gql`
  query {
    general {
      general {
        signin
        signup
        login
        register
        forgotted
        reset
        already
        create_new
        login_title
        register_title
        child_register_title
        forgotted_title
        child_forgotted_title
      }
      user {
        username
        email
        avatar
        first_name
        last_name
        country
        province
        address
        password
        old_password
        confirm_password
      }
    }
  }
`;
