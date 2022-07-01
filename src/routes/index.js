const { Router } = require('express');

const userRouter = require('./user.routes');
const adminRouter = require('./admin.routes');

const routes = Router();

routes.use('/auth', userRouter);
routes.use('/admin', adminRouter);

module.exports = routes;