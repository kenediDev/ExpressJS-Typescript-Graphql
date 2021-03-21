import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CanActivate } from '@angular/router';
import { User, UserApollo } from '../apollo/userApollo';
import { CompleteService } from './completeService';

@Injectable({
  providedIn: 'root',
})
export class UserService implements CanActivate {
  constructor(
    private userApollo: UserApollo,
    private complete: CompleteService
  ) {}
  user: User = {
    username: '',
    email: '',
    password: '',
    old_password: '',
    confirm_password: '',
  };

  changeUsername(args) {
    this.user.username = args;
  }

  changeEmail(args) {
    this.user.email = args;
  }

  changePassword(args) {
    this.user.password = args;
  }

  changeOldPassword(args) {
    this.user.old_password = args;
  }

  changeConfirmPassword(args) {
    this.user.confirm_password = args;
  }

  changeToken(args) {
    this.user.token = args;
  }

  resetInput() {
    this.user.username = '';
    this.user.email = '';
    this.user.token = '';
    this.user.password = '';
    this.user.confirm_password = '';
    this.user.old_password = '';
  }

  onLogin(args: NgForm) {
    this.userApollo.loginUser(this.user, this.complete);
  }

  onRegister(args: NgForm) {
    this.userApollo.registerUser(this.user, this.complete);
  }

  onReset(args: NgForm) {
    this.userApollo.resetUser(this.user, this.complete);
  }

  canActivate() {
    if (localStorage.getItem('token')) {
      return false;
    } else return true;
  }
}
