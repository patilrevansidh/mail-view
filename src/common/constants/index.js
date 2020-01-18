export const ERRORS = {
  NOT_EMPTY: "Can't Be Empty",
  EMAIL: "Invalid Email",
  PASSWORD: "Invalid Password",
  SUBJECT: "Subject Can't be empty",
  BODY: "Body Can't be empty",
  TO: "To Email Can't be empty",
}


export const ROUTE_PATH = {
  BASE: '/',
  AUTH: '/login',
  EMAIL_DETAIL: '/email/:id'
}

export const SIDE_BAR = [
  { path: 'dashboard', keyValue: '1', icon: 'dashboard', label: 'Dashboard' },
  {
    path: 'mails', keyValue: '2', icon: 'mail', label: 'Mailbox',
    similarPath: ['/'],
    children: [
      { path: 'mails', keyValue: '2', icon: '', label: 'Inbox' },
      { path: 'EmailView', keyValue: '3', icon: '', label: 'Email view' },
    ]
  },
  { path: 'form', keyValue: '4', icon: 'form', label: 'Form' },
]