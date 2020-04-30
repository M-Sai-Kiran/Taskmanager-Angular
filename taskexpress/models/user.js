const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: 6
    },
    email:{
        required:true,
        type:String
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
})

module.exports =  mongoose.model('User',userSchema);
