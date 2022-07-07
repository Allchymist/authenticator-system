const { hashSync } = require('bcrypt');
const { v4: uuidV4 } = require('uuid');

const { user } = require('../../database/index');
const generatorPage = require('../../utils/generatorPage');
const Logs = require('../../utils/logs');

class AdminService {
  /**
   * @param {string | null} id
   * @param {string} email
   * @param {string} password
   * @param {string} first_name
   * @param {string} last_name
   * @param {'user' | 'admin'} perms
   */
  async register(id, email, password, first_name, last_name, perms) {
    
    // regex e-mail validation
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) throw new Error('Invalid email');

    // validation password 
    if (password.length < 8) throw new Error('Password must be at least 8 characters');
        
    try {
      const findExistUser = await user.findOne({ email });
      if (findExistUser) throw new Error('This email already exists');
      
      await user.create({
        _id: id || uuidV4(),
        email,
        password,
        first_name,
        last_name,
        perms,
        created_at: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      });

      return {
        message: 'user created successfully'
      }
    } catch(err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }

  /**@param {string} IdOrEmail */
  async profile(IdOrEmail) {
    const findUser = await user.findOne({ $or: [{ _id: IdOrEmail }, { email: IdOrEmail }] });
    if (!findUser) throw new Error('User not found');

    return {
      message: 'Successfully',
      user: findUser
    };
  }

  /**
   * @typedef {Object} Options
   * @prop {string} email
   * @prop {string} password
   * @prop {string} first_name
   * @prop {string} last_name
   * @prop {'user' | 'admin'} perms
   * @param {string} IdOrEmail
   * @param {Options} options
   */
  async editProfile(IdOrEmail, options) {
    try {
      const findUser = await user.findOne({ $or: [{ _id: IdOrEmail }, { email: IdOrEmail }] });
      if (!findUser) throw new Error('User not found');

      const { email, password, first_name, last_name } = options;

      await findUser.updateOne({
        password: password ? hashSync(password, 10) : findUser.password,
        email: email || findUser.email,
        first_name: first_name || findUser.first_name,
        last_name: last_name || findUser.last_name,
        updated_at: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      }, { upsert: true });

      return {
        message: 'user successfully updated'
      }
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }

  /**@param {string} IdOrEmail */
  async deleteProfile(IdOrEmail) {
    try {
      const findUser = await user.findOne({ $or: [{ _id: IdOrEmail }, { email: IdOrEmail }] });
      if (!findUser) throw new Error('User not found');

      await findUser.deleteOne();

      return {
        message: 'user successfully deleted'
      }

    } catch (err) {
      console.error(err.message);
      throw new Error(err.message); 
    }
  }

  async ListUsers() {
    try {
      const findUsers = await user.find();
      const usersJSON = findUsers.map((user) => user.toJSON());

      const data = generatorPage(usersJSON);

      return {
        message: 'Get users list successfully',
        users: data
      };
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }
}

module.exports = new AdminService();