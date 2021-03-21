import {
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { GeneralApollo } from '../apollo/generalApollo';
import { CompleteService } from '../service/completeService';
import { UserService } from '../service/userService';
import { GeneralState } from '../store/types/generalTypes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, DoCheck {
  title = 'cxfun';
  query: any;
  loading: boolean;
  authenticate: string;

  constructor(
    public complete: CompleteService,
    public service: UserService,
    private apollo: GeneralApollo,
    private store: Store<{ general: GeneralState }>
  ) {
    this.store.subscribe((x) => {
      this.query = x.general.general;
      this.loading = x.general.loading;
    });
  }

  ngOnInit() {
    this.apollo.fetchGeneral(this.store);
    if (localStorage.getItem('token')) {
      this.authenticate = localStorage.getItem('token');
    }
  }
  ngDoCheck() {
    if (this.complete.notification.status === 'success') {
      this.service.resetInput();
    }
  }
}
