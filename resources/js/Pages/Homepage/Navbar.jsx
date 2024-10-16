import axios from 'axios';
import React from 'react';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "./navbar.css";
import { Link } from '@inertiajs/inertia-react';



export default function Navbar(){

  // user-Info
  const username = JSON.parse(localStorage.getItem("user"));
  const [Old_password,setOldPassword]=useState('');
  const [new_password,setNewPassword]=useState('');

  const [name, setname] = useState("");
      
  const logout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      axios.post('/api/logout').then((response) => {
        console.log(response.data.message);
        toast.success(response.data.message);
    window.location.href = `/login`;
      })
    }
  }
  //update Password
  const  update_password = (e) =>
  {
    e.preventDefault();
    console.log(Old_password,new_password);
    console.log(username.id);
    axios.post(`/api/update_password/${username.id}`, { old_password: Old_password, new_password
      : new_password })
      .then((response) => 
      {
        console.log(response.data.message);
        if(response.data.message=="Password updated successfully"){
          toast.success(response.data.message);
        }
        else{
          toast.error(response.data.error);
        }
      })
  }

  return (
    <div>
      
      <ToastContainer />  
      <nav className="navbar navbar-expand-lg bg-body-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><img src="https://img.freepik.com/premium-photo/3d-paper-clipboard-task-management-todo-check-list-with-pencil_1029469-267954.jpg?w=360" style={{ width: "60px", height: "60px" }} /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1 className="Heading" style={{
            marginLeft:"350px"
          }}>Todo List</h1>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{
              fontSize:"20px",
              marginLeft:"300px",
              gap:"10px"
            }}>
              <li className="nav-item">
                <Link href='/home' className='nav-link'>Home</Link>
              </li>
              <li className="nav-item">
                <Link href='/Saved_Data' className='nav-link'>Todo's</Link>

              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Setting
                </a>
                <ul className="dropdown-menu">
                  <li className="modals" data-bs-toggle="modal" data-bs-target="#myModal2" >
                    Change Password
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" onClick={logout}>LogOut</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <button className="nav-link " aria-disabled="true" onClick={logout}>Logout</button>
              </li>
            </ul>

            {/* Password change Model  */}
            <div className="modal" id="myModal2">
              <div className="modal-dialog">
                <div className="modal-content">


                  <div className="modal-header">
                    <center><h4 className="modal-title">Change Password</h4></center>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  </div>

                  <div className="modal-body">
                    <form onSubmit={update_password}>
                      <div className="form-floating mb-3">
                        <input type="password" className="form-control" name="Old" value={Old_password} onChange={(e) => setOldPassword(e.target.value)}  required/>
                        <label htmlFor="Old">Old Password</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input type="password" className="form-control" name="New" value={new_password} onChange={(e) => setNewPassword(e.target.value)} required/>
                        <label htmlFor="Old">New Password</label>
                      </div>
                      <center><button type="submit" className="btn btn-success" >Change Password</button> </center>
                      </form>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </nav>

    </div>
  )
}
