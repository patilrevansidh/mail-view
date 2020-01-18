export const LOGIN = 'LOGIN';

export function onLogin(userInfo) {
  return {
    type: LOGIN,
    payload: userInfo
  }
}