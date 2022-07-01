const { Request, Response } = require('express');

const AuthService = require('../../services/user/auth-service');

class AuthController {
  /**
 * @param {Request} req
 * @param {Response} res
 */
  async Login(req, res) {
    const { id, email, password } = req.body;
    const IdOrEmail = id || email;

    if (!IdOrEmail) {
      return res.status(400).json({
        error: 'valid id or email is required to continue.'
      });
    }

    if (!password) {
      return res.status(400).json({
        error: 'password is required to continue.'
      });
    }

    try {
      const data = await AuthService.execute(id, email, password);
      return res.status(202).json(data);
    } catch (err) {
      console.error(err.message);
      return res.status(401).json({
        error: err.message
      });
    }

  }
}

module.exports = new AuthController();