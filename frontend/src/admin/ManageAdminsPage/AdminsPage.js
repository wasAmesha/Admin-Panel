import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye, faSearch, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from "../AdminNavbar/AdminNavbar";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState({
    username: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [adminDetails, setAdminDetails] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const adminResponse = await fetch("http://localhost:8070/admin/");
      const adminData = await adminResponse.json();

      const adminsWithBase64Pictures = adminData.map(admin => {
        if (admin.profilePicture && admin.profilePicture.data) {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(admin.profilePicture.data.data))
          );
          return {
            ...admin,
            profilePicture: `data:${admin.profilePicture.contentType};base64,${base64String}`
          };
        }
        return admin;
      });

      setAdmins(adminsWithBase64Pictures);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setLoading(false);
    }
  };

  const handleRowClick = (adminId) => {
    // Handle row click functionality
  };

  const handleSearchChange = (event, column) => {
    const { value } = event.target;
    setSearchTerms(prevSearchTerms => ({
      ...prevSearchTerms,
      [column]: value
    }));
  };

  const handleClear = () => {
    setSearchTerms({
      username: '',
      email: ''
    });
  };

  const filteredAdmins = admins.filter(admin => {
    return (
      (!searchTerms.username || admin?.username?.toLowerCase()?.includes(searchTerms.username.toLowerCase())) &&
      (!searchTerms.email || admin?.email?.toLowerCase()?.includes(searchTerms.email.toLowerCase()))
    );
  });

  const handleDeleteAdmin = async (adminId) => {
    try {
      // Ask for confirmation before deleting
      if (window.confirm('Are you sure you want to delete this admin?')) {
        let response;
        let deletedFromCollection = false;
  
        response = await fetch(`http://localhost:8070/admin/delete/${adminId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setMessage('Admin deleted successfully');
          deletedFromCollection = true;
        }
  
        if (!deletedFromCollection) {
          setMessage('Admin not found');
        }
  
        setShowModal(true);
        setAdminDetails(null); // Clear userDetails after deletion
        // Refresh the user data after deletion
        fetchAdmins();
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      setMessage('Error deleting admin');
      setShowModal(true);
    }
  };

  return (
    <div className='adminsContainer'>
      <AdminNavbar />
      <div className="headerContainer">
        <h1>Admin Details</h1>
        <Link to="./add-admin" className='addAdminButton'>
            <FontAwesomeIcon className='addAdminIcon' icon={faUserPlus} /> Add New Admin
        </Link>
      </div>
      <div className="searchContainer">
        <FontAwesomeIcon icon={faSearch} className="searchIcon" />
        <label className="searchLabel" htmlFor="searchProduct">Search</label>
        <input
          type="text"
          placeholder="Username"
          value={searchTerms.username}
          onChange={event => handleSearchChange(event, 'username')}
        />
        <input
          type="text"
          placeholder="Email"
          value={searchTerms.email}
          onChange={event => handleSearchChange(event, 'email')}
        />
        <button className="clearButton" onClick={handleClear}>
          <FontAwesomeIcon icon={faTimes} />
          <span>Clear</span>
        </button>
      </div>
      <div className="tableContainer">
        <table className='adminTable'>
          <thead>
            <tr className='labelRow'>
              <td>Profile Picture</td>
              <td>Username</td>
              <td>Email</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            ) : (
              filteredAdmins.map((admin) => (
                <React.Fragment key={admin._id}>
                  <tr
                    onClick={() => handleRowClick(admin._id)}
                    className='adminRow'
                  >
                    <td>
                      <img src={admin.profilePicture || 'default-profile-picture-url'} alt="Profile" className="profilePicture" />
                    </td>
                    <td>{admin.username}</td>
                    <td>{admin.email}</td>
                    <td>
                      <Link to={`./admin-details/${admin._id}`}>
                        <FontAwesomeIcon icon={faEye} className='viewIcon' />
                      </Link>
                      <FontAwesomeIcon icon={faTrashAlt} className='deleteIcon' onClick={() => handleDeleteAdmin(admin._id)} />
                    </td>
                  </tr>
                  <tr className='spacerRow'>
                    <td colSpan='4'></td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
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
}

export default Admins;
