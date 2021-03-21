import { Service } from 'typedi';
import { GeneralQueryResponse } from '../query/generalQuery';

@Service()
export class GeneralServiceResponse {
  public state: GeneralQueryResponse = {
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
      category: 'Category',
      search: 'Search',
      basket: 'Basket',
      already: 'Already exists account ?',
      message: 'Message',
      notification: 'Notification',
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
  };

  async general(): Promise<GeneralQueryResponse> {
    return this.state;
  }
}
