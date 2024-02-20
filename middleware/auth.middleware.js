var jwt = require("jsonwebtoken");

let authMiddleware = (req,res,next) => {

    let token = req.headers.authorization
    
    if(!token){
        return res.status(404).json({message:"Token not found"})
    }

    try{
      let auth = jwt.verify(token,process.env.secret)
      console.log(auth)
      return next();
    }catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    } 
}


module.exports = authMiddleware