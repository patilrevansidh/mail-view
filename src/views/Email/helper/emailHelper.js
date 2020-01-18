function updateSentEmail(state, from = '', payload) {
  const userEmails = {};
  if (!state[from]) {
    userEmails[from] = {
      sent: payload,
      inbox: []
    }
    return userEmails;
  }
  if (state[from]) {

  }
}