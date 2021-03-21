import { GeneralActions } from '../actions/generalActions';
import { GeneralState, GeneralTypes } from '../types/generalTypes';

const initialState: GeneralState = {
  general: {},
  loading: true,
};

export const generalReducer = (
  state = initialState,
  action: GeneralActions
) => {
  switch (action.type) {
    case GeneralTypes.LOAD_GENERAL:
      return state = action.payload;
      break;

    default:
      return state;
      break;
  }
};
