import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../AdminNavbar/AdminNavbar";
import "./AdminDetails.css";

const AdminDetailsForm = () => {
  const { adminId } = useParams();
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`http://localhost:8070/admin/get/${adminId}`);
        const data = await response.json();
        if (data.status === "Admin fetched") {
          const { admin } = data;
          setUsername(admin.username);
          setEmail(admin.email);
          if (admin.profilePicture && admin.profilePicture.data) {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(admin.profilePicture.data.data))
            );
            setProfilePicture(`data:${admin.profilePicture.contentType};base64,${base64String}`);
          }
          setLoading(false);
        } else {
          setMessage("Failed to fetch admin data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setMessage("Error fetching admin data");
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [adminId]);

  const handleDeleteAdmin = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this admin?")) {
        const response = await fetch(`http://localhost:8070/admin/delete/${adminId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setMessage("Admin deleted successfully");
          setShowModal(true);
          setTimeout(() => {
            window.history.back();
          }, 3000);
        } else {
          setMessage("Failed to delete admin");
          setShowModal(true);
        }
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      setMessage("Error deleting admin");
      setShowModal(true);
    }
  };

  return (
    <div className="admin-profile-container">
      <AdminNavbar />
      <div className="admin-profile-content">
        {/*<div className="admin-profile-image">
          <img
            src="https://static.vecteezy.com/system/resources/previews/001/177/233/original/man-filling-out-form-online-on-smartphone-vector.jpg"
            alt="Side"
          />
  </div>*/}
        <div className="admin-profile-form">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form className="admin-profile-fields">
              <h2>Admin Details</h2>
              <div className="profile-picture-section">
                <img
                  src={profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&usqp=CAU"}
                  alt="Profile"
                  className="admin-profile-picture"
                />
              </div>
              <div className="profile-detail">
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  disabled
                />
              </div>
              <div className="profile-detail">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  disabled
                />
              </div>
              <div className="delete-button-container">
                <button className="delete-button" type="button" onClick={handleDeleteAdmin}>
                  Delete
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{message}</p>
            <button className="close-modal-button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDetailsForm;
