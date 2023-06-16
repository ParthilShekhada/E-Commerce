import React from "react";
import { useSearch } from "../context/search";
import Layouts from "../components/Layouts/Layouts";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import '../styles/HomePage.css'
import { useNavigate } from 'react-router-dom'





const Search = () => {
  const [cart, setCart] = useCart()
  const [values, setValues] = useSearch();
  const navigate=useNavigate()

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
    <Layouts title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" key={p._id} style={{ width: "18rem", height: '410px' }}>
                <img
                  src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <div className="card-name-price" style={{ position: 'absolute', bottom: '14px', height: '35px', width: '256px' }}>
                    <button
                      className="btn btn-info ms-1 "
                      onClick={() => navigate(`/product/${p.slug}`)}
                      style={{marginRight:'4px'}}
                    >
                      More Details
                    </button>
                    <button class="btn btn-secondary"
                      onClick={() => addToCart(p)}>ADD TO CART</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layouts>
  );
};

export default Search;