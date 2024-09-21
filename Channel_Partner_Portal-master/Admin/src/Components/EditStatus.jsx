import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import background from "../images/3.png";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imgDB } from "../firebase.js";

function EditStatus(props) {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  const [values, setValues] = useState({
    order_status: "",
    invoice: null,
  });
  const [uploading, setUploading] = useState(false);

  const handleUpload = (e, fieldName) => {
    const file = e.target.files[0];
    console.log(file);
    const imgs = ref(imgDB, `invoice/${v4()}.${file.name.split(".").pop()}`);

    setUploading(true);

    uploadBytes(imgs, file)
      .then((data) => {
        console.log(data, "imgs");
        getDownloadURL(data.ref).then((val) => {
          console.log(val);
          setValues({ ...values, [fieldName]: val });
          setUploading(false);
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setUploading(false);
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3307/edistatus/${order_id}`, values)
      .then((res) => {
        console.log(res);
        navigate("/orders");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3307/read_order/${order_id}`)
      .then((res) => {
        setOrder(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [order_id]);

  const handleDelete = (order_id) => {
    axios
      .delete(`http://localhost:3307/delete_order/${order_id}`)
      .then((res) => {
        navigate("/orders");
      })
      .catch((err) => console.log(err));
  };

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
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleUpdate}>
          <h3>
            Update Status
            <button
              onClick={() => handleDelete(order.order_id)}
              className="btn btn-danger ms-2"
            >
              Delete Order
            </button>
          </h3>

          <div style={{ marginBottom: "20px" }}>
            <p>Order ID: {order.order_id}</p>
            <p>Email: {order.order_email}</p>
            <p>Date: {formatDate(order.order_date)}</p>
            <label htmlFor="status">Change Status:</label>
            <select
              id="status"
              value={values.order_status}
              onChange={(e) =>
                setValues({ ...values, order_status: e.target.value })
              }
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <option value="">--select--</option>
              <option value="pending">Pending</option>
              <option value="Awaiting Payment">Awaiting Payment</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Shipped">Shipped</option>
              <option value="Success">Success</option>
              <option value="In process">In process</option>
            </select>
          </div>
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="invoice">Upload Invoice:</label>
            <input
              type="file"
              onChange={(e) => {
                handleUpload(e, "invoice");
              }}
            />
            {uploading && <p>Uploading...</p>}
          </div>

          <br />

          <Link
            to="/orders"
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              cursor: "pointer",
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
              marginRight: "10px",
              cursor: "pointer",
              textDecoration: "none",
              backgroundColor: "#28a745",
              color: "#fff",
            }}
          >
            Update
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default EditStatus;
