import { DELETE_EMAIL, SEND_EMAIL } from '../action/email-actions';
import { updateUserMailOnSend } from '../helper/emailHelper';
import { REHYDRATE } from 'redux-persist';

export const emailReducers = (state = {}, action) => {
  switch (action.type) {
    case REHYDRATE:
      const { payload = { user: { isLoggedIn: false } } } = action
      return {
        ...state,
        ...payload.email,
      };
    case SEND_EMAIL:
      const updatesMailServer = updateUserMailOnSend(state, action.payload)
      return updatesMailServer;

    default:
      return state;
  }
}