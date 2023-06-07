const express=require('express')
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const { createCategoryController,updateCategoryController,categoryByIdController,categoryController,singleCategoryController,deleteCategoryController } = require('../controllers/categoryController')


const router=express.Router()


//routes

//Create category
router.post('/create-category',requireSignIn,isAdmin,createCategoryController)

//Update Category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//All Category
router.get('/get-category',categoryController)

//get Category by id
router.get('/categorybyid/:id',categoryByIdController)

//Single Category
router.get('/single-category/:slug',singleCategoryController)

//delete Category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)



module.exports=router