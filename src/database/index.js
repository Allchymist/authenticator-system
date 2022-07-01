const { connect } = require('mongoose');

const UserModel = require('./models/user');

class DB {
  constructor() {
    /**@readonly*/
    this.user = UserModel;
  }

  async Connect() {
    try {
      await connect(process.env.MONGODB);
    } catch (err) {
      console.error('Ocorreu um erro ao conectar a database:\n', err);
    } finally {
      console.log('Database Conectada com sucesso.');
    }
  }
}

module.exports = new DB();