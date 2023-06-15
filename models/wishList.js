const mongoose=require('mongoose')

const wishListSchema =new mongoose.Schema({
    product: [
        {
          type: mongoose.ObjectId,
          ref: "Products",
        },
      ],
    user: {
        type: mongoose.ObjectId,
        ref: "users",
      },
    

})

module.exports=mongoose.model('Wishlist',wishListSchema)
