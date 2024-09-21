import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import background from "../images/3.png";

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://backend.indowings.com/allorders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
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

  const handleStatusChange = (orderId) => {
    if (!selectedStatus) {
      console.error("No status selected");
      return;
    }

    console.log("Order ID:", orderId);
    console.log("New Status:", selectedStatus);

    fetch(`https://backend.indowings.com/updateOrderStatus/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newStatus: selectedStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update status");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Status updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter((order) =>
    order.order_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "1200px",
        }}
      >
        {error && <p>Error: {error}</p>}
        <h3 style={{ textAlign: "center", marginBottom: "5px" }}>
          Orders List
        </h3>
        <div style={{ marginBottom: "5px" }}>
          <input
            type="text"
            placeholder="Search by Email ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "40%",
              padding: "7px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Email</th>
              <th>Date</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.order_email}</td>
                <td>{formatDate(order.order_date)}</td>

                <td>
                  <ul>
                    {order.product && order.product.length > 0 ? (
                      order.product.map((product, index) => (
                        <li key={index}>
                          {product.name} - Quantity: {product.count}
                        </li>
                      ))
                    ) : (
                      <li>No products found</li>
                    )}
                  </ul>
                </td>
                <td>{order.total_price}</td>
                <td>{order.order_status}</td>
                <td>
                  <Link
                    to={`/editstatus/${order.order_id}`}
                    className="btn btn-sm btn-info"
                  >
                    Manage
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4" style={{ position: "fixed", bottom: 50, left: 50 }}>
          <Link to="/adminpage" className="btn btn-primary me-2">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

function isValidJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

export default Orders;
