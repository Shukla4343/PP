import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import background from '../images/3.png';

function Create_Products() {
    const [values, setValues] = useState({
        name: '',
        brochure: '',
        stock: '',
        retail_price: '',
        partner_price: '',
        category: ''
    });

    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3307/products/', values)
            .then(res => {
                console.log(res);
                navigate('/products')
            })
            .catch(err => console.log(err));
    };

    const handleCategoryChange = (e) => {
        setValues({ ...values, category: e.target.value });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div style={{ width: '50%', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
                <form onSubmit={handleSubmit}>
                    <h2>Add Products</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter Name' className='form-control'
                               onChange={e => setValues({ ...values, name: e.target.value })}/>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="">Upload Brochure</label>
                        <input type="text" placeholder='Upload Brochure' className='form-control'
                               onChange={e => setValues({ ...values, brochure: e.target.value })}/>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="">Stock</label>
                        <input type="text" placeholder='Available Stock' className='form-control'
                               onChange={e => setValues({ ...values, stock: e.target.value })}/>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="">Retail Price</label>
                        <input type="text" placeholder='Retail Price' className='form-control'
                               onChange={e => setValues({ ...values, retail_price: e.target.value })}/>
                    </div>
                    {/* <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="">Partner Price</label>
                        <input type="text" placeholder='Partner Price' className='form-control'
                               onChange={e => setValues({ ...values, partner_price: e.target.value })}/>
                    </div> */}
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="">Choose Category  below:</label>
                        <select className='form-control' value={values.category} onChange={handleCategoryChange}>
                            <option value="">--select--</option>
                            <option value="AgriSeries">AgriSeries</option>
                            <option value="CyberoneSeries">CyberOneSeries</option>
                            <option value="All">All</option>
                        </select>
                    </div>
                    <Link to="/products" style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', marginRight: '10px', textDecoration: 'none' }}>Back</Link>
                    <button type="submit" style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#28a745', color: '#fff', cursor: 'pointer' }}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create_Products;
