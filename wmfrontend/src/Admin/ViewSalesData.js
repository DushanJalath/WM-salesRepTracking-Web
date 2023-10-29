import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";


export default function ViewSalesData() {
    const [sales, setSales] = useState([]);
    const [contact, setContact] = useState("");

    useEffect(() => {
        loadSales();

    }, []);

    const loadSales = async () => {
        const result = await axios.get("http://localhost:8081/getSalesData");
        setSales(result.data);
    }

    /*const getRepContact = async (repId) => {
        axios.get(`http://localhost:8081/getrepContact/${repId}`)
            .then(response => {
                setContact(response.data[0].mobileNo);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error loading sales data:", error);
            });
    };*/

    return (
        <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Item Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">SalesRep Name</th>
                        <th scope="col">SalesRep Contact</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date and Time</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sales.map((sales) => (
                            <tr>
                                <td>{sales.itemName}</td>
                                <td>{sales.qty}</td>
                                <td>{sales.repId}</td>
                                <td>{}</td>
                                <td>{sales.customerId}</td>
                                <td>{sales.amount}</td>
                                <td>{sales.time}</td>
                                <td>
                                    <Link className="btn btn-sm btn-outline-primary mx-1"
                                          to={`/salesData/${sales.salesId}`}>Edit</Link>
                                    <button className="btn btn-sm btn-outline-danger mx-1"
                                        /*onClick={() => deleteDoctor(sales.id)}*/>Delete
                                    </button>
                                </td>
                            </tr>

                        ))
                    }
                    </tbody>
                </table>
            </div>

        </div>
    )
}