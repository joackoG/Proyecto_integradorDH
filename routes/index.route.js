const express = require('express');
const router = express.Router();
const controllers = require('../controllers/index.controller')

//  vista home  http://localhost:3000/ GET
router.get('/', controllers.index);



// vista about http://localhost:3000/login GET
router.get('/login', controllers.login);



module.exports = router;



