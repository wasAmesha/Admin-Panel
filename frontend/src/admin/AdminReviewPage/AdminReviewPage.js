import React, { useState, useEffect } from 'react';
import './AdminReviewPage.css';
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faTrashCan, faEllipsis, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]); // State variable to store reviews
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filterRole, setFilterRole] = useState('');
  const [filterDate, setFilterDate] = useState(''); // State variable to store the selected date filter

  // Function to fetch reviews from the database
  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:8070/review/');
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      const formattedReviews = data.map(review => ({
        ...review,
        date: new Date(review.date).toLocaleString()
      }));
      setReviews(formattedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    // Call the fetchReviews function when the component mounts
    fetchReviews();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  // Function to clear all reviews
  const clearReviews = () => {
    setReviews([]);
  };

  // Function to delete a review
  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await fetch(`http://localhost:8070/review/delete/${reviewId}`, {
          method: "DELETE",
        });
        setMessage('Review deleted successfully!');
        setShowModal(true);
        // After successful deletion, fetch reviews again to update the list
        fetchReviews();
      } catch (error) {
        console.error(error);
        setMessage('An error occurred while deleting the review.');
        setShowModal(true);
      }
    }
  };

  // Function to render reviews
  const renderReviews = () => {
    let filteredReviews = reviews;

    // Filter reviews based on selected user role
    if (filterRole) {
      filteredReviews = filteredReviews.filter(review => review.userRole === filterRole);
    }

    // Filter reviews based on selected date filter
    switch (filterDate) {
      case 'today':
        filteredReviews = filteredReviews.filter(review => {
          const reviewDate = new Date(review.date);
          const today = new Date();
          return reviewDate.toDateString() === today.toDateString();
        });
        break;
      case 'thisWeek':
        filteredReviews = filteredReviews.filter(review => {
          const reviewDate = new Date(review.date);
          const today = new Date();
          const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
          return reviewDate >= firstDayOfWeek;
        });
        break;
      case 'thisMonth':
        filteredReviews = filteredReviews.filter(review => {
          const reviewDate = new Date(review.date);
          const today = new Date();
          return reviewDate.getMonth() === today.getMonth() && reviewDate.getFullYear() === today.getFullYear();
        });
        break;
      case 'thisYear':
        filteredReviews = filteredReviews.filter(review => {
          const reviewDate = new Date(review.date);
          const today = new Date();
          return reviewDate.getFullYear() === today.getFullYear();
        });
        break;
      default:
        break;
    }

    // Reverse the order of reviews to display latest reviews first
    const reversedReviews = [...filteredReviews].reverse();
    return reversedReviews.map((review) => (
      <div key={review.id} className="row">
        <div className="col">
          <div className="review-border p-4 rounded">
            <div className="more-details">
            <Link to={`/admin/reviews/reviewdetails/${review._id}`}>
              <FontAwesomeIcon icon={faEllipsis} />
            </Link>
            </div>
            <div className="review-block">
              <div className="review-header">
                <img src={getUserRoleImage(review.userRole)} alt="Review" className="review-image" />
                <div className='review-info'>
                  <div>{review.name}</div>
                  <div className='review-date'>{review.date}</div>
                </div>
              </div>
              <div className="user-review">
                <p>{review.comment}</p>
              </div>
              <div className="delete-button" onClick={() => handleDeleteReview(review.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  // Function to get image URL based on user role
  const getUserRoleImage = (userRole) => {
    switch (userRole) {
      case 'Farmer':
        return 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTCMq4JowDJIozlgKZuzLFDJKwjK5aLeefyTUaX-cMx7EP4L0d0';
      case 'Seller':
        return 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ2aEatvxm-XoQjKf_pCAaCWyr1v-hykUlA1H9NLDaKnZDogbwZ';
      case 'Deliveryman':
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaShx5kkHTG3ZQEWbifbvxoy5RWI86x5GcpOuT7VR4mcecZWdT';
      default:
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2yJWVwI9ZFnJhI3FIB5wIK4Ys7B8J-u5hfQ&s';
    }
  };

  const handleUserRoleFilterChange = (event) => {
    setFilterRole(event.target.value);
  };

  const handleDateFilterChange = (event) => {
    setFilterDate(event.target.value);
  };

  return (
    <div className='admin-review'>
      <AdminNavbar />
      <div className="review-container">
        {/*<button className="clear-button" onClick={clearReviews}>
          <FontAwesomeIcon icon={faEraser} /> Clear All
  </button>*/}
        <h1 className="main-topic">
          <FontAwesomeIcon icon={faCommentDots} /> Reviews
        </h1>
        {/* Dropdown to filter reviews by user role */}
        <div className="type-filter-dropdown">
          <select value={filterRole} onChange={handleUserRoleFilterChange}>
            <option value="">All</option>
            <option value="Farmer">Farmer</option>
            <option value="Seller">Seller</option>
            <option value="Deliveryman">Deliveryman</option>
          </select>
        </div>
        {/* Dropdown to filter reviews by date */}
        <div className="date-filter-dropdown">
          <select value={filterDate} onChange={handleDateFilterChange}>
            <option value="">All</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>
        {renderReviews()}
      </div>
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

export default ReviewPage;
