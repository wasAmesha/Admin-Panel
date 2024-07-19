import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../AdminNavbar/AdminNavbar";
import "./ResetPassword.css";

const ResetPasswordForm = () => {
  const adminId = localStorage.getItem('adminId');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8070/admin/reset-password/${adminId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        setMessage('Password updated successfully!');
        setError(null);
        setShowModal(true);
        // Reset form fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await response.json();
        setError(data.error || 'Error updating password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setError('Error updating password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <AdminNavbar />
      <div className="reset-password-content">
        <form onSubmit={handleResetPassword} className="reset-password-form">
          <h2>Reset Password</h2>
          <div className="reset-password-image">
            <img src='https://t3.ftcdn.net/jpg/04/91/13/48/360_F_491134889_qUySqfmvufgUGg7p9DI4aPtnfhevvkT3.jpg' alt="Reset Password" />
          </div>
          <div className="password-detail">
            <label>Current Password:</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="password-detail">
            <label>New Password:</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="password-detail">
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="reset-button-container">
            <button type="submit" className="reset-button" disabled={loading}>
              {loading ? 'Updating...' : 'Change Password'}
            </button>
          </div>
        </form>
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

export default ResetPasswordForm;
