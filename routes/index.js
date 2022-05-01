const express = require('express');
const router = express.Router();

//Define Validasi Auth
const authChecker = require('../services/auth_check');

//Define Root Absent In
const routerIn = require('./absents/in');

//Define Root Absent Out
const routerOut = require('./absents/out');

//Define Root Absent Out
const routerHistory = require('./absents/history');


//Define Root Absent Status
const routerStatus = require('./absents/status');

//Define API /absent/in
router.use('/absent/in', authChecker.checkAuth, (req, res, next) => {
    next();
}, routerIn);

//Define API /absent/out
router.use('/absent/out', authChecker.checkAuth, (req, res, next) => {
    next();
}, routerOut);

//Define API /absent/status
router.use('/absent/status', authChecker.checkAuth, (req, res, next) => {
    next();
}, routerStatus);

//Define API /absent/status
router.use('/absent/history', authChecker.checkAuth, (req, res, next) => {
    next();
}, routerHistory);

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