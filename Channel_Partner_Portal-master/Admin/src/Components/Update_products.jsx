import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import background from "../images/3.png";

function Update_products(props) {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    brochure: "",
    stock: "",
    retail_price: "",
    partner_price: "",
    category: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3307/read_products/${product_id}`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const {
            name,
            brochure,
            stock,
            retail_price,
            partner_price,
            category,
          } = res.data[0];
          setValues({
            name,
            brochure,
            stock,
            retail_price,
            partner_price,
            category,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [product_id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3307/update_products/${product_id}`, values)
      .then((res) => {
        console.log(res);
        navigate("/products");
      })
      .catch((err) => console.log(err));
  };

  const handleCategoryChange = (e) => {
    setValues({ ...values, category: e.target.value });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleUpdate}>
          <h2>Update Products</h2>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="brochure">Upload Brochure</label>
            <input
              type="text"
              placeholder="Upload Brochure"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              value={values.brochure}
              onChange={(e) =>
                setValues({ ...values, brochure: e.target.value })
              }
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="">Stock</label>
            <input
              type="text"
              placeholder="Available Stock"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              value={values.stock}
              onChange={(e) => setValues({ ...values, stock: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="">Retail Price</label>
            <input
              type="text"
              placeholder="Retail Price"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              value={values.retail_price}
              onChange={(e) =>
                setValues({ ...values, retail_price: e.target.value })
              }
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="">Partner Price</label>
            <input
              type="text"
              placeholder="Partner Price"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              value={values.partner_price}
              onChange={(e) =>
                setValues({ ...values, partner_price: e.target.value })
              }
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="">Choose Category below:</label>
            <select
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              value={values.category}
              onChange={handleCategoryChange}
            >
              <option value="">--select--</option>
              <option value="AgriSeries">AgriSeries</option>
              <option value="CyberoneSeries">CyberOneSeries</option>
              <option value="All">All</option>
            </select>
          </div>
          <Link
            to="/products"
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "#fff",
              marginRight: "10px",
              textDecoration: "none",
            }}
          >
            Back
          </Link>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#28a745",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update_products;
