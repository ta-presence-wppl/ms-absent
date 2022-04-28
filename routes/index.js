const express = require('express');
const router = express.Router();

//Define Validasi Auth
const authChecker = require('../services/auth_check');

//Define Root Auth
const routerAuth = require('./absents/in');

//Define API /auth
router.use('/absent/in', authChecker.checkAuth, (req, res, next) => {
    next();
}, routerAuth);

//Sample Route
/**
  * @swagger
  * /:
  *   get:
  *     description: Returns the homepage
  *     responses:
  *       200:
  *         description: hello world
  */
router.get('/', (req, res, next) => {
    res.send({
        message: 'Service Absent',
        url: req.originalUrl
    })
});
//End Sample

//exports
module.exports = router;