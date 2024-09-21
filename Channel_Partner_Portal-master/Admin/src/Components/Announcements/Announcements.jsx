import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import background from '../../images/3.png';

function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
    const location = useLocation();

    // Fetch announcements whenever the component mounts or the location changes
    useEffect(() => {
        fetchAnnouncements();
    }, [location]);

    // Fetch announcements from the server
    const fetchAnnouncements = () => {
        axios.get('http://localhost:3307/announce/')
            .then(res => {
                if (res.data.length > 0) {
                    setAnnouncements(res.data);
                } else {
                    console.log("No announcements found");
                }
            })
            .catch(err => console.log("Error fetching announcements:", err));
    };

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}
        >
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', width: '90%', maxWidth: '1200px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add Announcements</h2>
                <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                    <Link to="/create_announcement" className='btn btn-success'> Create +</Link>
                </div>
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Heading</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.length > 0 ? (
                            announcements.map((announcement, index) => (
                                <tr
                                    key={announcement.id} // Use unique ID instead of index for better key management
                                    style={{ backgroundColor: hoveredRowIndex === index ? '#f8f9fa' : 'transparent' }}
                                    onMouseEnter={() => setHoveredRowIndex(index)}
                                    onMouseLeave={() => setHoveredRowIndex(null)}
                                >
                                    <td>{announcement.id}</td>
                                    <td>{announcement.heading}</td>
                                    <td>{announcement.description}</td>
                                    <td>
                                        <Link to={`/read_announcement/${announcement.id}`} className='btn btn-sm btn-info'>Manage</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>No Announcements Available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Link to="/adminpage" className='btn btn-primary me-2'>Back</Link>
                </div>
            </div>
        </div>
    );
}

export default Announcements;
