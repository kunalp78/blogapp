const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');//helps to check if token has expired or is still valid
// exports.signup = (req, res)=>{
//         User.findOne({ email: req.body.email }).exec(async (err, user)=>{
//             if(user){
//                 return res.status(400).json({
//                     e: 'Email already taken'
//                 })
//             }
//         const {name, email, password} = req.body;
//         let username = shortId.generate();
//         let profile = `${process.env.CLIENT_URL}/profile/${username}`;

//         let newUser = new User({name, email, password, profile, username});
//         await newUser.save((err, success)=>{
//             if(err){
//                 return res.status(400).json({ 
//                     error: err
//                 })
//             }
//             res.status(200).json({
//                 message: 'Signup Success',
//                 ///body: success
//             })
//         })
//     })
// }

exports.signup = (req, res) => {
    // console.log(req.body);
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            });
        }

        const { name, email, password } = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({ name, email, password, profile, username });
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            // res.json({
            //     user: success
            // });
            res.json({
                message: 'Signup success! Please signin.'
            });
        });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    // check if user exist
    User.findOne({ email }).exec(async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup.'
            });
        }
        // authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            });
        }
        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, name, email, role } = user;
        return res.json({
            token,
            user:{ _id, username, name, email, role }
        });
    });
};

exports.signout = (req, res)=>{
    res.clearCookie('token');
    res.json({
        message: 'Signout success'
    });
};
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });

exports.authMiddleware = (req, res, next)=>{
    //console.log(req.auth._id)
    const authUserId = req.auth._id;
    User.findById({_id: authUserId}).exec((err, user)=>{
        if(err || !user){
            return res.status(404).json({
                error: 'User not found'
            })
        }
        req.profile = user;
        next()
    })
}

exports.adminMiddleware = (req, res, next)=>{
    const adminMiddleware = req.auth._id;
    User.findById({_id: adminMiddleware}).exec((err, user)=>{
        if(err || !user){
            return res.status(404).json({
                error: 'User not found'
            })
        }
        if(user.role !== 1){
            return res.status(404).json({
                error: 'Admin resource access denied'
            })
        }
        req.profile = user;
        next()
    })
}