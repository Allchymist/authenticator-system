const { Router } = require('express');

const authController = require('../controllers/user/auth-controller');

const userRouter = Router();

userRouter.post('/login', authController.Login);

module.exports = userRouter;  