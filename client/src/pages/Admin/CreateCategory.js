import React, { useEffect, useState } from 'react'
import Layouts from '../../components/Layouts/Layouts'
import AdminMenu from '../../components/Layouts/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'


const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("")
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_API}/category/create-category`, { name })

            if (data.error == false) {
                toast.success(`${name} is created`)
                getAllCategory()
            }
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong")
        }
    }

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/category/get-category`)

            if (data.error == false) {
                setCategories(data.category)

            }
        } catch (error) {
            console.log(error)
            toast("Something went wrong when getting category")

        }
    }

    useEffect(() => {

        getAllCategory()

    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data.error==false) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error("Something went Wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };
    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/category/delete-category/${pId}`
            );
            if (data.error==false) {
                toast.success(`category is deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };
    return (
        <Layouts title={'Dashboard-Create Category'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div className="p-3">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {categories.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td><button key={c._id} className="btn btn-primary ms-2">Edit</button>
                                                    <button key={c._id} className="btn btn-danger ms-2" onClick={() => { handleDelete(c._id); }}> Delete </button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
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
