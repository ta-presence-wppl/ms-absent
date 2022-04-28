const express = require('express');
const router = express.Router();
var fs = require('fs');

//Define Async
const async = require('async');

//Panggil Path Node
const path = require('path');

//Define Controllers
const AbsentControllers = require('../../controllers/absent');

//Define Validator Body
const validator = require('./authValidator');

//Define Multer Untuk File Upload
const multer = require('multer');
var moment = require('moment'); // require

//Define Multer Images Folder
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'images/in',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-in-' + Date.now()
            + path.extname(file.originalname))
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});

//Define Image Upload
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

//Sample Route
/**
 * @swagger
 * /auth:
 *   post:
 *     description: Auth User
 *     responses:
 *       200:
 *          description: Returns one User Specified.
 *          data: Some data user
 *          token: Return token to Verified User
 *     body:
 *          - email
 *          - password
 */
router.get('/', (req, res, next) => {
    res.send({
        message: 'Sukses Get Absen IN'
    })
});

router.post('/', imageUpload.single('image'), (req, res, next) => {
    async.waterfall([
        (callback) => {

        }
    ]);
    console.log(moment().format('kk:mm:ss'));
    res.send({
        message: 'Sukses POST Absen IN',
        filename: 'OK: received ' + req.file.filename,
        file: req.file
    })
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});

//exports
module.exports = router;