import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import background from '../../images/3.png';

function Create_announcement() {
    const [values, setValues] = useState({
        heading: '',
        description: ''
    });

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3307/create_announcement/', values)
            .then(res => {
                console.log(res);
                navigate('/announcements')
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
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='w-50 bg-white rounded p-5'>
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-4">Add Announcements</h2>
                    <div className='mb-3'>
                        <label htmlFor="heading" className="form-label">Heading</label>
                        <input 
                            type="text" 
                            id="heading" 
                            placeholder='Enter Heading' 
                            className='form-control'
                            value={values.heading}
                            onChange={e => setValues({ ...values, heading: e.target.value })}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="description" className="form-label">description</label>
                        <input 
                            type="text" 
                            id="description" 
                            placeholder='Enter description' 
                            className='form-control'
                            value={values.description}
                            onChange={e => setValues({ ...values, description: e.target.value })}
                        />
                    </div>
                    <div className='mb-3'>
                        <Link to="/announcements" className='btn btn-secondary me-2'>Back</Link>
                        <button type="submit" className='btn btn-primary'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create_announcement;
