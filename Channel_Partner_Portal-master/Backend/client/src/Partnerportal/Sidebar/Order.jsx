
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Order(props) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const user = useSelector(selectUser);

  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    margin: "auto",
    backgroundColor: "#f5f5f5",
  };

  const thStyle = {
    backgroundColor: "#191b30",
    color: "white",
    textAlign: "left",
    padding: "29px",
    border: "1px solid #dddddd",
  };

  const tdStyle = {
    textAlign: "left",
    padding: "20px",
    border: "1px solid #dddddd",
  };

  useEffect(() => {
    fetch("https://backend.indowings.com/allorders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Response data:", data);
        if (Array.isArray(data)) {
          setOrders(data);
          setError(null);
        } else {
          setError("The response from /allorders is not an array.");
        }
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError(
          "An error occurred while fetching orders. Please try again later."
        );
      });
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="main-container">
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>
              <h3 style={{ color: "white" }}>Orders List</h3>
            </th>
          </tr>
        </thead>
      </table>
      {/* <h1 style={{ color: "#191b30" }}>Orders List</h1> */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Order Summary</th>
            <th style={thStyle}> Grand Total </th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}> Invoice </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            if (order.order_email === user.username) {
              return (
                <tr key={order.order_id}>
                  <td style={tdStyle}>{order.order_id}</td>
                  <td style={tdStyle}>{formatDate(order.order_date)}</td>
                  <td style={tdStyle}>{order.order_email}</td>

                  <td style={tdStyle}>
                    <ul>
                      {order.products && order.products.length > 0 ? (
                        order.products.map((product, index) => (
                          <li key={index}>
                            {product.product_name} - Product ID: {product.product_id}
                          </li>
                        ))
                      ) : (
                        <li>No products found</li>
                      )}
                    </ul>

                  </td>
                  <td style={tdStyle}>{order.total_price}</td>
                  <td style={tdStyle}>{order.order_status}
                  </td>
                  <td style={tdStyle}>
                    {order.invoice && (
                      <a
                        href={order.invoice}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <u>(View Invoice)</u>
                      </a>
                    )}
                  </td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Order;