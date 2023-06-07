const { default: slugify } = require("slugify")
const ProductModel = require("../models/productModel")
const categoryModel=require("../models/categoryModel")
const fs = require('fs')
const braintree = require("braintree");
const orderModel = require("../models/orderModel");


//payement gateway
var gateway = new braintree.BraintreeGateway({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'vx82yrdw6rcyqznt',
    publicKey:    '4rxrftsvyv2k45n8',
    privateKey:   '6b662942f1834b22639432c85fb81360'
  });
  


const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields


        const { photo } = req.files

        switch (true) {
            case !name:
                return res.status(401).json({
                    error: true,
                    message: 'Name is required'
                })
            case !description:
                return res.status(401).json({
                    error: true,
                    message: 'description is required'
                })
            case !price:
                return res.status(401).json({
                    error: true,
                    message: 'price is required'
                })
            case !category:
                return res.status(401).json({
                    error: true,
                    message: 'category is required'
                })
            case !quantity:
                return res.status(401).json({
                    error: true,
                    message: 'quantity is required'
                })
            case photo && photo.size > 100000:
                return res.status(401).json({
                    error: true,
                    message: 'photo is required and should be less than 1mb'
                })

        }






        const product = new ProductModel({ ...req.fields, slug: slugify(name) })

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save()

        res.status(201).json({
            error: false,
            message: 'Product Created Successfully',
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            errorMessage: error.message,
            message: 'Error in Product'
        })
    }
}


const updateProductController = async (req, res) => {
    try {

        const { name, slug, description, price, category, quantity, shipping } = req.fields

        const { photo } = req.files

        switch (true) {
            case !name:
                return res.status(401).json({
                    error: true,
                    message: 'Name is required'
                })
            case !description:
                return res.status(401).json({
                    error: true,
                    message: 'description is required'
                })
            case !price:
                return res.status(401).json({
                    error: true,
                    message: 'price is required'
                })
            case !category:
                return res.status(401).json({
                    error: true,
                    message: 'category is required'
                })
            case !quantity:
                return res.status(401).json({
                    error: true,
                    message: 'quantity is required'
                })
            case photo && photo.size > 100000:
                return res.status(401).json({
                    error: true,
                    message: 'photo is required and should be less than 1mb'
                })

        }



        const product = await ProductModel.findByIdAndUpdate(req.params.id, { ...req.fields, slug: slugify(name) }, { new: true })

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        res.status(201).json({
            error: false,
            message: 'Product Created Successfully',
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: true,
            errorMessage: error.message,
            message: 'Error in Update Product'
        })
    }
}



const ProductController = async (req, res) => {
    try {

        const Product = await ProductModel.find({}).select("-photo").sort({ createdAt: 1 })

        res.status(200).json({
            error: false,
            totalCount: Product.length,
            message: 'All Categories List',
            Product
        })



    } catch (error) {
        res.status(500).json({
            error: true,
            errorMessage: error.message,
            message: 'Error while getting all Product',
        })
    }

}


const singleProductController = async (req, res) => {
    try {


        const Product = await ProductModel.findOne({ slug: req.params.slug });

        res.status(200).json({
            error: false,
            message: 'Single Product fetched',
            Product
        })


    } catch (error) {
        res.status(500).json({
            error: true,
            errorMessage: error.message,
            message: 'Error while getting single Product'
        })
    }
}


const deleteProductController = async (req, res) => {
    try {

        const { id } = req.params

        await ProductModel.findByIdAndDelete(id).select("photo");

        res.status(200).json({
            error: false,
            message: 'Product deleted successfully',

        })


    } catch (error) {
        res.status(500).json({
            error: true,
            errorMessage: error.message,
            message: 'Error while getting single Product'
        })
    }
}


const productPhotoController = async (req, res) => {
    try {

        const product = await ProductModel.findById(req.params.pid).select("photo");

        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            errorMessage: error.message,
            message: 'Error while getting photo'
        })
    }
}


const productFiltersController = async (req, res) => {
    try {

        const { checked, radio } = req.body
        let args = {}

        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await ProductModel.find(args);
        res.status(200).send({
            error: false,
            products,
        });

    } catch (error) {
        res.status(400).json({
            error: true,
            errorMessage: error.message,
            message: 'Error while filtering product'
        })
    }
}


const productCountController = async (req, res) => {
    try {
        const total = await ProductModel.find({}).estimatedDocumentCount()

        res.json({
            error: false,
            total
        })


    } catch (error) {
        res.status(400).json({
            error: true,
            errorMessage: error.message,
            message: 'Error in product count'
        })
    }
}

const productListController = async (req, res) => {
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await ProductModel.find({}).select('-photo').skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })

        res.json({
            error: false,
            products
        })



    } catch (error) {
        res.status(400).json({
            error: true,
            errorMessage: error.message,
            message: 'Error in product list'
        })
    }
}


const searchProductController = async (req, res) => {
    try {

        const { keyword } = req.params

        const results = await ProductModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo")

        res.json({
            results
        })

    } catch (error) {
        res.status(400).json({
            error: true,
            errorMessage: error.message,
            message: 'Error in product search'
        })
    }
}


const relatedProductController = async (req, res) => {
    try {

        const { cid, pid } = req.params

        const products = await ProductModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(3).populate("category")

        res.json({
            error: false,
            products
        })

    } catch (error) {
        res.status(400).json({
            error: true,
            errorMessage: error.message,
            message: 'Error in related products'
        })
    }
}


const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await ProductModel.find({ category }).populate("category");
        res.status(200).send({
            error: false,
            category,
            products,
        });

    } catch (error) {
        res.status(400).json({
            error: true,
            errorMessage: error.message,
            message: 'Error in category wise product'
        })
    }
}


const braintreeTokenController=async(req,res)=>{
    try {
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).json({
                    error:true,
                    message:err.message
                })
            }
            else{
                res.json({
                    error:false,
                    response
                })
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: true,
            errorMessage: error.message,
            message: 'Error in category wise product'
        })
    }
}


const braintreePaymentController=async(req,res)=>{
    try {
        const {cart,nonce}=req.body
        let total=0

        cart.map(i=> total+=i.price)

        let newTransaction=gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
        },
        function(error,result){
            if(result){
                console.log(result)
                const order=new orderModel({
                    products:cart,
                    payement:result,
                    buyer:req.user._id
                }).save()
                res.json({ok:true})
            }
            else{
                res.status(500).send(error)
            }
        }
        )
        
    } catch (error) {
        res.status(400).json({
            error: true,
            errorMessage: error.message,
            message: 'Error in payement gateway'
        })
    }
}




module.exports = {
    createProductController, updateProductController, braintreeTokenController,ProductController,
    singleProductController, productListController,braintreePaymentController, deleteProductController, productCountController, productPhotoController, productCategoryController, searchProductController, relatedProductController, productFiltersController
}