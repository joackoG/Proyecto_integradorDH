const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
// middleware
const requireLogin = require('../middlewares/authMiddleware/autenticacion');
const viewAdmin = require('../middlewares/authMiddleware/loggedAdminMiddleware')

router.get('/', mainController.index);
router.get('/login', mainController.login);
router.get('/register', mainController.register);

// router.get('/listsAdmin', viewAdmin ,mainController.lists);
router.get('/listsAdmin', requireLogin, viewAdmin, mainController.lists);


module.exports = router;