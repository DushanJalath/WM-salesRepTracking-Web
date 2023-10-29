import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function SalesRefDetails() {
    const [salesRep, setSalesRep] = useState([]);

    useEffect(() => {
        loadSalesRef();

    }, []);

    const loadSalesRef = async () => {
        const result = await axios.get("http://localhost:8081/getReps");
        setSalesRep(result.data);
    }

    /*const deleteDoctor = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/salesRef/deleteDoctor/${id}`);
        loadSalesRef();
    }
*/
    return (
        <div className="container">
            <div className="py-4">
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    marginLeft: "1em",
                    marginRight: "1em",
                    fontWeight: "bolder"
                }}>
                    <h3></h3>
                    <Link to="/addSalesRef" className="obtn">Add Sales Ref</Link>
                </div>
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                        <th scope="col">ManagerId</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        salesRep.map((salesRefs) => (
                            <tr>
                                <td>{salesRefs.id}</td>
                                <td>{salesRefs.name}</td>
                                <td>{salesRefs.mobileNo}</td>
                                <td>{salesRefs.address}</td>
                                <td>{salesRefs.managerId}</td>
                                <td>
                                    <Link className="btn btn-sm btn-outline-primary mx-1" to={`/saleRef`}>
                                        Edit
                                    </Link>
                                    <button className="btn btn-sm btn-outline-danger mx-1">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
