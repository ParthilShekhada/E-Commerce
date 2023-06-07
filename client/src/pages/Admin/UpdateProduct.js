import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts/Layouts'
import AdminMenu from '../../components/Layouts/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
const { Option } = Select


const UpdateProduct = () => {

    const navigate = useNavigate()
    const params = useParams()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState([])
    const [categoryId, setCategoryId] = useState([])
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [id, setId] = useState("")


    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/category/get-category`)

            if (data.error == false) {
                setCategories(data?.category)

            }
            else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error)
            toast("Something went wrong when getting products")

        }
    }



    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", categoryId);
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/product/update-product/${id}`,
                productData
            );
            if (data.error == true) {
                toast.error(data?.message);
            } else {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    const getSingleProduct = async () => {
        try {


            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/single-product/${params.slug}`)

            //getting the category of product using api
            const categoryDetail = await axios.get(`${process.env.REACT_APP_API}/category/categorybyid/${data.Product.category}`)


            setName(data.Product.name);
            setId(data.Product._id);
            setDescription(data.Product.description);
            setPrice(data.Product.price);
            setPrice(data.Product.price);
            setQuantity(data.Product.quantity);
            setShipping(data.Product.shipping);
            setCategory(categoryDetail.data.category.name);
            setCategoryId(data.Product.category)

        } catch (error) {
            toast.error('Something Went Wrong')
        }
    }


    const handleDelete=async(req,res)=>{
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/product/delete-product/${id}`)

            if(data.error==false){
                toast.success(data.message)
                navigate('/dashboard/admin/products')
            }
            else{
                toast('Something Went Wrong')
            }

        } catch (error) {
            toast.error('Something Went Wrong')

        }
    }


    useEffect(() => {

        getAllCategory()
        getSingleProduct()
    }, [])

    return (
        <Layouts title={'Dashboard-Update Product'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>


                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="Write a description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Write a quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select Shipping "
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => {
                                        setShipping(value);
                                    }}
                                    value={shipping ? "Yes" : "No"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`${process.env.REACT_APP_API}/product/product-photo/${id}`}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    UPDATE PRODUCT
                                </button>
                                <button className="btn btn-danger m-3" onClick={handleDelete}>
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    )
}

export default UpdateProduct
