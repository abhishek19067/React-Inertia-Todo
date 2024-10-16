import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import './main.css';

function Mainpage() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [userID, setUser] = useState(user ? user.id : "");
    const [values, setValues] = useState({
        stored_data: "",
        id: "",
    });

    const [data, setData] = useState([]);
    const [editMode, setEditMode] = useState(false);

    if (!userID) {
        return <Redirect to="/login" />;
    }

    // Fetch Data on Component Mount
    useEffect(() => {
        if (userID) {
            fetchData(userID);
        }
    }, [userID]); 
    const fetchData = (userID) => {
        axios.get(`/show/${userID}`).then((response) => {
            if (Array.isArray(response.data.data)) {
                setData(response.data.data);  
            } else {
                console.log("Error: Data format is incorrect");
            }
        }).catch(err => {
            console.error("Error fetching data: ", err);
        });
    };

    // Handle Input Changes
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    }

    
    const deleteUser = (id) => {
        if (window.confirm("Do you want to delete this item?")) {
            axios
                .delete(`/api/delete/${id}`)
                .then((response) => {
                    toast.error("Deleted Data Successfully");
                    setData(prevData => prevData.filter(item => item.id !== id));  
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log("Action canceled");
        }
    };

    // Store/Update Data
    const store = (e) => {
        e.preventDefault();
        const payload = { ...values, userID };

        if (editMode) {
            axios
                .put(`/api/update/${values.id}`, payload)
                .then((response) => {
                    toast.success("Data Successfully Updated");
                    setEditMode(false);
                    setValues({ stored_data: "", id: "" });
                    fetchData(userID); 
                })
                .catch(err => {
                    toast.error(err.response.data.message);
                });
        } else {
            axios
                .post("/api/home", payload)
                .then((response) => {
                    toast.success("Data Successfully Stored");
                    setValues({ stored_data: "", id: "" });
                    fetchData(userID); 
                })
                .catch(err => {
                    toast.error(err.response.data.message);
                });
        }
    };

    // Edit Data
    const edit_data = (id) => {
        axios.get(`/edit/${id}`).then((response) => {
            const editItem = response.data.data;
            setValues({ stored_data: editItem.stored_data, id: editItem.id });
            setEditMode(true);
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
                            id="userID"
                            value={userID}
                            onChange={(e) => setUser(e.target.value)}
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
                                borderRadius: "40px"
                            }}
                            required
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-dark"
                                type="submit"
                                name="store"
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
                                    onClick={() => deleteUser(item.id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                            <td>
                                <button
                                    className="abhi"
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

export default Mainpage;
