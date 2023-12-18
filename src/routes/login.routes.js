const express = require('express');
const router = express.Router();
const controllers = require('../controllers/login.controllers')


// vista home http://localhost:3000/ GET
router.get('/', controllers.login);
module.exports = router;