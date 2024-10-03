import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "./Header";

function Main() {
    const [values, setValues] = useState({
        stored_data: "",
        id: "",
    });
    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get("/api/show").then((response) => {
            if (Array.isArray(response.data.data)) {
                setData(response.data.data);
            } else {
                console.log("Error");
            }
        });
    }, []);

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }
    const submit = (id) => {
        if (window.confirm("Do you want to Delete this Item?")) {
            deleteUser(id);
        } else {
            console.log("Action canceled");
        }
    };

    const deleteUser = (id) => {
        axios
            .delete(`/api/delete/${id}`)
            .then((response) => {
                toast.error("Deleted Data Successfully");
                refreshData();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    function store(e) {
        e.preventDefault();

        if (editMode) {
            axios
                .put(`/api/update/${values.id}`, values)
                .then((response) => {
                    toast.success("Data Successfully Updated");
                    setEditMode(false);
                    setValues({ stored_data: "", id: "" });
                    refreshData();
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            axios
                .post("/api/home", values)
                .then((response) => {
                    toast.success("Data Successfully Stored");
                    setValues({ stored_data: "", id: "" });
                    refreshData();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    const edit_data = (id) => {
        axios.get(`/api/edit/${id}`).then((response) => {
            const editItem = response.data.data;
            setValues({ stored_data: editItem.stored_data, id: editItem.id });
            setEditMode(true);
        });
    };

    const refreshData = () => {
        axios.get("/api/show").then((response) => {
            if (Array.isArray(response.data.data)) {
                setData(response.data.data);
            }
        });
    };

    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className="container">
                <form onSubmit={store} name="abhi">
                    <div className="input-group mb-3">
                        <input
                            type="hidden"
                            id="id"
                            value={values.id}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Text"
                            id="stored_data"
                            value={values.stored_data}
                            onChange={handleChange}
                            style={{
                                textAlign: "center",
                                fontSize: "20px",
                                margin: "30px",
                            }}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary "
                                type="submit"
                                name="store"
                                hidden
                            >
                                {editMode ? "Update" : "Store"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <center>
                <h1 style={{ fontFamily: "sans-serif" }}>Stored Data</h1>
            </center>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Stored Data</th>
                        <th>Created at</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.stored_data}</td>
                            <td>
                                {new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                }).format(new Date(item.created_at))}
                            </td>
                            <td>
                                <button
                                    style={{
                                        border: "none",
                                        backgroundColor: "white",
                                    }}
                                    onClick={() => submit(item.id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                            <td>
                                <button
                                    style={{
                                        border: "none",
                                        backgroundColor: "white",
                                    }}
                                    onClick={() => edit_data(item.id)}
                                >
                                    <i className="bi bi-pen"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Main;
