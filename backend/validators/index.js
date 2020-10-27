const { validationResult } = require('express-validator');

exports.runValidation = async (req, res, next)=>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            res.status(422).json({
                error: errors.array()[0].msg
            })
        }
        next()
    }catch(e){
        res.status(500).send(e)
    }
}