// Importing express module 
const express=require("express") 
const router=express.Router() 
const professor = require('../models/professor')


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
  
// Handling request using router 

router.get("/",(req,res,next)=>{
    res.send("getProfessor")
})

router.post("/register",(req,res,next)=>{ 
    
    const userEmail = req.body.email
 
    professor.findOne({email:userEmail}).then((data)=>{
        if(data){
            console.log(data)
            return res.status(400).json({message:"User Already Registered"}) 
            
        }
    
        const prof = new professor({
            name:req.body.name,
            email:userEmail,
            password: bcrypt.hashSync(req.body.password, 8),
        })
    
        prof.save().then((data)=>{
            console.log(data)
            return res.status(200).send({message:"Successfully registered user"})
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).send({message:"Error while trying to register user"})
        })
            
        

    })
    .catch((err)=>{
        return res.status(500).json({message:"Error while trying to register user"})
        
    })
    
}) 
  
router.post("/login",(req,res,next)=>{ 
    const userEmail = req.body.email
    const password = req.body.password

    professor.findOne({email:userEmail}).then((data)=>{
        if(!data){
            return res.status(404).json({message:"User not registered"}) 
            
        }
        
        var passwordValid = bcrypt.compareSync(password,data.password);
         
        if(!passwordValid){
            return res.status(400).json({message:"Incorrect Email or Password"}) 
            
        }
            
        const token = jwt.sign({ id: data._id,email:data.email },
            process.env.secret,
            {
              algorithm: 'HS256',
              allowInsecureKeySizes: true,
              expiresIn: 86400, // 24 hours
            });

        res.status(200).json({message:"User login successful",data:{token:token}})      

    })
    .catch((err)=>{
        return res.status(500).json({message:"Error while trying to register user"})
        
    })

})




// Importing the router 
module.exports=router