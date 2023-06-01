const express=require('express')
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const formidable=require('express-formidable')
const { createProductController,updateProductController,ProductController,productPhotoController,singleProductController,deleteProductController } = require('../controllers/productController')


const router=express.Router()


//routes

//Create Product
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

//Update Product
router.put('/update-product/:id',requireSignIn,isAdmin,formidable(),updateProductController)

//All Product
router.get('/get-product',ProductController)

//Single Product
router.get('/single-product/:slug',singleProductController)

//delete Product
router.delete('/delete-product/:id',requireSignIn,isAdmin,deleteProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)



module.exports=router