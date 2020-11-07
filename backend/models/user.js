const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        max:32,
        unique:true,
        index: true,
        lowercase:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        max:32,
        index:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        max:32,
        lowercase:true
    },
    profile:{
        type:String,
        required:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt:String,
    about:{
        type:String
    },
    role:{
        type: Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    resetPasswordLink:{
        data:String,
        default:''
    }
},{
    timestamps:true
})

userSchema.virtual('password')
    .set(function(password){
        //create a temprory variable called _password
        this._password = password;
        //generate salt
        this.salt = this.makeSalt();
        //encrypt Password
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    })
userSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password){
            return ''
        }
        try{
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        }catch(e){
            return ''
        }
    },
    makeSalt: function(){
        return Math.round(new Date().valueOf() * Math.round()) + '';
    }
}
module.exports = mongoose.model('User', userSchema);

