import { ActionReducerMap } from '@ngrx/store';
import { generalReducer } from './reducer/generalReducer';

export const reducers: ActionReducerMap<any> = {
  general: generalReducer,
};
