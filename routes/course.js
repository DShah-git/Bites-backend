// Importing express module 
const express=require("express") 
const router=express.Router() 
const Course = require('../models/course')

router.get("/",(req,res,next)=>{
    Course.find().then(data=>{
        return res.status(200).json({message:"Courses found",data:data})
    }).catch(err=>{
        return res.status(500).json({message:"Error while trying to retrieve Course"})
    })
})

router.get("/:id",(req,res,next)=>{
    Course.findById(req.params.id).then(data=>{
        return res.status(200).json({message:"Course found",data:data})
    }).catch(err=>{
        return res.status(500).json({message:"Error while trying to retrieve Course"})
    })
})

router.post("/add",(req,res,next)=>{  
    const course = new Course(req.body) 

    course.save().then((data)=>{
        console.log(data)
        return res.status(200).send({message:"Course Added"})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).send({message:"Could not add Course"})
    })
})


router.post("/modify",(req,res,next)=>{  
    let course = req.body
    let id = req.body._id

    Course.findById(id).then(data=>{
        if(!data){
            return res.status(404).send({message:"Course not found"})
        }

        data.course_name = course.course_name
        data.modules = course.modules

        data.save().then(()=>{
            return res.status(200).send({message:"Course saved successfully", data:data})
        })
    })
    .catch(err=>{
       
        return res.status(500).send({message:"Error while finding course",error:err})
    })
})



// Importing the router 
module.exports=router