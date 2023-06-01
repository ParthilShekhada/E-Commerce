const { hashPassword, comparePassword } = require("../helpers/authHepler")
const userModels=require("../models/userModel")
const jwt=require('jsonwebtoken')

const registerController=async (req,res)=>{
    try {
        const {name,email,password,phone,address,answer}=req.body

        if(!name){
            return res.json({error:true,message:"Name is required"})
        }
        if(!email){
            return res.json({error:true,message:"Email is required"})
        }
        if(!password){
            return res.json({error:true,message:"Password is required"})
        }
        if(!phone){
            return res.json({error:true,message:"Phone is required"})
        }
        if(!phone){
            return res.json({error:true,message:"Address is required"})
        }
        if(!answer){
            return res.json({error:true,message:"Answer is required"})
        }


        //for check if user already exists
        const exstingUser=await userModels.findOne({email})

        if(exstingUser){
            return res.status(200).json({error:true,message:"User already exists"})
        }


        //register the user 
        const hashedPassword=await hashPassword(password)

        const user =await new userModels({name,email,phone,address,password:hashedPassword,answer}).save()

        res.status(201).json({
            error:false,
            message:"User created successfully",
            user
        })

    } catch (error) {
        res.status(500).json({
            error:true,
            message:error.message
        })
    }
}


const loginController=async(req,res)=>{

    try {
        const{email,password}=req.body

        if(!email || !password){
            res.status(404).json({
                error:true,
                message:"Invalid email or password"
            })
        }

        const user=await userModels.findOne({email})

        if(!user){
            return res.status(404).json({
                error:true,
                message:"Email is not registered"
            })
        }

        const match=await comparePassword(password,user.password)

        if(!match){
            return res.status(200).json({
                error:true,
                message:"Invalid password"
            })
        }

        //creating token
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn:"30d"
        })

        res.json({
            error:false,
            message:"Login succesfully",
            token,
            user
        })



    } catch (error) {
        res.status(500).json({
            error:true,
            message:error.message
        })    }
}

const forgotPasswordController=async(req,res)=>{
    try {
        const {email,answer,newPassword}=req.body
        
        if(!email){
            return res.json({error:true,message:"Email is required"})
        }
        if(!newPassword){
            return res.json({error:true,message:"New Password is required"})
        }
        if(!answer){
            return res.json({error:true,message:"Answer is required"})
        }

        const user=await userModels.findOne({email,answer})

        if(!user){
            return res.json({error:true,message:"Wrong Email or Answer"})
        }

    const hashed=await hashPassword(newPassword)

    await userModels.findByIdAndUpdate(user._id,{password:hashed})

    res.json({
        error:false,
        message:"Password Reset Succesfully"
    })


    } catch (error) {
        res.status(500).json({
            error:true,
            message:"Something went wrong",
            errorMessage:error.message
        }) 
    }
}



const testController=async(req,res)=>{
    try {
        
        res.send("hello")



    } catch (error) {
        res.status(500).json({
            error:true,
            message:error.message
        }) 
    }
}


module.exports={registerController,loginController,testController,forgotPasswordController}