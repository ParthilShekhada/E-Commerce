import React, { useEffect, useState } from 'react'
import Layouts from '../components/Layouts/Layouts'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { toast } from 'react-hot-toast'
import { Prices } from '../components/Layouts/Price'
import '../styles/HomePage.css'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import { AiOutlineReload } from "react-icons/ai";



const HomePage = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const getTotal = async () => {
    try {

      const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-count`);
      setTotal(data.total)

    } catch (error) {
      console.log(error)
    }
  }


  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/category/get-category`)

      if (data.error === false) {
        setCategories(data?.category)

      }
      else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    }
    else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)

  }

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/product/products-filters`, { checked, radio })
      setProducts(data?.products)

    } catch (error) {
      console.log(error)
    }
  }

  const loadMore = async (req, res) => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${process.env.REACT_APP_API}/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data.products])


    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()

  }, [page])



  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts()

  }, [checked.length, radio.length])


  useEffect(() => {
    getAllCategory()
    getTotal()
  }, [])


  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio])


  return (
    <Layouts title={'All Products-Best Offers'}>
        <img
        src="/images/khandani.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c,index) => (
              <Checkbox
                key={c._id}
                style={{ marginLeft: index === 0 ? '-1px' : '0' }}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div >
                  <Radio key={p._id} value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" key={p._id} style={{height:'510px'}}>
                <img onClick={() => navigate(`/product/${p.slug}`)}
                  src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5  className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 50)}...
                  </p>
                  <div className="card-name-price" style={{position:'absolute',bottom:'9px',height:'35px',width:'250px'}}>
                    <button
                      className="btn btn-info ms-1 "
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layouts >
  )
}

export default HomePage
