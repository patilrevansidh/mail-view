export const LOGIN = 'LOGIN';
export const LOG_OUT = 'LOG_OUT'

export function onLogin(userInfo) {
  return {
    type: LOGIN,
    payload: userInfo
  }
}

export function onLogOut() {
  return {
    type: LOG_OUT,
  }
}
