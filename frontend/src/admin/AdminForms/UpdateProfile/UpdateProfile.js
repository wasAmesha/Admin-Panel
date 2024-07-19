import React, { useState, useEffect } from "react";
import AdminNavbar from "../../AdminNavbar/AdminNavbar";
import "./UpdateProfile.css";

const UpdateProfileForm = () => {
  const adminId = localStorage.getItem('adminId');
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // Introduce showModal state

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
          //setShowModal(true); // Show modal if there's a message
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setMessage("Error fetching admin data");
        //setShowModal(true); // Show modal if there's a message
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [adminId]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = {
      username,
      email,
      profilePicture: profilePicture && profilePicture.startsWith("data:image/") ? profilePicture : null
    };

    try {
      const response = await fetch(`http://localhost:8070/admin/update/${adminId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (data.message === "Profile updated successfully!") {
        setMessage("Profile updated successfully");
        setShowModal(true); // Show modal if there's a message
      } else {
        setMessage(data.error || "Failed to update profile");
        //setShowModal(true); // Show modal if there's a message
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Error updating profile");
      //setShowModal(true); // Show modal if there's a message
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // This is the base64 string
      };
      reader.readAsDataURL(file); // Convert the file to base64 string
    } else {
      setMessage("Please select a valid image file.");
      //setShowModal(true); // Show modal if there's a message
    }
  };

  return (
    <div className="update-profile-container">
      <AdminNavbar />
      <div className="update-profile-content">
        <div className="update-profile-image">
          <img
            src="https://static.vecteezy.com/system/resources/previews/001/177/233/original/man-filling-out-form-online-on-smartphone-vector.jpg"
            alt="Side"
          />
        </div>
        <div className="update-profile-form">
          <form onSubmit={handleUpdateProfile} className="update-profile-fields">
            <h2>Update Profile</h2>
            <div className="profile-picture-section">
              <img
                src={profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4sEG5g9GFcy4SUxbzWNzUTf1jMISTDZrTw&usqp=CAU"}
                alt="Profile"
                className="update-profile-picture"
              />
              <label htmlFor="profilePicture" className="custom-file-input">
                Choose Image
              </label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="profile-detail">
              <label>Username:</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="profile-detail">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="profile-detail">
            <p className="error-message">{message}</p>
            <div className="update-button-container">
              <button type="submit" className="update-button" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
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

export default UpdateProfileForm;
