import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { GiShoppingBag } from 'react-icons/gi'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'
import { Badge, Space } from 'antd'






const Header = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const categories = useCategory()

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem('auth')
        toast.success("Logout Succesfully")
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" ><GiShoppingBag /> Khandani Watches</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <Link
                                className="nav-link dropdown-toggle"
                                to={"/categories"}
                                data-bs-toggle="dropdown"
                            >
                                Categories
                            </Link>
                            <ul className="dropdown-menu" style={{position:'absolute',left:'1063px',top:'47px'}}>
                                <li>
                                    <Link className="dropdown-item" to={"/categories"}>
                                        All Categories
                                    </Link>
                                </li>
                                {categories?.map((c) => (
                                    <li key={c._id}>
                                        <Link
                                            className="dropdown-item"
                                            to={`/category/${c.slug}`}
                                        >
                                            {c.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li></>) :
                                    (<li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth.user.role === 1 ? "Admin" : "User"}
                                        </a>

                                        <ul className="dropdown-menu">
                                            <li>
                                                <NavLink
                                                    to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"
                                                        }`}
                                                    className="dropdown-item"
                                                >
                                                    Dashboard
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    onClick={handleLogout}
                                                    to="/login"
                                                    className="dropdown-item"
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>)


                            }
                            <ul className="dropdown-menu">
                                <li>
                                    <NavLink
                                        to={`/dashboard/
                                       }`}
                                        className="dropdown-item"
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        onClick={handleLogout}
                                        to="/login"
                                        className="dropdown-item"
                                    >
                                        Logout
                                    </NavLink>
                                </li>
                            </ul>
                            <li className="nav-item">
                                <Space>
                                    <NavLink className="nav-link" to="/cart">Cart <Badge count={cart?.length} /></NavLink>
                                    </Space>
                            </li>



                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
