import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './Navbar';

function Showing_data() {
  const [data, setData] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));


  useEffect(() => 
  {
    axios.get(`/show/${user.id}`)
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else {
          console.log("Error");
        }
      });
  }, []);

  const submit = (id) => {
    if (window.confirm("Do you want to delete this item?")) {
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

  return (
    <>
      <Navbar />
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Stored Data</th>
            <th>Created at</th>
            <th>Delete </th>

          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.stored_data
              }</td><td>
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
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

            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Showing_data
