const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    let headers = req.headers;
    const token = headers['auth-token'];
    if(!token) return res.status(401).json({error:'Access Denied'})

    try{
        const verified = jwt.verify(token,process.env.SECRET_TOKEN);
        req.user = verified;
        next();
    }catch(err){
        return res.status(400).json({error:'Invalid Token'})
    }
}