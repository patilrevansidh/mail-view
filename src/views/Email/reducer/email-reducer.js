import { DELETE_EMAIL, SEND_EMAIL, READ_EMAIL } from '../action/email-actions';
import { updateUserMailOnSend, deleteEmail } from '../helper/emailHelper';
import { REHYDRATE } from 'redux-persist';

export const emailReducers = (state = {}, action) => {
  switch (action.type) {
    case REHYDRATE:
      const { payload = { user: { isLoggedIn: false } } } = action
      return {
        ...state,
        ...payload.email,
      };
    case DELETE_EMAIL:
      const updatedMails = deleteEmail(state, action.payload)
      return updatedMails;

    case SEND_EMAIL:
      const updatesMailServer = updateUserMailOnSend(state, action.payload)
      return updatesMailServer;

    default:
      return state;
  }
}