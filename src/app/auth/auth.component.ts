import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CompleteService } from '../../service/completeService';
import { UserService } from '../../service/userService';
import { GeneralState } from '../../store/types/generalTypes';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit {
  query: any;
  loading: boolean;

  constructor(
    public complete: CompleteService,
    private store: Store<{ general: GeneralState }>,
    public user: UserService
  ) {
    this.store.subscribe((x) => {
      this.query = x.general.general;
      this.loading = x.general.loading;
    });
  }

  ngOnInit(): void {}
}
