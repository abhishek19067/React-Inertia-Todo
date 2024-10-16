import { useEffect, useState } from "react";
import { Inertia } from '@inertiajs/inertia';


import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Headers from "./Login/signup/loginheader";

export default function Login() {
    const [values, setValues] = useState({
        name: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

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
        console.log("Form data:", data);
        axios.post("/api/login", data)
            .then((response) => {
                console.log("Response from API:", response.data);
                if (response.data.message === "User logged in successfully") {
                    //set local storage
                    const user = response.data.user; 
                    localStorage.setItem("user", JSON.stringify(user)); 
                    const token=response.data.token;
                    localStorage.setItem("token", JSON.stringify(token)); 
                
                    toast.success(response.data.message);
                    setTimeout(() => {
                        window.location.href = `/home`;
                      }, 1000); 
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                toast.error("An unexpected error occurred.");
                console.error(error);
            });
    }
    

    return (
        <div>
            <Headers />
            <ToastContainer />
            <center>
                <h1>User Login</h1>
            </center>

            <div className="container">
                <div className="con mb-3">
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
                            type={showPassword ? "text" : "password"}
                            style={{ width: "400px" }}
                            required
                        />
                        <i className="fa fa-eye" aria-hidden="true" onClick={() => setShowPassword(!showPassword)}></i>
                        <center>
                            <button type="submit" className="btn btn-dark">
                                Login
                            </button>
                        </center>
                    </form>
                </div>
            </div>
        </div>
    );
}
