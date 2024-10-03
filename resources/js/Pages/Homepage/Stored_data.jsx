import React, { useEffect, useState } from "react";
import axios from "axios";

const DataTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("/api/show")
            .then((response) => {
                if (Array.isArray(response.data.data)) {
                        setData(response.data.data);
                        } else {
                            console.log("Error");
                            }     
            });
    }, []);
    

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Stored Data</th>
                    <th>Created at</th>
                    <th>Delete </th>
                    <th>Edit</th>
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
<td><button style={{border:"none",backgroundColor:"white"}}><i class="bi bi-trash"></i> </button></td>
<td><button style={{border:"none",backgroundColor:"white"}}><i class="bi bi-pen"></i> </button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
