const { default: slugify } = require("slugify")
const ProductModel = require("../models/productModel")
const fs = require('fs')


const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quntity, shipping } = req.fields

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
            case !quntity:
                return res.status(401).json({
                    error: true,
                    message: 'quntity is required'
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
        res.status(500).json({
            error: true,
            errorMessage: error.message,
            message: 'Error in Product'
        })
    }
}


const updateProductController = async (req, res) => {
    try {

        const { name, slug, description, price, category, quntity, shipping } = req.fields

        console.log("name-->",req.fields)
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
            case !quntity:
                return res.status(401).json({
                    error: true,
                    message: 'quntity is required'
                })
            case photo && photo.size > 100000:
                return res.status(401).json({
                    error: true,
                    message: 'photo is required and should be less than 1mb'
                })

        }



        const product = await ProductModel.findByIdAndUpdate(req.params.id,{...req.fields,slug:slugify(name)},{new:true})

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
        res.status(500).json({
            error: true,
            errorMessage: error.message,
            message: 'Error in Update Product'
        })
    }
}



const ProductController = async (req, res) => {
    try {

        const Product = await ProductModel.find({}).select("-photo").limit(12).sort({ createdAt: 1 })

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


        const Product = await ProductModel.findOne({ slug: req.params.slug }).select("photo");

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



module.exports = {
    createProductController, updateProductController, ProductController,
    singleProductController, deleteProductController, productPhotoController
}