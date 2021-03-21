import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { CompleteService, NotificationType } from '../service/completeService';
import { Message } from './interface';
import { CompleteMessageInter } from '../service/completeService';

export interface User {
  username?: string;
  email?: string;
  token?: string;
  password?: string;
  old_password?: string;
  confirm_password?: string;
}

const checkNotificationForLogin = async (
  data: Message,
  checkNotification: CompleteMessageInter
): Promise<NotificationType> => {
  if (checkNotification.notification === 'visibility') {
    if (data.data.login.status === 'success') {
      return 'visibility';
    } else {
      return 'open';
    }
  }
  if (data.data.login.status === 'success') {
    return 'close';
  }
  return data.data.login.status === 'error' ? 'open' : 'close';
};

const checkToken = (args: string) => {
  if (args.toString().length >= 10) {
    localStorage.setItem('token', args);
    window.location.reload();
  }
};

@Injectable({
  providedIn: 'root',
})
export class UserApollo extends Apollo {
  async loginUser(args: User, complete: CompleteService) {
    return this.mutate({
      mutation: gql`
        mutation login($username: String!, $password: String!) {
          login(options: { token: $username, password: $password }) {
            message
            status
            statusCode
            token
          }
        }
      `,
      variables: {
        username: args.username,
        password: args.password,
      },
    }).subscribe(async (res: Message) => {
      complete.changeNotification({
        message: res.data.login.message,
        notification: await checkNotificationForLogin(
          res,
          complete.notification
        ),
        status: res.data.login.status,
        itemsAlign: res.data.login.message.length - 1 <= 40 ? true : false,
      });
      if (res.data.login.token) {
        checkToken(res.data.login.token);
      }
    });
  }

  async registerUser(args: User, complete: CompleteService) {
    return this.mutate({
      mutation: gql`
        mutation createNewuser(
          $username: String!
          $email: String!
          $password: String!
          $confirm_password: String!
        ) {
          createNewuser(
            options: {
              username: $username
              email: $email
              password: $password
              confirm_password: $confirm_password
            }
          ) {
            message
            status
            statusCode
          }
        }
      `,
      variables: {
        username: args.username,
        email: args.email,
        password: args.password,
        confirm_password: args.confirm_password,
      },
    }).subscribe((res: Message) => {
      if (res.data.createNewuser.status === 'success') {
        complete.changeScreen('login');
      }
      complete.changeNotification({
        message: res.data.createNewuser.message,
        status: res.data.createNewuser.status,
        itemsAlign: res.data.createNewuser.message.length <= 60 ? true : false,
        notification: 'open',
      });
    });
  }

  async resetUser(user: User, complete: CompleteService) {
    return this.mutate({
      mutation: gql`
        mutation resetUser($token: String!) {
          resetUser(options: { token: $token }) {
            message
            status
            statusCode
          }
        }
      `,
      variables: {
        token: user.token,
      },
    }).subscribe((res: Message) => {
      complete.changeNotification({
        message: res.data.resetUser.message,
        status: res.data.resetUser.status,
        itemsAlign: res.data.resetUser.message.length <= 60 ? true : false,
        notification: 'open',
      });
    });
  }
}
