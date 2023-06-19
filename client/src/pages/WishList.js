import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import Layouts from "../components/Layouts/Layouts"
import Loader from "../components/Layouts/Loader"
import { useAuth } from "../context/auth";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cart";




const CategoryProduct = () => {
    const navigate = useNavigate();
    const [auth] = useAuth()
    const [products, setProducts] = useState([]);
    const [spinner, setSpinner] = useState(false)
    const [cart, setCart] = useCart()


    useEffect(() => {
        getPrducts();
    }, [auth.user]);
    const getPrducts = async () => {
        try {
            const id = auth.user._id
            setSpinner(true)
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/product/getwish-list/${id}`
            );
            setProducts(data?.products);
            setSpinner(false)
        } catch (error) {
            setSpinner(false)
            console.log(error);
        }
    };

    const removeProduct = async (pid) => {
        try {
            const userId = auth.user._id
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/product/removewish-list`, { userId, pid }
            );
            console.log(data)
            getPrducts()

        } catch (error) {
            setSpinner(false)

        }
    }

    const clearWishList = async () => {
        try {
            const userId = auth.user._id
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/product/clearwish-list`, { userId }
            );
            console.log(data)
            getPrducts()

        } catch (error) {
            setSpinner(false)

        }
    }

    const addToCart=async(p)=>{
        try {
          const existingProduct = cart.find((item) => item._id === p._id);
      
          if (existingProduct) {
            const updatedCart = cart.map((item) => {
                if (item._id === p._id) {
                    return {
                        ...item,
                        itemCount: item.itemCount + 1
                    };
                }
                return item;
            });
      
            setCart(updatedCart);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            toast.success("Quantity updated in cart");
      
        } else {
            setCart([...cart, {...p,itemCount:1}]);
            localStorage.setItem(
              "cart",
              JSON.stringify([...cart, p])
            );
            toast.success("Item Added to cart");
        }
          
         
           
          
        } catch (error) {
          
        }
      }

    return (
        <Layouts>
            <div className="container mt-3 category">
                {spinner &&
                    <Loader />
                }
                {spinner == false &&
                    <>
                        <h3 className="text-center">WishList</h3>
                        {products.length>0?(<>
                        <AiFillDelete size={40} onClick={clearWishList} style={{ position: 'absolute', top: '132px', right: '0', width: '128px' }} />
                        <div className="row">
                            <div className="col-md-9 offset-1">
                                <div className="container">
                                <div className="d-flex flex-wrap">
                                    {products?.map((p) => (
                                        <div className="card m-2" key={p._id} style={{ height: '550px' }}>
                                            <img
                                            style={{height:'229px'}}
                                                src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                                                className="card-img-top"
                                                alt={p.name}
                                            />
                                            <div className="card-body" >
                                                <div className="card-name-price">
                                                    <h5 className="card-title">{p.name}</h5>
                                                    <h5 className="card-title card-price">
                                                        {p.price.toLocaleString("en-US", {
                                                            style: "currency",
                                                            currency: "USD",
                                                        })}
                                                    </h5>
                                                </div>
                                                <p className="card-text mb-3 " >
                                                    {p.description.substring(0, 50)}...
                                                </p>
                                                <div className="card-name-price" style={{ position: 'absolute', bottom: '55px', height: '35px', width: '250px' }}>
                                                    <button
                                                        className="btn btn-info ms-1"
                                                        onClick={() => navigate(`/product/${p.slug}`)}
                                                    >
                                                        More Details
                                                    </button>
                                                    <button
                                                        className="btn btn-danger ms-1"
                                                        onClick={() => removeProduct(p._id)}

                                                    >
                                                        Remove      
                                                    </button>
                                                    
                                                </div>
                                                <div style={{ position: 'absolute', bottom: '5px', height: '45px', width: '245px',marginLeft:'6px' }}>
                                                <button
                                                        className="btn btn-dark mt-1"
                                                        onClick={() => addToCart(p)}
                                                    >
                                                        ADD TO CART
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                                </div>

                                {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
                            </div>
                        </div></>):(<h6 className="text-center">Empty WishList</h6>)}
                    </>}
            </div>
        </Layouts>
    );
};

export default CategoryProduct;