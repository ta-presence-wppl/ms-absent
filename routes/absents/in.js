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

//Moment JS
var moment = require('moment');

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
    res.json({
        message: 'Sukses GET Absen IN'
    })
});

router.post('/', imageUpload.single('image'), (req, res, next) => {
    var myDate = {
        id_peg: req.user_data.id_peg,
        time: moment(new Date()).format('kk:mm:ssZ'),
        date: moment(new Date()).format('YYYY-MM-D'),
        lokasi_msk: req.body.lokasi_msk,
        foto_msk: req.file.filename
    }
    async.waterfall([
        (callback) => {
            new AbsentControllers().checkAbsentIn(myDate).then(x => {
                if (x) {
                    try {
                        fs.unlink(path.join(__dirname + '../../../images/in/') + req.file.filename, function () {
                            res.status(406).send({
                                message: 'Anda Sudah Melakukan Absen Kedatangan!'
                            })
                        });
                    } catch (error) {
                        console.error(error)
                        next(error)
                    }
                } else {
                    callback(null, x);
                }
            }).catch(err => {
                var details = {
                    parent: err.parent,
                    name: err.name,
                    message: err.message
                }
                var error = new Error("Error pada server");
                error.status = 500;
                error.data = {
                    date: new Date(),
                    route: req.originalUrl,
                    details: details
                };
                next(error);
            });
        },
        (checkAbsent, callback) => {
            new AbsentControllers().createAbsentIn(myDate).then(x => {
                res.send({
                    message: 'Sukses Melakukan Absen Masuk'
                })
            }).catch(err => {
                console.error(err)
                var details = {
                    parent: err.parent,
                    name: err.name,
                    message: err.message
                }
                var error = new Error("Error pada server");
                error.status = 500;
                error.data = {
                    date: new Date(),
                    route: req.originalUrl,
                    details: details
                };
                next(error);
            });
        }
    ]);
});

//exports
module.exports = router;