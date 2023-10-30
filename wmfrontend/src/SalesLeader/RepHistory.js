import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";


export default function RepHistory() {
    const [sales, setSales] = useState([]);

    const {repId}=useParams();

    useEffect(() => {
        loadSales();

    }, []);

    const loadSales = async () => {
        const result = await axios.get(`http://localhost:8081/getSalesData/${repId}`);
        setSales(result.data);
    }

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
                            </tr>

                        ))
                    }
                    </tbody>
                </table>
            </div>

        </div>
    )
}