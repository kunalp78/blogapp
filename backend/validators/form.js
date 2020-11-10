const { check } = require('express-validator');

exports.contactFormValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required!!!'),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Must be a valid email address'),
    check('message')
        .not()
        .isEmpty()
        .isLength({ min: 20 })
        .withMessage('Must be atleast 20 characters long')
];