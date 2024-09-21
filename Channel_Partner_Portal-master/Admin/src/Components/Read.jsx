import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../images/3.png'; 


function Read(props) {
    const { id } = useParams();
    const [partner, setPartner] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3307/read/${id}`)
            .then(res => {
                setPartner(res.data[0]);
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3307/delete/${id}`)
            .then(res => {
                navigate('/addpartner');
            })
            .catch(err => console.log(err))
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', width: '90%', maxWidth: '1200px' }}>
                <h3 className='text-center mb-4'>Partner Details</h3>
                <table className="table table-bordered table-hover">
                    <tbody>
                        <tr>
                            <th className="text-center" style={{ width: '30%' }}>Attribute</th>
                            <th className="text-center">Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>{partner.id}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{partner.username}</td>
                        </tr>
                        {/* <tr>
                            <td>Password</td>
                            <td>
                                {showPassword ? partner.password : "********"}
                                <button onClick={togglePasswordVisibility} className="btn btn-sm btn-outline-primary ms-2">
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </td>
                        </tr> */}
                        <tr>
                            <td>Commission</td>
                            <td>{partner.commission}</td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>{partner.category}</td>
                        </tr>
                        <tr>
                            <td>Steps</td>
                            <td>{partner.steps}</td>
                        </tr>
                        <tr>
                            <td>Review</td>
                            <td>{partner.review}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <Link to="/addpartner" className='btn btn-primary me-2'>Back</Link>
                    <Link to={`/edit/${partner.id}`} className='btn btn-info'>Edit</Link>
                    {/* <button onClick={() => handleDelete(partner.id)} className='btn btn-danger ms-2'>Delete</button> */}
                </div>
            </div>
        </div>
    )
}

export default Read;
