const mongoose = require('mongoose');

let ProjectSchema = new mongoose.Schema({
    ProjectId:{
        type:Number,
        required:true,
        unique:true,
        trim:true
    },
    ProjectName:{
        type:String,
        maxlength:50,
        trim:true,
        required:true
    },
    TeamSize:Number
},
{timestamps:true})

module.exports = mongoose.model('Projects',ProjectSchema);