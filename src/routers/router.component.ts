import { Routes } from '@angular/router';
import { AuthComponent } from '../app/auth/auth.component';
import { DefaultComponent } from '../app/default/default.component';
import { UserService } from '../service/userService';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
  },
  {
    canActivate: [UserService],
    path: 'accounts',
    component: AuthComponent,
  },
];
