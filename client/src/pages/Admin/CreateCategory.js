import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts/Layouts'
import AdminMenu from '../../components/Layouts/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'


const CreateCategory = () => {
    const [categories, setCategories] = useState([]);

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/category/get-category`)

            if (data.error == false) {
                setCategories(data.category)
            }
            console.log(categories)
        } catch (error) {
            console.log(error)
            toast("Something went wrong when getting category")

        }
    }

    useEffect(() => {

        getAllCategory()

    }, [])


    return (
        <Layouts title={'Dashboard-Create Category'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {categories.map(c=>{
                                            <td key={c._id}>c.name</td>
                                        })}
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    )
}

export default CreateCategory
