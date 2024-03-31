const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');
// middleware
const requireLogin = require('../middlewares/authMiddleware/autenticacion');


router.get('/', mainController.index);
router.get('/login', mainController.login);
router.get('/register', mainController.register);

// router.get('/listsAdmin', viewAdmin ,mainController.lists);
router.get('/listsAdmin', requireLogin ,mainController.lists);


module.exports = router;