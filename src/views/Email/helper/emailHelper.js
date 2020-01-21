
export function updateUserMailOnSend(state = {}, payload = {}) {
  const fromUser = state[payload.from] || { sent: [], trash: [], inbox: [] };

  const newState = {
    [payload.from]: {
      sent: [...fromUser.sent, payload],
      inbox: [...fromUser.inbox],
      trash: [...fromUser.trash],
    }
  }
  const recipients = Array.from(new Set([...payload.to, ...payload.cc]))
  recipients.forEach(mail => {
    const recipient = (state[mail] || newState[mail]) || { sent: [], trash: [], inbox: [] }; // if user sends to himself first email
    newState[mail] = {
      sent: [...recipient.sent] || [],
      inbox: [...recipient.inbox, payload],
      trash: recipient.trash || [],
    }
  })
  return newState
}

export function deleteEmail(state, payload) {
  /**
   * state = { [email]:{sent:[],inbox:[],} }
   * payload =
   *  email:'', 
   *  type:'',
   *  selected: [ids]
   */
  const { email = '', type = '', selected = [] } = payload;
  if (!state || !state[email]) return state;
  const userEmails = state[email] || { sent: [], trash: [], inbox: [] }
  userEmails[type] = userEmails[type].filter(i => !selected.includes(i.id));
  console.log('*****', userEmails)
  return {
    ...state,
    userEmails
  }

}