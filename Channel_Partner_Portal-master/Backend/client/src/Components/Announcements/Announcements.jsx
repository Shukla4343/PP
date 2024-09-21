import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import background from '../../images/3.png';

function Announcements(props) {
    const [announcements, setAnnouncements] = useState([]);
    const [isHovering, setIsHovering] = useState(false);
  
    useEffect(() => {
      axios.get('https://backend.indowings.com/announce/')
        .then(res => {
          if (res.data.length > 0) {
            setAnnouncements(res.data);
          }
        })
        .catch(err => console.log(err));
    }, []);
  
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
          <table className='table table-bordered table-hover ' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Heading</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcements, index) => (
                <tr key={index} style={{ backgroundColor: isHovering ? '#f8f9fa' : 'transparent' }}>
                  <td>{announcements.announce_id}</td>
                  <td>{announcements.heading}</td>
                  <td>{announcements.description}</td>
                  <td>
                    <Link to={`/read_announcement/${announcements.announce_id}`} className='btn btn-sm btn-info'>Manage</Link>
                    {/* <button onClick={() => handleDelete(announcements.announce_id)} className='btn btn-sm btn-danger mx-2'>Delete</button> */}
                  </td>
                </tr>
              ))}
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



 

