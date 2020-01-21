import { DELETE_EMAIL, SEND_EMAIL, READ_EMAIL } from '../action/email-actions';
import { updateUserMailOnSend, deleteEmail, onReadMark } from '../helper/emailHelper';
import { REHYDRATE } from 'redux-persist';

export const emailReducers = (state = {}, action) => {
  switch (action.type) {
    case REHYDRATE:
      const { payload = { user: { isLoggedIn: false } } } = action
      return {
        ...state,
        ...payload.email,
      };

    case READ_EMAIL:
      const readMails = onReadMark(state, action.payload)
      return readMails;

    case DELETE_EMAIL:
      const deletedMails = deleteEmail(state, action.payload)
      return deletedMails;

    case SEND_EMAIL:
      const updatesMailServer = updateUserMailOnSend(state, action.payload)
      return updatesMailServer;

    default:
      return state;
  }
}