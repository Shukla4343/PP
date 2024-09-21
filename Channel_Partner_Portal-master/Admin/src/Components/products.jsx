import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import background from "../images/3.png";

function Products(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3307/products_create/")
      .then((res) => {
        if (res.data.length > 0) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // const handleDelete = (product_id) => {
  //   axios.delete('http://localhost:3307/delete_products/' + product_id)
  //     .then(res => {
  //       location.reload();
  //     })
  //     .catch(err => console.log(err))
  // }

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "max",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "1200px",
        }}
      >
        <h2 className="mb-4">Products List</h2>
        <div className="d-flex justify-content-end mb-4">
          <Link to="/create_products" className="btn btn-success">
            {" "}
            Create +
          </Link>
        </div>
        <div className="table-responsive">
          <table
            className="table table-bordered table-hover"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th style={{ padding: "10px" }}>ID</th>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Brochure</th>
                <th style={{ padding: "10px" }}>Stock</th>
                <th style={{ padding: "10px" }}>Retail Price</th>
                {/* <th style={{ padding: "10px" }}>Partner Price</th> */}
                <th style={{ padding: "10px" }}>Category</th>
                <th style={{ padding: "10px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => {
                return (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
                    }}
                    className="table-row-hover"
                  >
                    <td style={{ padding: "10px" }}>{product.product_id}</td>
                    <td style={{ padding: "10px" }}>{product.name}</td>
                    <td style={{ padding: "10px" }}>
                      <a
                        href={product.brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Brochure
                      </a>
                    </td>
                    <td style={{ padding: "10px" }}>{product.stock}</td>
                    <td style={{ padding: "10px" }}>{product.retail_price}</td>
                    {/* <td style={{ padding: "10px" }}>{product.partner_price}</td> */}
                    <td style={{ padding: "10px" }}>{product.category}</td>
                    <td style={{ padding: "10px" }}>
                      <Link
                        to={`/read_products/${product.product_id}`}
                        className="btn btn-sm btn-info me-2"
                      >
                        Manage
                      </Link>
                      {/* <Link to={`/update_products/${product.product_id}`} className='btn btn-sm btn-primary me-2'>Edit</Link> */}
                      {/* <button onClick={() => handleDelete(product.product_id)} className='btn btn-sm btn-danger'>Delete</button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Link to="/adminpage" className="btn btn-primary">
          Back
        </Link>
      </div>
    </div>
  );
}

export default Products;
