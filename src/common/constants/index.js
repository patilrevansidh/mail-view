export const ERRORS = {
  NOT_EMPTY: "Can't Be Empty",

  INVALID_EMAIL: "The input is not valid E-mail!",
  EMPTY_EMAIL: "Please input your E-mail!",

  PASSWORD: "Please input your password!",

  SUBJECT: "Subject Can't be empty",
  BODY: "Body Can't be empty",
  TO: "To Email Can't be empty",
  INVALID_CREDENTIAL: 'Email or password does not match'
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

export const FORM_LAYOUTS = {

  FORM_ITEM_: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  },
  TAIL_FORM_ITEM: {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  }
}