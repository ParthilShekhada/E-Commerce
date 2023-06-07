const express=require('express')
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const formidable=require('express-formidable')
const { createProductController,updateProductController,braintreePaymentController,braintreeTokenController,productCategoryController,relatedProductController,searchProductController,productListController,productCountController,productFiltersController,ProductController,productPhotoController,singleProductController,deleteProductController } = require('../controllers/productController')


const router=express.Router()


//routes
//payement routes
//token
router.get('/braintree/token',requireSignIn,braintreeTokenController)

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


//filter Product
router.post('/products-filters',productFiltersController)

//product count
router.get('/product-count',productCountController)


//product per page
router.get('/product-list/:page',productListController)

//search product 
router.get('/search/:keyword',searchProductController)


//similar products
router.get('/related-product/:pid/:cid',relatedProductController)

//category wise product 
router.get('/product-category/:slug',productCategoryController)

//payment
router.post("/braintree/payment", requireSignIn, braintreePaymentController);






module.exports=router