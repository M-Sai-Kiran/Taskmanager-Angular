const Projects = require('../models/projects');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {projectValidator,userValidator} = require('../routes/joiValidator')

exports.getProjects = (req,res)=>{
    Projects.find({},{_id:0,ProjectId:1,ProjectName:1,TeamSize:1},(err,result)=>{
        if(err) return res.json({error:"failed to fetch projects"});
        else return res.json(result);
    })
}

exports.postProjects = (req,res)=>{
    let {error} = projectValidator(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    var proj = new Projects(req.body);
    proj.save((err,result)=>{
        if(err) return res.json({error:"failed to save project"});
        else return res.json({"ProjectId": result.ProjectId,
        "ProjectName": result.ProjectName,
        "TeamSize": result.TeamSize});
    })
}

exports.updateProjects = (req,res)=>{
    Projects.updateOne({ProjectId:req.body.ProjectId},req.body,(err,result)=>{
        if(err) return res.json({error:"failed to update project"});
        else return res.json(req.body);
    })
}

exports.register =async (req,res)=>{
    //validating all fields using happi/joi
    let {error} = userValidator(req.body);
    if(error) return res.status(400).json(error.details[0]);

    //check if email is already taken
    let emailExists = await User.findOne({email:req.body.email});
    if(emailExists) return res.json({error: 'email id already exists'});

    //hashing password
    const salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(req.body.password,salt)
    let user = new User({name:req.body.name,email:req.body.email,password:hash});
    user.save((err,result)=>{
        if(err) return res.status(400).json(err)
        else return res.json(result)
    })
}

exports.login =async (req,res)=>{
    let userExists = await User.findOne({email:req.body.email});
    if(!userExists) return res.status(400).json({error: 'Invalid email id or password'});

    //validation of password
    let validPassword = await bcrypt.compare(req.body.password,userExists.password);
    if(!validPassword) return res.status(400).json({error:'Invalid Password'});

    //create jwt token for user
    let token =await jwt.sign({_id:userExists._id},process.env.SECRET_TOKEN);
    console.log(res.headers);
    return res.header('auth-token',token).json({name:userExists.name,_id:userExists._id,token:token,email:userExists.email})
}