const Projects = require('../models/projects');

exports.getProjects = (req,res)=>{
    Projects.find({},{_id:0,ProjectId:1,ProjectName:1,TeamSize:1},(err,result)=>{
        if(err) return res.json({error:"failed to fetch projects"});
        else return res.json(result);
    })
}

exports.postProjects = (req,res)=>{
    var proj = new Projects(req.body);
    proj.save((err,result)=>{
        if(err) return res.json({error:"failed to fetch projects"});
        else return res.json({"ProjectId": result.ProjectId,
        "ProjectName": result.ProjectName,
        "TeamSize": result.TeamSize});
    })
}

exports.updateProjects = (req,res)=>{
    var proj = new Projects(req.body);
    Projects.updateOne({ProjectId:req.body.ProjectId},req.body,(err,result)=>{
        if(err) return res.json({error:"failed to fetch projects"});
        else return res.json(req.body);
    })
}