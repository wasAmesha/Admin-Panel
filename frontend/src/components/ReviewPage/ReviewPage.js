import React, { useState } from 'react';
import './ReviewPage.css';
import NavbarRegistered from "../NavbarRegistered/NavbarRegistered";
import FooterNew from "../Footer/FooterNew";

const ReviewPage = () => {
  // Function to get the current date in Sri Lankan time zone
  const getSriLankanDate = () => {
    const currentDate = new Date();
    const utcOffset = 5.3 * 60 * 60 * 1000; // Sri Lanka time zone offset from UTC is +5:30 hours
    const sriLankanTime = new Date(currentDate.getTime() + utcOffset);
    return sriLankanTime;
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [userRole, setRole] = useState(''); // State variable to store the selected role
  const [date, setDate] = useState(getSriLankanDate()); // Initialize date with Sri Lankan time

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8070/review/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, comment, date, userRole }), // Include role in the request body
      });

      if (response.ok) {
        console.log('Review submitted successfully!');
        setName('');
        setEmail('');
        setComment('');
        setRole(''); // Reset role after successful submission
        setDate(getSriLankanDate()); // Reset date to Sri Lankan time after successful submission
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    e.target.classList.remove('defaultOption'); // Remove the defaultOption class when an option is selected
  };
  

  return (
    <div>
      <NavbarRegistered />
      <div className='Review'>
        <div className="leftSide"
          style={{ backgroundImage: `url('https://nakednutrition.com/cdn/shop/articles/Wheat-Image-2_720x.jpg?v=1597660824')` }}>
        </div>
        <div className="rightSide">
          <form id="Review-form" onSubmit={handleSubmit}>
            <h1> Review Us </h1>
            <label htmlFor="name">Name</label>
            <input name="name" placeholder="Enter your name..." type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input name="email" placeholder="Enter your email..." type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="userRole">Role</label>
            <select className={userRole ? '' : 'defaultOption'} name="userRole" value={userRole} onChange={handleRoleChange}>
              <option value="" disabled={userRole !== ''}>Select the Role...</option>
              <option value="Farmer">Farmer</option>
              <option value="Seller">Seller</option>
              <option value="Deliveryman">Deliveryman</option>
            </select>
            <label htmlFor="comment">Comment</label>
            <textarea
              rows="6"
              placeholder="Enter your comment..."
              name="comment"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button type='submit'> Send </button>
          </form>
        </div>
      </div>
      <FooterNew />
    </div>
  )
};

export default ReviewPage;
