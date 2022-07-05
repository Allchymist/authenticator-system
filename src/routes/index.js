const { Router } = require('express');
const cors = require('cors');

const userRouter = require('./user.routes');
const adminRouter = require('./admin.routes');

const ensureAuth = require('../middlewares/ensureAuth');

const routes = Router();

const optionsCors = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Toke', 'Authorization'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
}

routes.use(cors(optionsCors));

routes.use('/auth', userRouter);
routes.use('/admin', ensureAuth, adminRouter);

module.exports = routes;