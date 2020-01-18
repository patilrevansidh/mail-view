import shortid from 'shortid';
export const SEND_EMAIL = 'SEND_EMAIL';
export const DELETE_EMAIL = 'DELETE_EMAIL';

export function onEmailSend(payload) {
  const id = shortid.generate();
  return {
    type: SEND_EMAIL,
    payload: { ...payload, id }
  }
}

export function onEmailDelete(id) {
  return {
    type: DELETE_EMAIL,
    payload: id
  }
}
