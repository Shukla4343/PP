import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '../images/3.png'; 

function Create() {
    const [values, setValues] = useState({
        username: '',
        password: '',
        category: '',
        commission: ''
    });

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3307/partner/', values)
            .then(res => {
                console.log(res);
                navigate('/addpartner')
            })
            .catch(err => console.log(err));
    };

    const handleCategoryChange = (e) => {
        setValues({ ...values, category: e.target.value });
    };

    return (
        <div 
            className='d-flex vh-100 justify-content-center align-items-center'
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='w-50 bg-white rounded p-5'>
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-4">Add Partner</h2>
                    <div className='mb-3'>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder='Enter Email' 
                            className='form-control'
                            value={values.username}
                            onChange={e => setValues({ ...values, username: e.target.value })}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder='Enter Password' 
                            className='form-control'
                            value={values.password}
                            onChange={e => setValues({ ...values, password: e.target.value })}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className="form-label">Commission(%)</label>
                        <input 
                            type="text" 
                            id="commission" 
                            placeholder='Enter commission in %' 
                            className='form-control'
                            value={values.commission}
                            onChange={e => setValues({ ...values, commission: e.target.value })}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="category" className="form-label">Choose Category</label>
                        <select 
                            id="category" 
                            className='form-select' 
                            value={values.category} 
                            onChange={handleCategoryChange}
                        >
                            <option value="">--select--</option>
                            <option value="AgriSeries">AgriSeries</option>
                            <option value="CyberoneSeries">CyberOneSeries</option>
                            <option value="All">All</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <Link to="/addpartner" className='btn btn-secondary me-2'>Back</Link>
                        <button type="submit" className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;
