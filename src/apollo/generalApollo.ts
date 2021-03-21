import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';
import { GeneralState } from '../store/types/generalTypes';
import { GeneralActions } from '../store/actions/generalActions';

@Injectable({
  providedIn: 'root',
})
export class GeneralApollo extends Apollo {
  async fetchGeneral(store: Store<{ general: GeneralState }>) {
    this.watchQuery({
      query: gql`
        query {
          general {
            general {
              login
              register
              reset
              title_login
              title_register
              child_title_register
              title_forgotted
              child_title_forgotted
              create_new
              forgotted
              signin
              signup
              category
              search
              basket
              already
              message
              notification
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
              address
              avatar
              old_pin
              confirm_pin
              phone
              phone_verified_at
            }
          }
        }
      `,
    }).valueChanges.subscribe((res: any) => {
      let general: GeneralState;
      general = res.data;
      store.dispatch(
        new GeneralActions({
          general: general.general,
          loading: res.loading,
        })
      );
    });
  }
}
