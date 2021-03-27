import { Service } from 'typedi';
import { GeneralQueryResponse } from '../query/QueryGeneral';
import i18next from 'i18next';

@Service()
export class GeneralService {
  public state: GeneralQueryResponse = {
    general: {
      login: i18next.t('login'),
      signin: i18next.t('signin'),
      signup: i18next.t('signup'),
      reset: i18next.t('reset'),
      forgotted: i18next.t('forgotted'),
      create_new: i18next.t('create_new'),
      already: i18next.t('already'),
      login_title: i18next.t('login_title'),
      register_title: i18next.t('register_title'),
      child_register_title: i18next.t('child_register_title'),
      forgotted_title: i18next.t('forgotted_title'),
      child_forgotted_title: i18next.t('child_forgotted_title'),
      register: i18next.t('register'),
    },
    user: {
      username: i18next.t('username'),
      email: i18next.t('email'),
      first_name: i18next.t('first_name'),
      last_name: i18next.t('last_name'),
      avatar: i18next.t('avatar'),
      country: i18next.t('country'),
      province: i18next.t('province'),
      city: i18next.t('city'),
      address: i18next.t('address'),
      password: i18next.t('password'),
      old_password: i18next.t('old_password'),
      confirm_password: i18next.t('confirm_password'),
    },
  };

  async general() {
    return this.state;
  }
}
