const mongoose=require('mongoose')

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        lowecase:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true,
    },
    quntity:{
        type:Number,
        required:true,
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        type:Boolean,
    },
},{timestamps:true})

module.exports=mongoose.model('Products',productSchema)