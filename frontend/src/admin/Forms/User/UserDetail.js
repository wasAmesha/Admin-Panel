import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../AdminNavbar/AdminNavbar";
import "./UserDetail.css";

const UserDetailsForm = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let response, data;

        // Attempt to fetch user details from the farmer collection
        response = await fetch(`http://localhost:8070/farmer/get/${userId}`);
        if (response.ok) {
          data = await response.json();
          if (data.farmer) {
            setUserDetails(data.farmer);
            setLoading(false);
            return;
          }
        }

        // Attempt to fetch user details from the seller collection
        response = await fetch(`http://localhost:8070/seller/get/${userId}`);
        if (response.ok) {
          data = await response.json();
          if (data.seller) {
            setUserDetails(data.seller);
            setLoading(false);
            return;
          }
        }

        // Attempt to fetch user details from the deliveryman collection
        response = await fetch(`http://localhost:8070/deliveryman/get/${userId}`);
        if (response.ok) {
          data = await response.json();
          if (data.deliveryman) {
            setUserDetails(data.deliveryman);
            setLoading(false);
            return;
          }
        }

        // If user details not found in any collection
        console.error("User details not found");
        setError("User details not found");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Error fetching user details");
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleDeleteUser = async () => {
    try {
      // Ask for confirmation before deleting
      if (window.confirm('Are you sure you want to delete this user?')) {
        let response;
        let deletedFromAnyCollection = false;
  
        response = await fetch(`http://localhost:8070/farmer/delete/${userId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessage('User deleted successfully from the collection');
          deletedFromAnyCollection = true;
        }
  
        response = await fetch(`http://localhost:8070/seller/delete/${userId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessage('User deleted successfully from the collection');
          deletedFromAnyCollection = true;
        }
  
        response = await fetch(`http://localhost:8070/deliveryman/delete/${userId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessage('User deleted successfully!');
          deletedFromAnyCollection = true;
        }
  
        if (!deletedFromAnyCollection) {
          setMessage('User not found.');
        }
  
        setShowModal(true);
        setUserDetails(null); // Clear userDetails after deletion
        setTimeout(() => {
          window.history.back();
        }, 3000);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Error deleting user');
      setShowModal(true);
    }
  };
  
  
  return (
    <div className="user-details-container">
      <AdminNavbar />
      {loading ? (
        <p className="loading-message">Loading user details...</p>
      ) : userDetails ? (
        <div>
          <h2>User Details</h2>
          <div className="user-detail">
            <div>
              <label>First Name:</label>
            </div>
            <div>
              <input type="text" value={userDetails.fname} disabled />
            </div>
          </div>
          <div className="user-detail">
            <div>
              <label>Last Name:</label>
            </div>
            <div>
              <input type="text" value={userDetails.lname} disabled />
            </div>
          </div>
          <div className="user-detail">
            <div>
              <label>User Role:</label>
            </div>
            <div>
              <input type="text" value={userDetails.userRole} disabled />
            </div>
          </div>
          <div className="user-detail">
            <div>
              <label>Email:</label>
            </div>
            <div>
              <input type="email" value={userDetails.email} disabled />
            </div>
          </div>
          <div className="user-detail">
            <div>
              <label>District:</label>
            </div>
            <div>
              <input type="text" value={userDetails.district} disabled />
            </div>
          </div>
          <div className="delete-button-container">
            <button className="delete-button" onClick={handleDeleteUser}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p className="error-message">{error || "User details not found."}</p>
      )}

      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsForm;
