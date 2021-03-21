import { Action } from '@ngrx/store';
import { GeneralState, GeneralTypes } from '../types/generalTypes';

export class GeneralActions implements Action {
  public type = GeneralTypes.LOAD_GENERAL;
  constructor(public payload: GeneralState) {}
}
