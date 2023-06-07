const express=require('express')
const {registerController,loginController,orderStatusController,getAllOrdersController,getOrdersController,testController,updateProfileController,forgotPasswordController}=require('../controllers/authController')
const {requireSignIn, isAdmin} = require('../middlewares/authMiddleware')

//router object
const router=express.Router()


//routing

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/test',requireSignIn,isAdmin,testController)
router.post('/forgot-password',forgotPasswordController)

//proteted route
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).json({ok:true})
})

router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).json({ok:true})
})

router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)


router.put('/profile',requireSignIn,updateProfileController)


//orders
router.get('/orders',requireSignIn,getOrdersController)

//adminOrders
router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)











module.exports=router