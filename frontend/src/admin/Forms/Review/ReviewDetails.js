import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../AdminNavbar/AdminNavbar";
import "./ReviewDetails.css";

const ReviewDetailsForm = () => {
  const { reviewId } = useParams();
  const [reviewDetails, setReviewDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        let response, data;

        // Attempt to fetch user details from the farmer collection
        response = await fetch(`http://localhost:8070/review/get/${reviewId}`);
        if (response.ok) {
          data = await response.json();
          if (data.review) {
            setReviewDetails(data.review);
            setLoading(false);
            return;
          }
        }

        // If user details not found in any collection
        console.error("Review details not found");
        setError("Review details not found");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching review details:", error);
        setError("Error fetching review details");
        setLoading(false);
      }
    };

    fetchReviewDetails();
  }, [reviewId]);

  const handleDeleteReview = async () => {
    try {
      // Ask for confirmation before deleting
      if (window.confirm('Are you sure you want to delete this review?')) {
        let response;
        let deletedFromAnyCollection = false;
  
        response = await fetch(`http://localhost:8070/review/delete/${reviewId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessage('Review deleted successfully!');
          deletedFromAnyCollection = true;
        }
  
        if (!deletedFromAnyCollection) {
          setMessage('Review not found in collection');
        }
  
        setShowModal(true);
        setReviewDetails(null); // Clear userDetails after deletion
        setTimeout(() => {
            window.history.back();
          }, 3000);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      setMessage('Error deleting review');
      setShowModal(true);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  }
  
  
  return (
    <div className="review-details-container">
      <AdminNavbar />
      {loading ? (
        <p className="loading-message">Loading review details...</p>
      ) : reviewDetails ? (
        <div>
          <h2>Review Details</h2>
          <div className="review-detail">
            <div>
              <label>User Name:</label>
            </div>
            <div>
              <input type="text" value={reviewDetails.name} disabled />
            </div>
          </div>
          <div className="review-detail">
            <div>
              <label>Email:</label>
            </div>
            <div>
              <input type="text" value={reviewDetails.email} disabled />
            </div>
          </div>
          <div className="review-detail">
            <div>
              <label>User Role:</label>
            </div>
            <div>
              <input type="text" value={reviewDetails.userRole} disabled />
            </div>
          </div>
          <div className="review-detail">
            <div>
              <label>Comment:</label>
            </div>
            <div>
              <textarea value={reviewDetails.comment} disabled />
            </div>
          </div>
          <div className="review-detail">
            <div>
              <label>Review Date:</label>
            </div>
            <div>
              <input type="text" value={formatDateTime(reviewDetails.date)} disabled />
            </div>
          </div>
          <div className="delete-button-container">
            <button className="delete-button" onClick={handleDeleteReview}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p className="error-message">{error || "Review details not found."}</p>
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

export default ReviewDetailsForm;
