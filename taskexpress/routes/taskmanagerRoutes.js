const express = require('express');
const router = express.Router();
const tokenVerify = require('./jwtMiddlewear');
const{getProjects,postProjects,updateProjects,login,register} = require('../controllers/routesController')

router.post('/login',login);

router.post('/register',register);

router.get('/projects',tokenVerify,getProjects);

router.post('/projects',postProjects);

router.put('/projects',updateProjects);

module.exports = router;