import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts/Layouts'
import UserMenu from '../../components/Layouts/UserMenu'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/auth'
import moment from 'moment'






const Orders = () => {
    const [orders,setOrders]=useState([])
    const [auth]=useAuth()

    const getOrders=async()=>{
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/auth/orders`);
            setOrders(data)

        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }

    useEffect(() => {
     if(auth?.token) getOrders()
    }, [auth?.token])
    
    return (
        <Layouts title={'Your Orders'}>
            <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        {console.log(o)}
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                        <td>{o?.payment.transaction.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-3">
                          <img
                          style={{height:'153px',width:'166px'}}
                            src={`${process.env.REACT_APP_API}/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                          <p>Quantity : {p.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
        </Layouts>

    )
}

export default Orders
