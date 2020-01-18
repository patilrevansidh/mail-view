import { DELETE_EMAIL, SEND_EMAIL } from '../action/email-actions';
import { REHYDRATE } from 'redux-persist';

export const emailReducers = (state = {}, action) => {
  switch (action.type) {
    case REHYDRATE:
      const { payload = { user: { isLoggedIn: false } } } = action
      return {
        ...state,
        ...payload.emails,
      };
    case SEND_EMAIL:
      return state;

    default:
      return state;
  }
}