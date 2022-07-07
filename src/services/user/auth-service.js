const { compareSync } = require('bcrypt');
const { sign } = require("jsonwebtoken");

const { user } = require('../../database/index');

class AuthService {
  /**
   * @param {string | null} id
   * @param {string} email
   * @param {string} password
  */
  async execute(id, email, password) {
    const auth = id || email;

    if (!auth) throw new Error('valid id or email is required to continue.');

    const findUser = await user.findOne({ $or: [{ _id: auth }, { email: auth }] });
    if (!findUser) throw new Error('User not found!');

    const comparePassword = compareSync(password, findUser.password);
    if (!comparePassword) throw new Error('invalid password');

    const token = findUser.perms === 'user' ? null :
      sign({ id: findUser.email }, process.env.PASSWORD_KEY, { expiresIn: '1d' });

    return {
      message: 'Successfully logged in',
      user: findUser,
      token
    }
    
  }
}

module.exports = new AuthService();