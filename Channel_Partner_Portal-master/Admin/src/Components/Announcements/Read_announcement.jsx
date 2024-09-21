import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../../images/3.png";

function ReadAnnouncement() {
    const { id } = useParams(); // Ensure 'id' is correctly passed from the URL
    const [announcement, setAnnouncement] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const response = await axios.get(`http://localhost:3307/read_announcement/${id}`);
                if (response.status === 200 && response.data.length > 0) { // Check if response status is OK
                    const announcement = (response.data)[0];
                    setAnnouncement(announcement);
                   // console.log("After setting state",announcement.description)
                } else {
                    throw new Error(`Error: ${response.statusText}`); // Handle non-200 responses
                }
            } catch (err) {
                setError(err.message); // Set error state
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncement();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3307/delete_announcement/${id}`);
            navigate("/announcements");
        } catch (error) {
            console.error("Error deleting announcement:", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!announcement) return <div>No announcement found</div>;

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                minHeight: "100vh",
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
                    width: "90%",
                    maxWidth: "1200px",
                }}
            >
                <h3 className="text-center mb-4">Announcement Details</h3>
                <table className="table table-bordered table-hover">
                    <tbody>
                        <tr>
                            <th className="text-center" style={{ width: "30%" }}>Attribute</th>
                            <th className="text-center">Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>{announcement.id}</td>
                        </tr>
                        <tr>
                            <td>Heading</td>
                            <td>{announcement.heading}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{announcement.description}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <Link to="/announcements" className="btn btn-primary me-2">Back</Link>
                    <Link to={`/update_announcement/${announcement.id}`} className="btn btn-info">Edit</Link>
                    <button
                        onClick={handleDelete}
                        className="btn btn-danger ms-2"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReadAnnouncement;
