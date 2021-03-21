import { callSchema } from '../test-utils/callSchema';

test('Test Fetch Graphql General', async () => {
  const query = `
    query {
        general {
          general {
            login
            register
            reset
            title_login
            title_forgotted
            child_title_forgotted
            title_register
            child_title_register
            create_new
            signin
            signup
            forgotted
          }
          user {
            username
            email
            first_name
            last_name
            password
            old_password
            confirm_password
            usernameOr
            country
            province
            city
            address
            avatar
            pin
            old_pin
            confirm_pin
            phone
            phone_verified_at
          }
        }
      }
      
    `;
  const res = await callSchema({
    source: query,
  });
  expect(res).not.toEqual(null);
  expect(res).toEqual({
    data: {
      general: {
        general: {
          login: 'Log in',
          register: 'Register',
          reset: 'Reset',
          title_login: 'Sign in to Promise',
          title_forgotted: 'Reset your password',
          child_title_forgotted:
            "Enter your user account's verified email address and we will send you a password reset link.",
          title_register: 'Join Problem',
          child_title_register: 'Create your account',
          create_new: 'Create an account ?',
          signin: 'Sign in',
          signup: 'Sign up',
          forgotted: 'Forgotted Password ?',
        },
        user: {
          username: 'Username',
          email: 'Email',
          first_name: 'First Name',
          last_name: 'Last Name',
          password: 'Password',
          old_password: 'Old Password',
          confirm_password: 'Confirm Password',
          usernameOr: 'Username or email, phone number',
          country: 'Country',
          province: 'Province',
          city: 'City',
          address: 'Address',
          avatar: 'Avatar',
          pin: 'PIN',
          old_pin: 'Old PIN',
          confirm_pin: 'Confirm PIN',
          phone: 'Phone numbers',
          phone_verified_at: 'Phone Verified At',
        },
      },
    },
  });
});
