
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
      inbox: [...recipient.inbox, { ...payload, read: false }],
      trash: recipient.trash || [],
    }
  })
  return newState
}

export function deleteEmail(state, payload) {
  const { email = '', type = '', selected = [] } = payload;
  if (!state || !state[email]) return state;
  const userEmails = state[email] || { sent: [], trash: [], inbox: [] }
  if (type !== 'trash') {
    userEmails['trash'] = [...userEmails['trash'], ...userEmails[type].filter(i => selected.includes(i.id))]
    userEmails[type] = userEmails[type].filter(i => !selected.includes(i.id));
  } else {
    userEmails[type] = userEmails[type].filter(i => !selected.includes(i.id));
  }
  return {
    ...state,
    [email]: userEmails
  }
}

export function onReadMark(state, payload) {
  // { email, selected: this.state.selected }
  const { email = '', selected = [] } = payload;
  if (!state || !state[email]) return state;
  const userEmails = state[email] || { sent: [], trash: [], inbox: [] }
  const inbox = userEmails.inbox.map(i => {
    if (selected.includes(i.id)) {
      return { ...i, read: true }
    }
    return i
  })
  return {
    ...state,
    [email]: { ...userEmails, inbox }
  }

}