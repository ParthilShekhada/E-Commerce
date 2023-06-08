import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import Layouts from "../../components/Layouts/Layouts";
import { useAuth } from "../../context/auth";



const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth]=useAuth()

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, { email, password})
        if(res.data.error ==false){
            navigate(location.state ||'/')
            toast.success(res.data.message)
            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token
            })
            localStorage.setItem('auth',JSON.stringify(res.data))
        }
        else{
            toast.error(res.data.message)
        }

    } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
    }
}


  return (
    <Layouts title="Login - Ecommerce App">
    <div className="form-container " style={{ minHeight: "90vh" }}>
      <form onSubmit={handleSubmit}>
        <h4 className="title">LOGIN FORM</h4>

        <div className="mb-3">
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="Enter Your Email "
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="mb-3">
          <button
            type="button"
            className="btn forgot-btn"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password
          </button>
        </div>

        <button type="submit" className="btn btn-primary">
          LOGIN
        </button>
      </form>
    </div>
  </Layouts>
  )
}

export default Login
