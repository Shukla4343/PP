import React from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Contract() {
  const user = useSelector(selectUser);
  function SelectedProductsModal({ selectedProducts, onClose }) {
    const user = useSelector(selectUser);
    const modalStyle = {
      display: "block",
      position: "fixed",
      zIndex: 1,
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      overflow: "auto",
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    };
  
    const modalContentStyle = {
      backgroundColor: "#fefefe",
      margin: "15% auto",
      padding: "20px",
      border: "1px solid #888",
      width: "80%",
    };
  
    const closeStyle = {
      color: "#aaa",
      float: "right",
      fontSize: "28px",
      fontWeight: "bold",
    };
  
    const placeOrder = () => {
      const orderData = {
        order_email: user.username,
        order_date: new Date().toISOString(),
        order_status: null,
        product: selectedProducts,
        total_price: calculateTotal(),
      };
  
      axios
        .post("http://localhost:3307/orders", orderData)
        .then((response) => {
          console.log("Order placed successfully:", response.data);
          alert("Order placed successfully!");
        })
        .catch((error) => {
          console.error("Error placing order:", error);
          alert("Error placing order. Please try again later.");
        });
    };

  return (
    <div style={modalStyle}>
    <div style={modalContentStyle}>
      <span style={closeStyle} onClick={onClose}>
        &times;
      </span>
      <h2>Selected Products</h2>
      <ul>
        {selectedProducts.map((product, index) => (
          <li key={index}>
            <p>{product.name}</p>
            <p>Quantity: {product.count}</p>
            <p>Subtotal: {product.subtotal}</p>
          </li>
        ))}
      </ul>
      <p>Total: {calculateTotal()}</p>
      <button onClick={downloadPDF}>Download PDF</button>
      <button onClick={placeOrder} style={{ marginLeft: "10px" }}>
        Place Order
      </button>
    </div>
  </div>
  );
}
}
export default Contract;