import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../AdminNavbar/AdminNavbar";
import "./PostDetails.css";

const PostDetailsForm = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  /*useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        let response, data;

        // Attempt to fetch user details from the farmer collection
        response = await fetch(`http://localhost:8070/farmerorder/get/${postId}`);
        if (response.ok) {
          data = await response.json();
          if (data.farmerOrder) {
            setPostDetails(data.farmerOrder);
            setLoading(false);
            return;
          }
        }

        // Attempt to fetch user details from the seller collection
        response = await fetch(`http://localhost:8070/sellerorder/get/${postId}`);
        if (response.ok) {
          data = await response.json();
          if (data.sellerOrder) {
            setPostDetails(data.sellerOrder);
            setLoading(false);
            return;
          }
        }

        // Attempt to fetch user details from the deliveryman collection
        response = await fetch(`http://localhost:8070/deliverypost/get/${postId}`);
        if (response.ok) {
          data = await response.json();
          if (data.deliveryPost) {
            setPostDetails(data.deliveryPost);
            setLoading(false);
            return;
          }
        }

        // If user details not found in any collection
        console.error("Post details not found");
        setError("Post details not found");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setError("Error fetching post details");
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);*/

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        let response, data;

        response = await fetch(`http://localhost:8070/farmerorder/get/${postId}`);
        if (response.ok) {
          data = await response.json();
          if (data.farmerOrder) {
            setPostDetails({ collection: "farmerOrder", ...data.farmerOrder });
            setLoading(false);
            return;
          }
        }

        response = await fetch(`http://localhost:8070/sellerorder/get/${postId}`);
        if (response.ok) {
          data = await response.json();
          if (data.sellerOrder) {
            setPostDetails({ collection: "sellerOrder", ...data.sellerOrder });
            setLoading(false);
            return;
          }
        }

        response = await fetch(`http://localhost:8070/deliverypost/get/${postId}`);
        if (response.ok) {
          data = await response.json();
          if (data.deliveryPost) {
            setPostDetails({ collection: "deliveryPost", ...data.deliveryPost });
            setLoading(false);
            return;
          }
        }

        console.error("Post details not found");
        setError("Post details not found");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setError("Error fetching post details");
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      // Ask for confirmation before deleting
      if (window.confirm('Are you sure you want to delete this post?')) {
        let response;
        let deletedFromAnyCollection = false;
  
        response = await fetch(`http://localhost:8070/farmerorder/delete/${postId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessage('Post deleted successfully from the collection');
          deletedFromAnyCollection = true;
        }
  
        response = await fetch(`http://localhost:8070/sellerorder/delete/${postId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessage('Post deleted successfully from the collection');
          deletedFromAnyCollection = true;
        }
  
        response = await fetch(`http://localhost:8070/deliverypost/delete/${postId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessage('Post deleted successfully!');
          deletedFromAnyCollection = true;
        }
  
        if (!deletedFromAnyCollection) {
          setMessage('Post not found.');
        }
  
        setShowModal(true);
        setPostDetails(null); // Clear postDetails after deletion
        setTimeout(() => {
          window.history.back();
        }, 3000);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setMessage('Error deleting post');
      setShowModal(true);
    }
  };

  const labelMappings = {
    farmerOrder: {
      item: "Product Name",
      category: "Category",
      quantity: "Quantity",
      price: "Price (Per kg)",
      company: "Company Name",
      address: "Address",
      district: "District",
      expireDate: "Expire Date",
      mobile: "Phone No (mobile)",
      land: "Phone No (landline)",
      email: "Email"
    },
    sellerOrder: {
        item: "Product Name",
        category: "Category",
        quantity: "Quantity",
        price: "Price (Per kg)",
        company: "Company Name",
        address: "Address",
        district: "District",
        expireDate: "Expire Date",
        mobile: "Phone No (mobile)",
        land: "Phone No (landline)",
        email: "Email"
    },
    deliveryPost: {
        model: "Model",
        capacity: "Capacity",
        price: "Price (Per km)",
        company: "Company Name",
        address: "Address",
        district: "District",
        mobile: "Phone No (mobile)",
        land: "Phone No (landline)",
        email: "Email"
    }
  };
  
  const excludedFields = ['collection','_id','__v','name','productImage','vehicleImage'];

  return (
    <div className="post-details-container">
      <AdminNavbar />
      {loading ? (
        <p className="loading-message">Loading post details...</p>
      ) : postDetails ? (
        <div>
          <h2>Post Details</h2>
          {Object.keys(postDetails).map((key, index) => (
            !excludedFields.includes(key) && // Exclude specific fields
            <div key={index} className="post-detail">
              <div>
                <label>{labelMappings[postDetails.collection][key]}</label>
              </div>
              <div>
                <input type="text" value={postDetails[key]} disabled />
              </div>
            </div>
          ))}
          <div className="delete-button-container">
            <button className="delete-button" onClick={handleDeletePost}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p className="error-message">{error || "Post details not found."}</p>
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

export default PostDetailsForm;
