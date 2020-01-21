import users from '../mockdata/user.json';
import { ERRORS } from '../constants/index.js';

export class AuthService {

  async login(payload) {
    const { email, password } = payload
    const user = users.find((user) => (user.email === email && user.password === password))
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          reject(ERRORS.INVALID_CREDENTIAL)
        }
        resolve(user)
      }, 500);
    })
  }

}