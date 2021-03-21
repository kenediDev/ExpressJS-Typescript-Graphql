import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

type DrawerType = 'open' | 'close' | 'visibility';
export type ScreenType = 'login' | 'register' | 'forgotted' | 'loading';
export type NotificationType = 'open' | 'close' | 'visibility';
export type StatusNotification = 'success' | 'error';

export interface CompleteMessageInter {
  message: string;
  notification: NotificationType;
  status: StatusNotification;
  itemsAlign: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CompleteService {
  public detectForResetInput: Subject<string> = new BehaviorSubject<string>('');
  detect = this.detectForResetInput.asObservable();

  constructor(private router: Router) {}

  drawer: DrawerType = 'visibility';
  screen: ScreenType = 'login';

  notification: CompleteMessageInter = {
    message: '',
    notification: 'visibility',
    status: 'error',
    itemsAlign: false,
  };
  notificationClose: CompleteMessageInter = {
    message: '',
    notification: 'visibility',
    status: 'error',
    itemsAlign: false,
  };

  changeDrawer(args: DrawerType) {
    this.drawer = args;
  }

  changeScreen(args: ScreenType) {
    this.screen = args;
    this.detectForResetInput.next(args);
  }

  changeNotification(args: CompleteMessageInter) {
    // if (this.notification.notification === 'visibility') {
    // Check Notification Because when client get visibility notification and then that will show close
    this.notification = args;
    // }
  }
  changeRouter(args: string, kwarg: ScreenType) {
    if (kwarg === 'login') {
      this.screen = kwarg;
      if (window.innerWidth <= 1008) {
        this.drawer = 'close';
      }
    } else if (kwarg === 'register') {
      this.screen = kwarg;
      if (window.innerWidth <= 1008) {
        this.drawer = 'close';
      }
    }
    this.router.navigate([args]);
    this.detectForResetInput.next(kwarg);
  }
}
