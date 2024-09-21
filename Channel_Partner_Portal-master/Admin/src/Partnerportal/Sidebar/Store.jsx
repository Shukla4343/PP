import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import jsPDF from "jspdf";
import SelectedProductsModal from "./SelectedProductsModal";

function Store() {
  const [productsData, setProductsData] = useState([]);
  const [userCategory, setUserCategory] = useState("");
  const [userCommission, setUserCommission] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isAnyProductSelected, setIsAnyProductSelected] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    setUserCategory(user.category);
    setUserCommission(user.commission);

    axios
      .get("http://localhost:3307/products_create/")
      .then((res) => {
        if (res.data.length > 0) {
          const productsWithCount = res.data.map((product) => ({
            ...product,
            count: 0,
          }));
          setProductsData(productsWithCount);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const selectedProducts = productsData.filter(
      (product) => product.count > 0
    );
    setIsAnyProductSelected(selectedProducts.length > 0);
  }, [productsData]);

  const incrementCount = (index) => {
    const updatedProductsData = [...productsData];
    if (updatedProductsData[index].count < updatedProductsData[index].stock) {
      updatedProductsData[index].count++;
      updatedProductsData[index].stock--; // Decrease stock
      setProductsData(updatedProductsData);
    } else {
      alert("Cannot order more than available stock.");
    }
  };

  const decrementCount = (index) => {
    const updatedProductsData = [...productsData];
    if (updatedProductsData[index].count > 0) {
      updatedProductsData[index].count--;
      updatedProductsData[index].stock++; // Increase stock
      setProductsData(updatedProductsData);
    }
  };

  const calculateSubtotal = (index) => {
    const partnerPrice =
      (productsData[index].retail_price * (100 - user.commission)) / 100;
    const subtotal = partnerPrice * productsData[index].count;
    return subtotal;
  };

  const calculateTotalCost = () => {
    return productsData.reduce((total, product) => {
      const subtotal = calculateSubtotal(productsData.indexOf(product));
      return total + subtotal;
    }, 0);
  };

  const generatePDF = () => {
    const selectedProducts = productsData.filter(
      (product) => product.count > 0
    );

    if (selectedProducts.some((product) => product.stock === 0)) {
      alert("One or more selected products are out of stock and cannot be ordered.");
      return;
    }

    const doc = new jsPDF();
    let yPos = 10;

    doc.text(20, yPos, "Selected Products List");
    yPos += 10;

    selectedProducts.forEach((product) => {
      const subtotal = calculateSubtotal(productsData.indexOf(product));
      doc.text(20, yPos, `Product Name: ${product.name}`);
      doc.text(20, yPos + 5, `Quantity: ${product.count}`);
      doc.text(20, yPos + 15, `Subtotal: ${subtotal}`);
      yPos += 20;
    });

    const totalCost = selectedProducts.reduce((total, product) => {
      const subtotal = calculateSubtotal(productsData.indexOf(product));
      return total + subtotal;
    }, 0);

    doc.text(20, yPos + 10, `Total Cost: ${totalCost}`);
    //doc.save('selected_products_list.pdf');

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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

  const buttonStyle = {
    padding: "8px 12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#4CAF50",
    color: "white",
    marginRight: "4px",
  };

  const countBoxStyle = {
    display: "inline-block",
    padding: "4px 8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "8px",
  };

  const totalCostStyle = {
    display: "inline-block",
    padding: "8px 12px",
    backgroundColor: "red",
    color: "white",
    borderRadius: "4px",
  };

  return (
    <div className="main-container">
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>
              <h3 style={{ color: "white" }}>
                Partner Store - {user.category}
              </h3>
            </th>
          </tr>
        </thead>
      </table>
      {/* <h1 style={{ color: '#191b30' }}>Partner Store - {user.category} </h1> */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Product Name</th>
            <th style={thStyle}>Brochure</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Retail Price</th>
            <th style={thStyle}>Partner Price-({user.commission})</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Quantity</th>
            {/* <th style={thStyle}>Subtotal</th> */}
          </tr>
        </thead>
        <tbody>
          {productsData.map((product, index) => {
            if (product.category === userCategory || userCategory === "All") {
              return (
                <tr key={product.product_id}>
                  <td style={tdStyle}>{product.name}</td>
                  <td style={tdStyle}>
                    <a
                      href={product.brochure}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Brochure
                    </a>
                  </td>
                  <td style={tdStyle}>{product.stock}</td>
                  <td style={tdStyle}>{product.retail_price}</td>
                  <td style={tdStyle}>
                    {(product.retail_price * (100 - user.commission)) / 100}
                  </td>
                  <td style={tdStyle}>{product.category}</td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        style={buttonStyle}
                        onClick={() => decrementCount(index)}
                      >
                        -
                      </button>
                      <div style={countBoxStyle}>{product.count}</div>
                      <button
                        style={buttonStyle}
                        onClick={() => incrementCount(index)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  {/* <td style={tdStyle}>{calculateSubtotal(index).subtotal}</td> */}
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        {/* <p>Total Cost: <span style={totalCostStyle}>{calculateTotalCost()}</span></p> */}
        {isAnyProductSelected && ( // Render button only if any product is selected
          <button style={buttonStyle} onClick={generatePDF}>
            Proceed
          </button>
        )}
      </div>

      {showModal && (
        <SelectedProductsModal
          selectedProducts={productsData
            .filter((product) => product.count > 0)
            .map((product) => ({
              ...product,
              subtotal: calculateSubtotal(productsData.indexOf(product)),
            }))}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Store;
