const { Router } = require('express');

const AdminController = require('../controllers/admin/admin-controller');

const adminRouter = Router();

adminRouter.put('/register', AdminController.register);
adminRouter.get('/user/:id/details', AdminController.profile);
adminRouter.patch('/user/:id/edit', AdminController.editProfile);
adminRouter.delete('/user/:id', AdminController.deleteProfile);

module.exports = adminRouter;