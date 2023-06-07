const { default: slugify } = require("slugify")
const categoryModel = require("../models/categoryModel")
const userModel = require("../models/userModel")



const createCategoryController=async(req,res)=>{
    try {
        
        const {name}=req.body

        if(!name){
            return res.status(401).json({
                error:true,
                message:'Name is required'
            })
        }

        const existingCategory=await categoryModel.findOne({name})

        if(existingCategory){
            return res.status(200).json({
                error:false,
                message:'Category alerady exists'
            })
        }

        const category=await new categoryModel({name,slug:slugify(name)}).save()

        res.status(201).json({
            error:false,
            message:'Category Created Successfully',
            category
        })

    } catch (error) {
        res.status(500).json({
            error:true,
            errorMessage:error.message,
            message:'Error in Category'
        })
    }
}


const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body
        const {id}=req.params

        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})

        res.status(200).json({
            error:false,
            message:'Category Updated Successfully',
            category
        })


    } catch (error) {
        res.status(500).json({
            error:true,
            errorMessage:error.message,
            message:'Error in Category'
        })
    }
}


const categoryController=async(req,res)=>{
    try {
        
        const category=await categoryModel.find({})

        res.status(200).json({
            error:false,
            message:'All Categories List',
            category
        })



    } catch (error) {
        res.status(500).json({
            error:true,
            errorMessage:error.message,
            message:'Error while getting all category'
        })
    }

}


const singleCategoryController=async(req,res)=>{
    try {
      

        const category=await categoryModel.findOne({slug:req.params.slug})

        res.status(200).json({
            error:false,
            message:'Get Single Category Success',
            category
        })


    } catch (error) {
        res.status(500).json({
            error:true,
            errorMessage:error.message,
            message:'Error while getting single category'
        })
    }
}


const deleteCategoryController=async(req,res)=>{
    try {
        
        const {id}=req.params

        await categoryModel.findByIdAndDelete(id)

        res.status(200).json({
            error:false,
            message:'Category delted successfully',
            
        })


    } catch (error) {
        res.status(500).json({
            error:true,
            errorMessage:error.message,
            message:'Error while getting single category'
        })
    }
}

const categoryByIdController=async(req,res)=>{
    try {

        const category=await categoryModel.findById(req.params.id)

        res.status(200).json({
            error:false,
            message:'Get Single Category Success',
            category
        })

    } catch (error) {
        res.status(500).json({
            error:true,
            errorMessage:error.message,
            message:'Error while getting single category'
        })
    }
}



module.exports={createCategoryController,updateCategoryController,categoryController,
    singleCategoryController,deleteCategoryController,categoryByIdController}