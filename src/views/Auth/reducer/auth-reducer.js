import { LOGIN, LOG_OUT } from '../action/auth-action';
import { REHYDRATE } from 'redux-persist';

const initalState = {
  isLoggedIn: false
}

export const authReducer = (state = initalState, action) => {
  console.log('** authReducer **', action)
  switch (action.type) {
    case REHYDRATE:
      const { payload = { user: { isLoggedIn: false } } } = action
      return {
        ...state,
        ...payload.user,
      };

    case LOGIN:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true
      }

    case LOG_OUT:
      return {
        isLoggedIn: false
      }

    default:
      return state;
  }

}