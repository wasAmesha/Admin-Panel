import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faEdit, faUserCircle, faComments, faMoneyCheckAlt, faBoxOpen, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './AdminNavbar.css';

const Sidebar = () => {
  // State to track the currently selected option
  const [selectedOption, setSelectedOption] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  // Function to handle option click and update the selected option
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic here, such as clearing localStorage and redirecting to the login page
    localStorage.removeItem('adminId');
    window.location.href = '/admin'; // Assuming '/login' is the login page route
  };

  // Effect to update selected option based on current URL
  useEffect(() => {
    const adminId = localStorage.getItem('adminId');

    const fetchAdminData = async () => {
      try {
        const response = await fetch(`http://localhost:8070/admin/get/${adminId}`);
        const data = await response.json();
        if (data.status === 'Admin fetched') {
          const { admin } = data;
          if (admin.profilePicture && admin.profilePicture.data) {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(admin.profilePicture.data.data))
            );
            setProfilePicture(`data:${admin.profilePicture.contentType};base64,${base64String}`);
          }
        } 
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    switch (path) {
      case '/admin/dashboard':
        setSelectedOption('dashboard');
        break;
      case '/admin/users':
        setSelectedOption('users');
        break;
      case '/admin/posts':
        setSelectedOption('posts');
        break;
      case '/admin/products':
        setSelectedOption('products');
        break;
      case '/admin/requests':
        setSelectedOption('requests');
        break;
      case '/admin/reviews':
        setSelectedOption('reviews');
        break;
      case '/admin/transactions':
        setSelectedOption('transactions');
        break;
      case '/admin/settings':
        setSelectedOption('settings');
        break;
      default:
        setSelectedOption('');
    }
  }, []);


  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={process.env.PUBLIC_URL + "/Navbar/icon.png"} alt="Company Logo" className="company-logo" />
        {profilePicture && <img src={profilePicture} alt="Profile" className="profile-picture" />}
      </div>
      <ul className="sidebar-menu">
        <li>
          <a href="/admin/dashboard" className={selectedOption === 'dashboard' ? 'active' : ''} onClick={() => handleOptionClick('dashboard')}>
            <FontAwesomeIcon icon={faHome} /> Dashboard
          </a>
        </li>
        <li>
          <a href="/admin/users" className={selectedOption === 'users' ? 'active' : ''} onClick={() => handleOptionClick('users')}>
            <FontAwesomeIcon icon={faUsers} /> Users
          </a>
        </li>
        <li>
          <a href="/admin/posts" className={selectedOption === 'posts' ? 'active' : ''} onClick={() => handleOptionClick('posts')}>
            <FontAwesomeIcon icon={faEdit} /> Posts
          </a>
        </li>
        <li>
          <a href="/admin/products" className={selectedOption === 'products' ? 'active' : ''} onClick={() => handleOptionClick('products')}>
            <FontAwesomeIcon icon={faBoxOpen} /> Products
          </a>
        </li>
        {/*
        <li>
          <a href="/admin/requests" className={selectedOption === 'requests' ? 'active' : ''} onClick={() => handleOptionClick('requests')}>
            <FontAwesomeIcon icon={faUserCircle} /> Requests
          </a>
        </li>
        */}
        {/* 
        <li>
          <a href="/admin/reviews" className={selectedOption === 'reviews' ? 'active' : ''} onClick={() => handleOptionClick('reviews')}>
            <FontAwesomeIcon icon={faComments} /> Reviews
          </a>
        </li>
        */}
        {/*
        <li>
          <a href="/admin/transactions" className={selectedOption === 'transactions' ? 'active' : ''} onClick={() => handleOptionClick('transactions')}>
            <FontAwesomeIcon icon={faMoneyCheckAlt} /> Transactions
          </a>
        </li>
      */}
        <li>
          <a href="/admin/settings" className={selectedOption === 'settings' ? 'active' : ''} onClick={() => handleOptionClick('settings')}>
            <FontAwesomeIcon icon={faCog} /> Settings
          </a>
        </li>
      </ul>
          <button onClick={handleLogout} className="logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
    </div>
  );
};

export default Sidebar;
