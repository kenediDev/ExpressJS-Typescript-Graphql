export enum GeneralTypes {
  LOAD_GENERAL = '[GENERAL] :: LOAD_GENERAL',
}

export interface General {
  general?: {
    login?: string;
    register?: string;
    reset?: string;
    title_login?: string;
    title_register?: string;
    child_title_register?: string;
    title_forgotted?: string;
    child_title_forgotted?: string;
    create_new?: string;
    forgotted?: string;
    signin?: string;
    signup?: string;
  };
  user?: {
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    old_password?: string;
    confirm_password?: string;
    usernameOr?: string;
    country?: string;
    province?: string;
    address?: string;
    avatar?: string;
    old_pin?: string;
    confirm_pin?: string;
    phone?: string;
    phone_verified_at?: string;
  };
}

export interface GeneralState {
  readonly general: General;
  readonly loading: boolean;
}
