import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import AdminNavbar from "../../AdminNavbar/AdminNavbar";
import "./AddAdmin.css";

const AddAdminForm = () => {
  const { userId } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // This is the base64 string
      };
      reader.readAsDataURL(file); // Convert the file to base64 string
    } else {
      setMessage("Please select a valid image file.");
      //setShowModal(true);
    }
  };

  const handleAddAdmin = async (data) => {
    setLoading(true);

    try {
      const formData = {
        username: data.username,
        email: data.email,
        password: data.password,
        profilePicture: profilePicture, // Base64 string of the image
      };

      const response = await fetch(`http://localhost:8070/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.error || "Error adding admin");
      }

      setMessage("Admin added successfully!");
      setShowModal(true);
      setTimeout(() => {
        setMessage(""); // Clear the message after 3 seconds
        setShowModal(false);
      }, 5000);
      reset(); // Reset the form fields
      setProfilePicture(null); // Reset the profile picture
    } catch (error) {
      console.error("Error adding admin:", error);
      setMessage(error.message);
      //setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password");

  return (
    <div className="add-admin-container">
      <AdminNavbar />
      <div className="add-admin-content">
        <div className="add-admin-form">
          <form onSubmit={handleSubmit(handleAddAdmin)} className="add-admin-fields">
            <h2>Add New Admin</h2>
            <div className="profile-picture-section">
              <img
                src={profilePicture || "https://tse1.mm.bing.net/th?q=blank%20profile%20picture&w=250&h=250&c=7"}
                alt="Profile"
                className="add-admin-profile-picture"
              />
              <label htmlFor="profilePicture" className="custom-file-input">
                Choose Image
              </label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                {...register("profilePicture", { required: true })}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              {errors.profilePicture && <span className="error">Profile picture is required</span>}
            </div>
            <div className="profile-detail">
              <label>Username:</label>
              <input
                type="text"
                placeholder="Enter username"
                {...register("username", { required: true })}
                required
              />
              {errors.username && <span className="error">Username is required</span>}
            </div>
            <div className="profile-detail">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter email"
                {...register("email", { required: true })}
                required
              />
              {errors.email && <span className="error">Email is required</span>}
            </div>
            <div className="profile-detail">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <span className="error">Password is required and must be at least 6 characters long</span>
              )}
            </div>
            <div className="profile-detail">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Enter password again"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
            </div>
            <p className="error-message">{message}</p>
            <div className="add-admin-button-container">
              <button type="submit" className="add-admin-button" disabled={loading}>
                {loading ? "Adding..." : "Add Admin"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{message}</p>
            <button className="close-modal-button" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAdminForm;
