const { query, body, validationResult, param, header, oneOf } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'check_auth': {
            return [
                body('email', 'email harus diinput').notEmpty(),
                body('password', 'password harus diinput').notEmpty(),
            ]
        }
    }
}

exports.verify = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                errors: errors.array()
            })
            return;
        } else {
            return next();
        }
    } catch (err) {
        return next(err);
    }
}