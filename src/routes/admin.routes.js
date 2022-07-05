const { Router } = require('express');

const AdminController = require('../controllers/admin/admin-controller');

const adminRouter = Router();

adminRouter.get('/profile/:id', AdminController.profile);

adminRouter.get('/user/:id/details', AdminController.profile);
adminRouter.put('/user/register', AdminController.register);
adminRouter.patch('/user/:id/edit', AdminController.editProfile);
adminRouter.delete('/user/:id', AdminController.deleteProfile);

module.exports = adminRouter;