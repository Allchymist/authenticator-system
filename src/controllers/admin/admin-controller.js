const { Request, Response } = require('express')

const AdminService = require('../../services/admin/admin-service');
const Logs = require('../../utils/logs');

class AdminController {
  /**
   * @param {Request} req
   * @param {Response} res
   */
  async register(req, res) {
    const { id, email, password, first_name, last_name, perms } = req.body
    const IdOrEmail = id || email;

    if(!IdOrEmail || !password) {
      return res.status(400).json({
        error: 'Insert id or email and password to continue.'
      });
    }

    try {
      const data = await AdminService.register(id, email, password, first_name, last_name, perms);

      Logs.SaveLog({
        author: req.Authenticated,
        target: email,
        action: 'Account created',
        created_at: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      });

      return res.status(201).json(data);
    } catch(err) {
      console.error(err.message);
      return res.status(401).json({ error: err.message });
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async profile(req, res) {
    const IdOrEmail = req.params.id;

    if (!IdOrEmail) {
      return res.status(404).json({
        error: 'valid id or email is required to continue'
      });
    }

    try {
      const data = await AdminService.profile(IdOrEmail);
      return res.status(202).json(data);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({
        error: err.message
      });
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async editProfile(req, res) {
    const IdOrEmail = req.params.id;

    if (!IdOrEmail) {
      return res.status(404).json({
        error: 'valid id or email is required to continue'
      });
    }

    if (Object.values(req.body).length < 1) {
      return res.status(400).json({
        error: 'invalid input'
      });
    }

    const {
      email,
      password,
      first_name,
      last_name,
      perms
    } = req.body;

    try {
      const data = await AdminService.editProfile(IdOrEmail, { email, password, first_name, last_name, perms });

      Logs.SaveLog({
        author: req.Authenticated,
        target: email,
        action: 'Account edited',
        created_at: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      });

      return res.status(200).json(data);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({
        error: err.message
      });
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async deleteProfile(req, res) {
    const IdOrEmail = req.params.id;

    if (!IdOrEmail) {
      return res.status(404).json({
        error: 'valid id or email is required to continue'
      });
    }

    try {
      const data = await AdminService.deleteProfile(IdOrEmail);

      Logs.SaveLog({
        author: req.Authenticated,
        target: IdOrEmail,
        action: 'Account deleted',
        created_at: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      });

      return res.status(200).json(data);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({
        error: err.message
      });
    }
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  async ListUsers(req, res) {
    try {
      const data = await AdminService.ListUsers();
      return res.status(200).json(data);
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({
        error: err.message
      });
    }
  }
  
  /**
   * @param {Request} req
   * @param {Response} res
   */
  async ListLogs(req, res) {
    try {
      const data = Logs.GetLogs();
      return res.status(200).json({
        message: 'List logs sended successfully',
        logs: data
      });
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({
        error: err.message
      });
    }
  }
}

module.exports = new AdminController();