import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const UsersStats = () => {
  const [usersCount, setUsersCount] = useState(0); // Initialize usersCount with 0

  useEffect(() => {
    // Simulate fetching users count from API (dummy implementation)
    // You can replace this with your actual API call
    const fetchUsersCount = () => {
      // Assuming the API returns a count asynchronously after 1 second
      setTimeout(() => {
        // Update usersCount with a random value for demonstration
        const randomCount = Math.floor(Math.random() * 1000);
        setUsersCount(randomCount);
      }, 1000);
    };

    fetchUsersCount();
  }, []);

  return (
    <div className="dashboard-section">
      <div className="dashboard-card">
        <div className="icon">
          <FontAwesomeIcon icon={faUsers} />
        </div>
        <div className="info">
          <h2>Users</h2>
          <p>Total Users: {usersCount}</p>
        </div>
      </div>
    </div>
  );
};

export default UsersStats;
