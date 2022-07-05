const { Request, Response, NextFunction } = require('express');
const { verify } = require('jsonwebtoken');

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next-
 */

module.exports = async function(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(403).json({
      error: 'you don\'t have permission'
    });
  }

  const token = authToken.split(' ')[1];

  try {
    const tokenVerified = verify(token, process.env.PASSWORD_KEY);

    req.Authenticated = tokenVerified.id;

    return next();
  } catch (err) {
    console.error(err.message);

    return res.status(401).json({ error: err.message });
  }
  
};