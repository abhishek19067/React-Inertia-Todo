import { useEffect, useState } from "react";

import Headers from "./Login/signup/loginheader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
    const [values, setValues] = useState({
        name: "",
        password: "",
        email: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = values;
    
        axios.post("/api/post", data)
            .then((response) => {
                console.log(response);
                console.log(response.data.token);
                toast.success("Account Register Successfully");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            })
            .catch((err) => {
                console.log(err.response);
                const errorMessage = err.response.data.message;
                if (err.response.data.errors.email) {
                    toast.error("Email: " + err.response.data.errors.email[0]); 
                }
                
                if (err.response.data.errors.name) {
                    toast.error("Name: " + err.response.data.errors.name[0]);
                }
                
                if (err.response.data.errors.password) {
                    toast.error("Password: " + err.response.data.errors.password[0]);
                }
            });
    }
    

    return (
        <div>
            <ToastContainer  />
            <Headers />
            <center>
                <h1>Registration Page</h1>
            </center>

            <div className="container" >
                <div className="con  mb-3">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-3">
                            <label htmlFor="name" className="form-label">
                                Username
                            </label>
                            <input
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                className="form-controls"
                                style={{ width: "400px" }}
                                required
                            />
                        </div>
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            value={values.password}
                            className="form-controls"
                            onChange={handleChange}
                            type="password"
                            style={{ width: "400px" }}
                            required
                        />
                        <i className="fa fa-eye" aria-hidden="true"></i>
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                        type="email"
                            id="email"
                            className="form-controls"
                            value={values.email}
                            onChange={handleChange}
                            style={{ width: "400px" }}
                            required
                        />
                        <center>
                            {" "}
                            <button type="submit" className="btn btn-dark">
                                Register
                            </button>
                        </center>
                    </form>
                </div>
            </div>
        </div>
    );
}
