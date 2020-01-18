import { LOGIN } from '../action/auth-action';

const initalState = {
  isLoggedIn: false
}

export const authReducer = (state = initalState, action) => {

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }

}