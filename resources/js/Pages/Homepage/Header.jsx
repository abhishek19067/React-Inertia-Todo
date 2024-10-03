import axios from 'axios';
import React from 'react';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';


function Navbar() {
  const   logout=()=>{ axios.get('/api/logout').then((response) => {
    console.log(response.data.message);
    toast.success(response.data.message);
    setTimeout(() => {
      window.location.href = `/login`;
  }, 1000);
    

    })
  }
  return (
    <div>
      <ToastContainer />
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className    ="container-fluid">
    <a className="navbar-brand" href="#"><img src="https://img.freepik.com/premium-photo/3d-paper-clipboard-task-management-todo-check-list-with-pencil_1029469-267954.jpg?w=360"  style={{width:"60px",height:"60px"}}/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link " href='/api/home' >Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/showing">Saved Data</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Setting
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Change Username</a></li>
            <li><a className="dropdown-item" href="#">Change Password</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="logout">LogOut</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <button className="nav-link " aria-disabled="true" onClick={logout}>Logout</button>
          
         
        </li>
      </ul>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>
      
    </div>
  )
}

export default Navbar

