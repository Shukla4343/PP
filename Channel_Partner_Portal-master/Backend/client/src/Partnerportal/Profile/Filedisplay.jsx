// FileUploadForm.js
import React, { useState, useEffect } from 'react';

const Filedisplay = () => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      // Handle response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      <div>
        <h2>User Data</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              Name: {user.name}, Aadhar File: {user.aadhar_file}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filedisplay;
