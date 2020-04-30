const joi = require('@hapi/joi');

let projectValidator = (dataObj)=>{
    const schema = joi.object({
        name: joi.string().min(4).required()
    })

    return schema.validate(dataObj);
}

let userValidator = (data)=>{
    const schema = joi.object({
        name : joi.string().min(3).required().max(100),
        email : joi.string().required().min(6),
        password : joi.string().required().min(8).max(150)
    })
    return schema.validate(data);
}
module.exports.projectValidator = projectValidator
module.exports.userValidator = userValidator;