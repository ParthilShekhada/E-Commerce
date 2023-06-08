import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layouts/AdminMenu'
import Layouts from '../../components/Layouts/Layouts'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'


const Product = () => {

    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/product/get-product`)

            if (data.error == false) {
                setProducts(data.Product)
            }
            else {
                toast.error('Something Went Wrong')
            }

        } catch (error) {
            toast.error('Something Went Wrong')
        }
    }

    useEffect(() => {

        getAllProducts()

    }, [])


    return (
        <Layouts>
            <div className="container-fluid m-3 p-3">

                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>All Products List</h1>
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className="product-link"
                                >
                                    <div className="card m-2" style={{ width: "18rem" }}>
                                        <img
                                        style={{height:'230px'}}
                                            src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                                            className="card-img-top"
                                            alt={p.name}
                                        />
                                        <div className="card-body" style={{height:'135px'}}>
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 50)}...</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    )
}

export default Product
