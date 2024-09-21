import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function SelectedProductsModal({ selectedProducts, onClose }) {
  const user = useSelector(selectUser);
  const [showModal, setShowModal] = useState(false);
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
    cursor: "pointer",
    fontWeight: "bold",
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 50;
    const startX = 20;
    const startY = yPos;

    // Table Headers
    doc.setFont("helvetica");
    doc.text(80, 30, "Order Summary");

    const textWidth = doc.getStringUnitWidth("Order  Summary ") * doc.internal.getFontSize() / doc.internal.scaleFactor;
    doc.line(80, 30 + 5, 80 + textWidth, 30 + 5);

    doc.setFont("helvetica");
    doc.text(startX, yPos + 5, "Product Name");
    doc.text(startX + 80, yPos + 5, "Quantity");
    doc.text(startX + 120, yPos + 5, "Subtotal");
    yPos += 10;

    let totalSubtotal = 0;
    selectedProducts.forEach((product, index) => {
      doc.rect(startX, yPos, 80, 10); 
      doc.rect(startX + 80, yPos, 40, 10); 
      doc.rect(startX + 120, yPos, 40, 10); 

      doc.text(startX + 2, yPos + 8, product.name);
      doc.text(startX + 82, yPos + 8, product.count.toString());
      doc.text(startX + 122, yPos + 8, product.subtotal.toString());

      totalSubtotal += parseFloat(product.subtotal);
      yPos += 10; 
    });

    // Draw borders for the table
    doc.rect(startX, startY, 80, yPos - startY); 
    doc.rect(startX + 80, startY, 40, yPos - startY);
    doc.rect(startX + 120, startY, 40, yPos - startY);

    // Total Subtotal
    doc.text(startX + 80, yPos + 10, "Grand Total:");
    doc.text(startX + 122, yPos + 10, totalSubtotal.toFixed(2));


    doc.save("selected_products_list.pdf");
  };

  const calculateTotal = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.subtotal,
      0
    );
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
        setShowModal(false);
        onClose(); 
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

export default SelectedProductsModal;
