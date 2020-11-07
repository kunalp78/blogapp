const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        max:32,
        index:true,
    },
    slug:{
        type:String,
        unique:true,
        index:true
    }
},{
    timestamps:true
});

module.exports = mongoose.model('Tag',tagSchema)