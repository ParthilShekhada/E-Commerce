const jwt=require('jsonwebtoken')
const userModel = require('../models/userModel')

//protected routes token base

const requireSignIn=async(req,res,next)=>{
    try {
        const decode=jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user=decode
        next()


        
    } catch (error) {
         res.status(500).json({
            error:true,
            message:error.message
        })  
    }
}


const isAdmin=async(req,res,next)=>{
    try {
         
        const dbUser=await userModel.findById(req.user._id)

        if(dbUser.role !==1){
            return res.status(200).json({
                error:true,
                message:"Unauthorized Access"
            })  
        }
        next()


    } catch (error) {
        res.status(500).json({
            error:true,
            message:error.message
        })  
    }
}


module.exports={requireSignIn,isAdmin}