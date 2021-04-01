import { gql } from 'graphql-request';
import { callSchema } from '../utils-test/setup';

jest.useFakeTimers();

test('Get All General', async (done) => {
  const query = gql`
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
  const res = await callSchema({
    source: query,
  });
  expect(res.data).toEqual({
    general: {
      general: {
        signin: 'Sign in',
        signup: 'Sign up',
        login: 'Login',
        register: 'Register',
        forgotted: 'Forgotted Password?',
        reset: 'Reset',
        already: 'Already exits accounts?',
        create_new: 'Create an accounts?',
        login_title: 'Sign in to Asik',
        register_title: 'Join Asik',
        child_register_title: 'Create your account',
        forgotted_title: 'Reset your password',
        child_forgotted_title:
          "Enter your user account's verified email address and we will send you a password reset link.",
      },
      user: {
        username: 'Username',
        email: 'Email',
        avatar: 'Avatar',
        first_name: 'First Name',
        last_name: 'Last Name',
        country: 'Country',
        province: 'Province',
        address: 'Address',
        password: 'Password',
        old_password: 'Old password',
        confirm_password: 'Confirm password',
      },
    },
  });
  return done();
});
