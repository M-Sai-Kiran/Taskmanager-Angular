const express = require('express');
const router = express.Router();
const{getProjects,postProjects,updateProjects} = require('../controllers/routesController')

router.get('/projects',getProjects);

router.post('/projects',postProjects);

router.put('/projects',updateProjects);

module.exports = router;