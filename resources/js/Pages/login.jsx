import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import "./Css/test.css";
import Headers from "./componets/header";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Main from "./Homepage/Main";

export default function Edit() {
    const [values, setValues] = useState({
        name: "",
        password: "",
    });
    const [id,setId]=useState("");

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
        console.log(data);
        axios
            .post("/api/login", data)
            .then((response) => {
                console.log(response.data);

            })
        }

    return (
        <div>
            <Headers />
            <ToastContainer />
            <center>
                <h1>User Login</h1>
            </center>

            <div className="container">
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
                            type='{
      passowrd ? "text" : "password"
      }'
                            style={{ width: "400px" }}
                            required
                        />
                        <i className="fa fa-eye" aria-hidden="true"></i>
                        <center>
                            {" "}
                            <button type="submit" className="btn btn-dark">
                                Submit
                            </button>
                        </center>
                    </form>
                </div>
            </div>
        </div>
    );
}
