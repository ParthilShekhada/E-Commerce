import React from "react";
import { useSearch } from "../context/search";
import Layouts from "../components/Layouts/Layouts";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";



const Search = () => {
  const [cart,setCart]=useCart()
  const [values, setValues] = useSearch();
  console.log(values)
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
              <div className="card m-2" style={{ width: "18rem" }}>
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
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary"
                   onClick={()=>{
                    setCart([...cart,p])
                    toast.success('Item Added to Cart')
                  }}>ADD TO CART</button>
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