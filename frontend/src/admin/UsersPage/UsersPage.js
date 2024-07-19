import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UsersPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from "../AdminNavbar/AdminNavbar";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState({
    userRole: '',
    fname: '',
    lname: '',
    email: '',
    district: ''
  });
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const farmerResponse = await fetch("http://localhost:8070/farmer/");
      const sellerResponse = await fetch("http://localhost:8070/seller/");
      const deliverymenResponse = await fetch("http://localhost:8070/deliveryman/");
      
      const farmerData = await farmerResponse.json();
      const sellerData = await sellerResponse.json();
      const deliverymenData = await deliverymenResponse.json();

      const combinedData = [...farmerData, ...sellerData, ...deliverymenData];
      
      setUsers(combinedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleRowClick = (userId) => {
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
      userRole: '',
      fname: '',
      lname: '',
      email: '',
      district: ''
    });
  };

  const filteredUsers = users.filter(user => {
    return (
      (!searchTerms.userRole || user?.userRole?.toLowerCase()?.includes(searchTerms.userRole.toLowerCase())) &&
      (!searchTerms.fname || user?.fname?.toLowerCase()?.includes(searchTerms.fname.toLowerCase())) &&
      (!searchTerms.lname || user?.lname?.toLowerCase()?.includes(searchTerms.lname.toLowerCase())) &&
      (!searchTerms.email || user?.email?.toLowerCase()?.includes(searchTerms.email.toLowerCase())) &&
      (!searchTerms.district || user?.district?.toLowerCase()?.includes(searchTerms.district.toLowerCase()))
    );
  });

  const handleDeleteUser = async (userId) => {
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
          setMessage('User deleted successfully from the collection');
          deletedFromAnyCollection = true;
        }
  
        if (!deletedFromAnyCollection) {
          setMessage('User not found in any collection');
        }
  
        setShowModal(true);
        setUserDetails(null); // Clear userDetails after deletion
        // Refresh the user data after deletion
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Error deleting user');
      setShowModal(true);
    }
  };
  

  return (
    <div className='usersContainer'>
      <AdminNavbar/>
      <h1>User Details</h1>
      <div className="searchContainer">
        <FontAwesomeIcon icon={faSearch} className="searchIcon" />
        <label className="searchLabel" htmlFor="searchProduct">Search</label>
        <input
          type="text"
          placeholder="Role"
          value={searchTerms.userRole}
          onChange={event => handleSearchChange(event, 'userRole')}
        />
        <input
          type="text"
          placeholder="First Name"
          value={searchTerms.fname}
          onChange={event => handleSearchChange(event, 'fname')}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={searchTerms.lname}
          onChange={event => handleSearchChange(event, 'lname')}
        />
        <input
          type="text"
          placeholder="Email"
          value={searchTerms.email}
          onChange={event => handleSearchChange(event, 'email')}
        />
        <input
          type="text"
          placeholder="District"
          value={searchTerms.district}
          onChange={event => handleSearchChange(event, 'district')}
        />
        <button className="clearButton" onClick={handleClear}>
          <FontAwesomeIcon icon={faTimes} />
          <span>Clear</span>
        </button>
      </div>
      <div className="tableContainer">
        <table className='userTable'>
          <thead>
            <tr className='labelRow'>
              <td>Role</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Email</td>
              <td>District</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <React.Fragment key={user._id}>
                  <tr
                    onClick={() => handleRowClick(user._id)}
                    className='userRow'
                  >
                    <td>{user.userRole}</td>
                    <td>{user.fname}</td>
                    <td>{user.lname}</td>
                    <td>{user.email}</td>
                    <td>{user.district}</td>
                    <td>
                    <Link to={`/admin/users/userdetails/${user._id}`}>
                      <FontAwesomeIcon icon={faEye} className='viewIcon' />
                    </Link>
                    <FontAwesomeIcon icon={faTrashAlt} className='deleteIcon' onClick={() => handleDeleteUser(user._id)} />
                    </td>
                  </tr>
                  <tr className='spacerRow'>
                    <td colSpan='6'></td>
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

export default Users;
