import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function SLSalesRef() {
    const [salesRef, setSalesRef] = useState([]);

    const { managerId } = useParams();

    useEffect(() => {
        loadSalesRef();

    }, []);

    const loadSalesRef = async () => {
        try {
            const result = await axios.get(`http://localhost:8081/getRep/${managerId}`);
            console.log(result.data);
            setSalesRef(result.data);
        } catch (error) {
            console.error("Error loading salesRef:", error);
        }
    }


    return (
        <div className="container">
            <div className="py-4">
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
                    {salesRef.map((salesRefs) => (
                        <tr>
                            <td>{salesRefs.id}</td>
                            <td>{salesRefs.name}</td>
                            <td>{salesRefs.mobileNo}</td>
                            <td>{salesRefs.address}</td>
                            <td>{salesRefs.managerId}</td>
                            <td>
                                <Link className="btn btn-sm btn-outline-primary mx-1" to={`/repHistory/${salesRefs.id}`}>
                                    History
                                </Link>
                                <Link className="btn btn-sm btn-outline-success mx-1" to={`/mapLocation/${salesRefs.id}`}>
                                    Location
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}