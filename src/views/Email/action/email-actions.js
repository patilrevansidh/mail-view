import shortid from 'shortid';
export const SEND_EMAIL = 'SEND_EMAIL';
export const DELETE_EMAIL = 'DELETE_EMAIL';
export const READ_EMAIL = 'READ_EMAIL';

export function onEmailSend(payload) {
  const id = shortid.generate();
  return {
    type: SEND_EMAIL,
    payload: { ...payload, id }
  }
}

export function onEmailDelete(payload) {
  /**
   * email:'', 
   * type:'',
   * selected: [ids]
   */

  return {
    type: DELETE_EMAIL,
    payload
  }
}

export function onMarkasRead(payload) {
  /**
   * { email:', selected: [ids] }
   */
  return {
    type: READ_EMAIL,
    payload
  }
}
