import React from 'react'
import Layouts from '../../components/Layouts/Layouts'
import AdminMenu from '../../components/Layouts/AdminMenu'
import { useAuth } from '../../context/auth'


const AdminDashboard = () => {
    const [auth,setAuth]=useAuth()
    return (
        <Layouts title={'Dashboard'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu/>
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h1>Admin Name: {auth?.user?.name}</h1>
                            <h1>Admin Email: {auth?.user?.email}</h1>
                            <h1>Admin Cotact: {auth?.user?.phone}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    )
}

export default AdminDashboard
